import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";

import GCCard from "../../components/Card";
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
    return renderWrapped(<GCCard {...defaultProps} {...props} />);
  };

  it("Check axe violations", async () => {
    const { container } = renderComponent();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Render test", () => {
    const name = "Test";
    const { getByText } = renderComponent({
      name,
    });
    expect(getByText(name)).toBeInTheDocument();
  });
});
