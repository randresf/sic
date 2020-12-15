import { createClient, dedupExchange, Exchange, fetchExchange } from "urql"
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

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  const history = useHistory()
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        history.replace("/login")
      }
    })
  )
}

// const invalidateMeetings = (cache: Cache) => {
//   const allFields = cache.inspectFields("Query")
//   const fieldInfos = allFields.filter((info) => info.fieldName === "meetings")
//   console.log(fieldInfos)
//   fieldInfos.forEach((fi) => {
//     cache.invalidate("Query", "meetings", fi.arguments || {})
//   })
// }

const createUrqlClient = () => {
  return createClient({
    url: process.env.REACT_APP_API || "http://localhost:4000/graphql",
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
          },
        },
      }),
      errorExchange,
      fetchExchange,
    ],
  })
}

export default createUrqlClient
