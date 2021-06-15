import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";

import Emoji from "../../components/Emoji";
import { renderWrapped } from "../index";

describe("Emoji", () => {
  expect.extend(toHaveNoViolations);

  it("Check axe violations", async () => {
    const { container } = renderWrapped(<Emoji />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
