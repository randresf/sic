import { Box } from "@chakra-ui/react"
import queryString from "query-string"
import React from "react"
import { useIntl } from "react-intl"
import { useHistory, useLocation } from "react-router-dom"
import TabsSection from "../../components/formElements/Tabs"
import { useIsAuth } from "../../hooks/useIsAuth"
import Layout from "../../layouts"
import Admins from "./tabs/Admins"
import Locations from "./tabs/Locations"
import Meetings from "./tabs/Meetings"
import DashboardTitle from "./Title"

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
    <Layout>
      <DashboardTitle />
      <Box mt="3em">
        <TabsSection
          tabs={tabData}
          isLazy
          onChange={onChange}
          defaultIndex={Number(tab)}
        />
      </Box>
    </Layout>
  )
}
