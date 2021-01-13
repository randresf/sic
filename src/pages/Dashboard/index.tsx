import React from "react"
import { Box } from "@chakra-ui/react"
import { useIsAuth } from "../../hooks/useIsAuth"
import DashboardTitle from "./Title"
import TabsSection from "../../components/formElements/Tabs"
import { useIntl } from "react-intl"
import Meetings from "./tabs/Meetings"
import Locations from "./tabs/Locations"
import { useHistory, useLocation } from "react-router-dom"
import queryString from "query-string"
import Admins from "./tabs/Admins"

export default function Dashboard() {
  useIsAuth()
  const history = useHistory()
  const location = useLocation()
  const { formatMessage } = useIntl()
  const { tab = 0 } = queryString.parse(location.search)

  const tabData = [
    {
      label: formatMessage({ id: "app.dashboard.tab1" }),
      content: (
        <Box mt="3em">
          <Locations />
        </Box>
      ),
    },
    {
      label: formatMessage({ id: "app.dashboard.tab2" }),
      content: (
        <Box mt="3em">
          <Meetings />
        </Box>
      ),
    },
    {
      label: formatMessage({ id: "app.dashboard.tab3" }),
      content: (
        <Box mt="3em">
          <Admins />
        </Box>
      ),
    },
  ]
  const onChange = (tabIndex: number) => {
    history.replace(`/dashboard?tab=${tabIndex}`)
  }

  return (
    <Box mt="3em" width="100%">
      <DashboardTitle />
      <Box mt="3em">
        <TabsSection
          tabs={tabData}
          isFitted
          isLazy
          onChange={onChange}
          defaultIndex={Number(tab)}
        />
      </Box>
    </Box>
  )
}
