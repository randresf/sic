import { cacheExchange } from "@urql/exchange-graphcache"
import { SubscriptionClient } from "subscriptions-transport-ws"
import {
  createClient,
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
} from "urql"
import { __IsProd__ } from "../constants"
import { cursorPagination } from "./cursorPagination"
import { errorExchange } from "./errorExchange"
import { exchangeKeys } from "./exchangeKeys"
import { mutationUpdates } from "./mutationUpdates"
import { subscriptionUpdates } from "./subscriptionUpdates"

const apiUrl =
  __IsProd__ && process.env.REACT_APP_API
    ? process.env.REACT_APP_API
    : "//localhost:4000/graphql"

const app_uri = apiUrl.replace("https:", "")
const subscriptionClient = new SubscriptionClient(
  __IsProd__ ? `wss:${app_uri}` : `ws:${app_uri}`,
  {
    reconnect: true,
  }
)

const createUrqlClient = () => {
  return createClient({
    url:
      __IsProd__ && process.env.REACT_APP_API
        ? process.env.REACT_APP_API
        : `http:${app_uri}`,
    requestPolicy: "cache-first",
    fetchOptions: {
      credentials: "include",
      headers: {
        clientId: sessionStorage.getItem("clientId") || "",
      },
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: exchangeKeys,
        resolvers: {
          Query: {
            meetings: cursorPagination(),
          },
        },
        updates: {
          Mutation: mutationUpdates(),
          Subscription: subscriptionUpdates(),
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
