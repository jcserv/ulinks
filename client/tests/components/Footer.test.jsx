import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";

import Footer from "../../components/Footer";
import { links } from "../../constants/footerLinks";
import { renderWrapped } from "../index";

describe("Footer", () => {
  expect.extend(toHaveNoViolations);

  it("Check axe violations", async () => {
    const { container } = renderWrapped(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Renders each link", () => {
    const { getByTestId } = renderWrapped(<Footer />);
    links.forEach((link) =>
      expect(getByTestId(link.label).href).toBe(link.url)
    );
  });
});
