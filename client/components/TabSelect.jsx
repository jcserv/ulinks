import {Tab, TabList, Tabs, useColorModeValue} from "@chakra-ui/react";
import React from "react";

const TabSelect = ({ tabs, onChange }) => {
  const highlightedColor = useColorModeValue("black", "gray.500");
  const selectedColor = useColorModeValue("green", "blue");
  return(
      <Tabs
          variant="soft-rounded"
          colorScheme={selectedColor}
          mt="auto"
          mb="auto"
          mr="10vw"
          onChange={(index) => onChange(index)}
      >
        <TabList>
          {tabs &&
          tabs.map((tab) => (
              <Tab aria-label={tab.label} key={tab.label} _hover={{color: highlightedColor}}>
                <tab.icon style={{ marginRight: "5px" }}/>
                {tab.label || ""}
              </Tab>
          ))}
        </TabList>
      </Tabs>
  );
}


export default TabSelect;
