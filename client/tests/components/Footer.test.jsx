import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";

import Footer from "../../components/Footer";
import { contributors, links } from "../../constants/footerLinks";
import { formatAsList } from "../../helpers/formatters";
import { renderWrapped } from "../index";

describe("Footer", () => {
  expect.extend(toHaveNoViolations);

  it("Check axe violations", async () => {
    const { container } = renderWrapped(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Renders each contributor", () => {
    const { getByRole } = renderWrapped(<Footer />);
    // for some reason, it doesn't match when the delimiter is comma + space
    contributors.forEach((contributor, index) =>
      expect(
        getByRole("link", {
          name: formatAsList(contributor.name, index, contributors, ","),
          exact: false,
        }).href
      ).toBe(contributor.href)
    );
  });

  it("Renders each link", () => {
    const { getByTestId } = renderWrapped(<Footer />);
    links.forEach((link) =>
      expect(getByTestId(link.label).href).toBe(link.url)
    );
  });
});
