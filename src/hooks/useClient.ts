import { useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useGetClientsQuery } from "../generated/graphql"

export const useClient = (client: string) => {
  const [{ data, fetching }] = useGetClientsQuery({
    variables: { name: client },
  })

  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    if (!fetching && !data?.getOrganizationByName.organization)
      return history.replace(`/`)
    const currentOrg = data?.getOrganizationByName?.organization
    sessionStorage.setItem("clientId", currentOrg?.id || "")
  }, [fetching, data, history, location.pathname, client])
}
