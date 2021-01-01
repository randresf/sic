import {
  createClient,
  dedupExchange,
  Exchange,
  fetchExchange,
  subscriptionExchange,
} from "urql"
import { cacheExchange, Cache } from "@urql/exchange-graphcache"
import { betterUpdateQuery } from "./utils/createBetterQuery"
import { tap, pipe } from "wonka"
import {
  HeartbeatDocument,
  HeartbeatQuery,
  LoginMutation,
  LogoutMutation,
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

const invalidateMeetings = (cache: Cache) => {
  const allFields = cache.inspectFields("Query")
  const fieldInfos = allFields.filter((info) => info.fieldName === "meetings")
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "meetings", fi.arguments || {})
  })
}

const createUrqlClient = () => {
  return createClient({
    url: process.env.REACT_APP_API || `http:${app_uri}`,
    //requestPolicy: "network-only",
    fetchOptions: {
      credentials: "include",
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
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
              invalidateMeetings(cache)
            },
            deleteMeeting: (_results, _args, cache, _info) => {
              invalidateMeetings(cache)
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
