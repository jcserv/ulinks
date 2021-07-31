import { act, waitFor } from "@testing-library/react";
import React from "react";

import Contributors from "../../components/Contributors";
import { renderWrapped } from "../index";

describe("Renders contributors component", () => {
  it("Renders Contributors correctly", async () => {
    await act(async () => {
      const { getByTestId } = renderWrapped(<Contributors />);
      expect(getByTestId("contributors")).toBeInTheDocument();
    });
  });

  it("Renders correct contributors", async () => {
    await act(async () => {
      const { getByTestId } = renderWrapped(<Contributors />);
      await waitFor(() => {
        expect(getByTestId("jcserv")).toBeInTheDocument();
        expect(getByTestId("AipioxTechson")).toBeInTheDocument();
        expect(getByTestId("DigestedLime")).toBeInTheDocument();
      });
    });
  });
});
