import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'

function TabDetail({ data = [] }) {
  return (
    <Tabs variant='enclosed'>
      <TabList>
        {data.map((v, idx) => (
          <Tab
            key={idx}
            _selected={{ color: 'white', bg: '#76bc2a' }}
            bg={'blackAlpha.50'}
            ml={2}
          >
            {v.title}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map((v, idx) => (
          <TabPanel key={idx}>{v.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default TabDetail
