import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";

import AdvancedSearchModal from "../../components/AdvancedSearchModal";
import { renderWrapped, wrapInApollo } from "../index";

jest.mock("../../apollo-client");

describe("AdvancedSearchModal", () => {
  expect.extend(toHaveNoViolations);

  const renderComponent = (props, mocks = []) => {
    const defaultProps = {
      isOpen: true,
      onClose: () => {},
      setGroupChats: () => {},
    };
    return renderWrapped(
      wrapInApollo(<AdvancedSearchModal {...defaultProps} {...props} />, mocks)
    );
  };

  it("Check axe violations", async () => {
    const { container } = renderComponent();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Basic render", async () => {
    const { getByText } = renderComponent();
    expect(getByText("Advanced Search")).toBeInTheDocument();
  });
});
