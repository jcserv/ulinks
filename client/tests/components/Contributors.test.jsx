import { act, waitFor } from "@testing-library/react";
import React from "react";

import Contributors from "../../components/Contributors";
import { renderWrapped } from "../index";
import { mockContributors } from "../mockData";

describe("Renders contributors component", () => {
  it("Renders Contributors correctly", async () => {
    await act(async () => {
      const { getByTestId } = renderWrapped(<Contributors />);
      await waitFor(() =>
        expect(getByTestId("contributors")).toBeInTheDocument()
      );
    });
  });

  it("Renders correct contributors", async () => {
    await act(async () => {
      const { getByTestId } = renderWrapped(<Contributors />);
      await waitFor(() => {
        mockContributors.forEach((contributor) =>
          expect(getByTestId(contributor.login)).toBeInTheDocument()
        );
      });
    });
  });
});
