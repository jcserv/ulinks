import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";

import Emoji from "../../components/Emoji";
import { renderWrapped } from "../index";

describe("Emoji", () => {
  expect.extend(toHaveNoViolations);

  const renderComponent = (props) => {
    const defaultProps = {
      label: "",
      symbol: "",
    };
    return renderWrapped(<Emoji {...defaultProps} {...props} />);
  };

  it("Check axe violations", async () => {
    const { container } = renderComponent();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Render test", () => {
    const props = {
      label: "test",
      symbol: "&#128153;",
    };
    const { getByText } = renderComponent(props);
    expect(getByText(props.symbol)).toBeInTheDocument();
  });
});
