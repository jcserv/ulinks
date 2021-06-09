import { Heading } from "@chakra-ui/react";
import React from "react";

import styles from "../styles/components/SectionContainer.module.css";

export default function SectionContainer({
  children,
  headerMt = "",
  headerText = "",
  height = "70vh",
  useHeaderStyle = false,
  ...props
}) {
  return (
    <div className="col-8" style={{ height }} {...props}>
      <div className="row-12">
        <Heading
          as="h1"
          mt={headerMt}
          className={useHeaderStyle ? styles.header : ""}
        >
          {headerText}
        </Heading>
      </div>
      <div className="row-12">
        <div className={styles.column}>{children}</div>
      </div>
    </div>
  );
}
