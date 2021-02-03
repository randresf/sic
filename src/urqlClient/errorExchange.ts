import { useHistory } from "react-router-dom"
import { Exchange } from "urql"
import { pipe, tap } from "wonka"
import Notify from "../utils/notify"

export const errorExchange: Exchange = ({ forward }) => (ops$) => {
  const history = useHistory()
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        history ? history.replace("/login") : window.location.replace("/login")
      }
      if (error && error.message) {
        return Notify({
          title: error.message,
          type: "error",
        })
      }
    })
  )
}
