import { describe, test, jest, expect } from "@jest/globals";
import { Controller } from "../../../../server/controller/index.js";
import { Service } from "../../../../server/services/index.js";
import TestUtil from "../../_util/test.util.js";

describe("#Controller - test suite for API controller ", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("createFileStream ~ should create a file stream and return it", async () => {
    const file = "/index.html";
    const expectedType = ".html";
    const mockFileStream = TestUtil.generateReadableStream(["data"]);

    jest
      .spyOn(Service.prototype, Service.prototype.getFileStream.name)
      .mockResolvedValue({
        stream: mockFileStream,
        type: expectedType,
      });

    const controller = new Controller();

    const controllerReturn = await controller.getFileStream(file);

    expect(controllerReturn).toStrictEqual({
      stream: mockFileStream,
      type: expectedType,
    });
  });
});
