import {
  createClient,
  dedupExchange,
  Exchange,
  fetchExchange,
  subscriptionExchange,
  stringifyVariables,
} from "urql"
import { cacheExchange, Cache, Resolver } from "@urql/exchange-graphcache"
import { betterUpdateQuery } from "./utils/createBetterQuery"
import { tap, pipe } from "wonka"
import {
  HeartbeatDocument,
  HeartbeatQuery,
  LoginMutation,
  LogoutMutation,
  MeetingsDocument,
  MeetingsQuery,
  NewMeetingSubscription,
  MeetingDeleteSubscription,
} from "./generated/graphql"
import { useHistory } from "react-router-dom"
import { SubscriptionClient } from "subscriptions-transport-ws"

const app_uri = "//localhost:4000/graphql"
const subscriptionClient = new SubscriptionClient(`ws:${app_uri}`, {
  reconnect: true,
})

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  const history = useHistory()
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        history ? history.replace("/login") : window.location.replace("/login")
      }
    })
  )
}

const invalidateQuerys = (cache: Cache, fName: string) => {
  const fieldInfos = cache
    .inspectFields("Query")
    .filter((info) => info.fieldName === fName)
  fieldInfos.forEach(({ fieldName, arguments: variables }: any) => {
    cache.invalidate("Query", fieldName, variables || undefined)
  })
}

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info

    const allFields = cache.inspectFields(entityKey)
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName)
    const size = fieldInfos.length
    if (size === 0) {
      return undefined
    }
    // check if the data is in the cache and return it
    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isItInCache = cache.resolve(entityKey, fieldKey) as string[]
    info.partial = !isItInCache // make sure it calls the BE when there is not data
    const results: string[] = []
    let hasMore = true
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string
      const data = cache.resolve(key, "meetings") as string[]
      const _hasMore = cache.resolve(key, "hasMore")
      if (!_hasMore) {
        hasMore = _hasMore as boolean
      }
      results.push(...data)
    })
    return { __typename: "PaginatedMeetings", hasMore, posts: results }
  }
}

const createUrqlClient = () => {
  return createClient({
    url: process.env.REACT_APP_API || `http:${app_uri}`,
    requestPolicy: "cache-first",
    fetchOptions: {
      credentials: "include",
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          Admin: (data) => data.name as string,
          PlaceResponse: () => null,
          PaginatedMeetings: () => null,
        },
        resolvers: {
          Query: {
            meetings: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            logout: (result, _args, cache, _info) => {
              betterUpdateQuery<LogoutMutation, HeartbeatQuery>(
                cache,
                { query: HeartbeatDocument },
                result,
                () => ({ heartBeat: null })
              )
            },
            login: (results, _args, cache, _info) => {
              betterUpdateQuery<LoginMutation, HeartbeatQuery>(
                cache,
                { query: HeartbeatDocument },
                results,
                (res, que) => {
                  if (res.login.errors) return que
                  return { heartBeat: res.login.admin }
                }
              )
            },
            saveMeeting: (_results, _args, cache, _info) => {
              invalidateQuerys(cache, "meetings")
            },
            deleteMeeting: (_results, _args, cache, _info) => {
              invalidateQuerys(cache, "meetings")
            },
            updateUser: (_results, _args, cache, _info) => {
              invalidateQuerys(cache, "getUserData")
            },
          },
          Subscription: {
            newMeeting: (result, _args, cache) => {
              const variables = {
                limit: 15,
                cursor: null as null | string,
              }
              betterUpdateQuery<NewMeetingSubscription, MeetingsQuery>(
                cache,
                { query: MeetingsDocument, variables },
                result,
                (res, que) => {
                  const meeting = res.newMeeting.data
                  if (!meeting) return que
                  if (meeting.isActive === "true")
                    que.meetings.meetings.unshift(meeting)
                  else
                    que.meetings.meetings = que.meetings.meetings.filter(
                      (met) => met.id !== meeting.id
                    )
                  return que
                }
              )
            },
            meetingDelete: (result, _args, cache) => {
              const variables = {
                limit: 15,
                cursor: null as null | string,
              }
              betterUpdateQuery<MeetingDeleteSubscription, MeetingsQuery>(
                cache,
                { query: MeetingsDocument, variables },
                result,
                (res, que) => {
                  const meetingId = res.meetingDelete.data
                  if (!meetingId) return que

                  que.meetings.meetings = que.meetings.meetings.filter(
                    (met) => met.id !== meetingId
                  )
                  return que
                }
              )
            },
          },
        },
      }),
      subscriptionExchange({
        forwardSubscription(operation) {
          return subscriptionClient.request(operation)
        },
      }),
      errorExchange,
      fetchExchange,
    ],
  })
}

export default createUrqlClient
