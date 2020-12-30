import React from "react"
import { Box } from "@chakra-ui/react"
import { useIsAuth } from "../../hooks/useIsAuth"
import DashboardTitle from "./Title"
import TabsSection from "../../components/formElements/Tabs"
import { useIntl } from "react-intl"
import Meetings from "./tabs/Meetings"
import Locations from "./tabs/Locations"

export default function Dashboard() {
  useIsAuth()
  const { formatMessage } = useIntl()

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
          <Meetings />
        </Box>
      ),
    },
  ]

  return (
    <Box mt="3em">
      <DashboardTitle />
      <Box mt="3em">
        <TabsSection tabs={tabData} isFitted isLazy />
      </Box>
    </Box>
  )
}
