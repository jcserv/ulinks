import { toHaveNoViolations } from "jest-axe";
import React from "react";

import Card from "../../components/Card";
import { renderWrapped } from "../index";

describe("Card", () => {
  expect.extend(toHaveNoViolations);

  const renderComponent = (props) => {
    const defaultProps = {
      name: "Group Chat",
      description: "A cool group chat",
      image: "/ant.jpg",
      links: [],
      id: "",
    };
    return renderWrapped(<Card {...defaultProps} {...props} />);
  };

  it("Render test", () => {
    const name = "Test";
    const { getByText } = renderComponent({
      name,
    });
    expect(getByText(name)).toBeInTheDocument();
  });
});
