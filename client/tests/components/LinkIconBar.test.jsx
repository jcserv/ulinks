import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";

import LinkIconBar from "../../components/LinkIconBar";
import { links } from "../../constants/footerLinks";
import { renderWrapped } from "../index";

describe("LinkIconBar", () => {
  expect.extend(toHaveNoViolations);

  const renderComponent = (props) => {
    const defaultProps = {
      links: [],
    };
    return renderWrapped(<LinkIconBar {...defaultProps} {...props} />);
  };

  it("Check axe violations", async () => {
    const { container } = renderWrapped(<LinkIconBar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  /*
  it("Renders each link", () => {
    const { getByTestId } = renderComponent();
    links.forEach((link) =>
      expect(getByTestId(link.label).href).toBe(link.url)
    );
  }); */
});
