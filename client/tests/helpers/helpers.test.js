import { mapAsOption, redirect, removeDuplicates } from "../../helpers";

describe("mapAsOption", () => {
  it("Standard usage", async () => {
    const mockData = [
      {
        value: "hello",
      },
    ];
    expect(mapAsOption(mockData, "value")).toStrictEqual([
      {
        label: "hello",
        value: "hello",
      },
    ]);
  });
});

describe("redirect", () => {
  let mockData;
  beforeEach(() => {
    mockData = {
      path: "",
      push: jest.fn(),
      locale: "en",
      defaultLocale: "en",
    };
  });
  it("Standard usage", async () => {
    redirect(
      mockData.path,
      mockData.push,
      mockData.locale,
      mockData.defaultLocale
    );
    expect(mockData.push).toHaveBeenCalledWith(mockData.path);
  });

  it("Non-root path", async () => {
    const path = "/login";
    redirect(path, mockData.push, mockData.locale, mockData.defaultLocale);
    expect(mockData.push).toHaveBeenCalledWith(path);
  });

  it("Different locale", async () => {
    redirect(mockData.path, mockData.push, "fr", mockData.defaultLocale);
    expect(mockData.push).toHaveBeenCalledWith("fr");
  });

  it("Different locale + non-root path", async () => {
    const path = "/id/testingVan";
    redirect(path, mockData.push, "fr", mockData.defaultLocale);
    expect(mockData.push).toHaveBeenCalledWith(`fr${path}`);
  });
});

describe("removeDuplicates", () => {
  it("Null", async () => {
    const mockData = [];
    expect(removeDuplicates(mockData)).toStrictEqual(mockData);
  });

  it("Repeated items", async () => {
    const mockData = [1, 2, 2];
    expect(removeDuplicates(mockData)).toStrictEqual([1, 2]);
  });
});
