import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"
import React from "react"

type TabsProps = {
  tabs: { label: string; content: React.ReactNode }[]
  isFitted?: boolean
  isLazy: boolean
  onChange?: (index: number) => void
  defaultIndex?: number
}

export default function TabsSection({
  tabs,
  defaultIndex = 0,
  ...props
}: TabsProps) {
  return (
    <Tabs
      align="end"
      // variant="enclosed"
      {...props}
      defaultIndex={defaultIndex}
    >
      <TabList>
        {tabs.map((tab, index) => (
          <Tab key={index}>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab, index) => (
          <TabPanel p={4} key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
