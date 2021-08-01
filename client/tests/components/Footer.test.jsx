import { act, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";

import Footer from "../../components/Footer";
import { renderWrapped } from "../index";

describe("Footer", () => {
  expect.extend(toHaveNoViolations);

  it("Check axe violations", async () => {
    await act(async () => {
      const { container } = renderWrapped(<Footer />);
      const results = await axe(container);
      await waitFor(() => expect(results).toHaveNoViolations());
    });
  });
});
