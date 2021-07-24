import { capitallize, formatAsList } from "../../helpers/formatters";

describe("capitallize", () => {
  it("single letter lowercase", () => {
    expect(capitallize("h")).toBe("H");
  });
  it("low caps", () => {
    expect(capitallize("hi")).toBe("Hi");
  });
  it("all caps", () => {
    expect(capitallize("HI")).toBe("HI");
  });
});

describe("formatAsList", () => {
  const mockData = [
    {
      name: "Ritvik Bhardwaj",
      expected: "Ritvik Bhardwaj, ",
    },
    {
      name: "Nina Ricci",
      expected: "Nina Ricci, ",
    },
    {
      name: "Jarrod Servilla",
      expected: "Jarrod Servilla, ",
    },
    {
      name: "Michael Phung",
      expected: "Michael Phung, ",
    },
    {
      name: "Yousef Bulbulia",
      expected: "Yousef Bulbulia",
    },
  ];

  it("standard usage", () => {
    mockData.forEach((item, index) =>
      expect(formatAsList(item.name, index, mockData)).toBe(item.expected)
    );
  });
});
