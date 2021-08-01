import axios from "axios";

import {
  config,
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  serverUrl,
} from "../../helpers";

jest.mock("axios");

const path = "/foo/bar";

describe("Get Request", () => {
  it("Appends a trailing slash if not present", async () => {
    await getRequest(path, null);
    expect(axios.get).toHaveBeenCalledWith(`${serverUrl + path}/`, config);
  });

  it("Includes searchParams if provided", async () => {
    const searchPath = "/foo/bar/";
    const params = "?value=10";
    await getRequest(searchPath, params);
    expect(axios.get).toHaveBeenCalledWith(
      serverUrl + searchPath + params,
      config
    );
  });
});

describe("Delete Request", () => {
  it("Appends a trailing slash if not present", async () => {
    await deleteRequest(path);
    expect(axios.delete).toHaveBeenCalledWith(`${serverUrl + path}/`, config);
  });
});

describe("Patch Request", () => {
  it("Appends trailing slash if not present + called with data", async () => {
    const data = {
      foo: "bar",
    };
    await patchRequest(path, data);
    expect(axios.patch).toHaveBeenCalledWith(
      `${serverUrl + path}/`,
      data,
      config
    );
  });
});

describe("Post Request", () => {
  it("Appends trailing slash if not present + called with data", async () => {
    const data = {
      foo: "bar",
    };
    await postRequest(path, data);
    expect(axios.post).toHaveBeenCalledWith(
      `${serverUrl + path}/`,
      data,
      config
    );
  });
});
