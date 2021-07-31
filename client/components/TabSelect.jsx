import { Tab, TabList, Tabs, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const TabSelect = ({ tabs, onChange, selectedTab = 1 }) => {
  const highlightedColor = useColorModeValue("black", "gray.500");
  const selectedColor = useColorModeValue("green", "blue");
  return (
    <Tabs
      variant="soft-rounded"
      colorScheme={selectedColor}
      mt="auto"
      mb="auto"
      mr="10vw"
      index={selectedTab}
    >
      <TabList>
        {tabs &&
          tabs.map((tab, index) => (
            <Tab
              aria-label={tab.label}
              key={tab.label}
              _hover={{ color: highlightedColor }}
              onClick={() => onChange(index)}
            >
              <tab.icon style={{ marginRight: "5px" }} />
              {tab.label || ""}
            </Tab>
          ))}
      </TabList>
    </Tabs>
  );
};

export default TabSelect;
