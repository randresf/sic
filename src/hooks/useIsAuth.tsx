import { useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useHeartbeatQuery } from "../generated/graphql"

export const useIsAuth = () => {
  const [{ data, fetching }] = useHeartbeatQuery()
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    if (!fetching && !data?.heartBeat)
      history.replace(`/login?next=${location.pathname}`)
  }, [fetching, data, history, location.pathname])
}
