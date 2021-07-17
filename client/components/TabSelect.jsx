import { Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";

const TabSelect = ({ tabs, onChange, selectedTab = 1 }) => (
  <Tabs
    variant="soft-rounded"
    colorScheme="green"
    mt="auto"
    mb="auto"
    mr="10vw"
    index={selectedTab}
    onChange={(index) => onChange(index)}
  >
    <TabList>
      {tabs &&
        tabs.map((tab) => (
          <Tab aria-label={tab.label} key={tab.label}>
            <tab.icon style={{ marginRight: "5px" }} />
            {tab.label || ""}
          </Tab>
        ))}
    </TabList>
  </Tabs>
);
export default TabSelect;
