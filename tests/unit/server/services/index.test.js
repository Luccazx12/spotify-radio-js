import { describe, test, jest, expect } from "@jest/globals";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import config from "../../../../server/config/index.js";
import { Service } from "../../../../server/services/index.js";
import TestUtil from "../../_util/test.util.js";

const {
  dir: { publicDirectory },
} = config;

describe("#Service - test suite for API service ", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("createFileStream ~ should create a file stream and return it", () => {
    const file = "/index.html";
    const mockFileStream = TestUtil.generateReadableStream(["data"]);

    jest.spyOn(fs, fs.createReadStream.name).mockResolvedValue(mockFileStream);

    const service = new Service();
    const serviceReturn = service.createFileStream(file);

    expect(fs.createReadStream).toBeCalledWith(file);
    expect(serviceReturn).resolves.toStrictEqual(mockFileStream);
  });

  test("getFileInfo ~ should get file info and return your name and type", async () => {
    const file = "/index.html";
    const expectedType = ".html";
    const expectedFullFilePath = publicDirectory + file;

    jest.spyOn(path, path.join.name).mockResolvedValue(expectedFullFilePath);

    jest
      .spyOn(fsPromises, fsPromises.access.name)
      .mockResolvedValue(expectedFullFilePath);

    jest.spyOn(path, path.extname.name).mockResolvedValue(expectedType);

    const service = new Service();
    const serviceReturn = await service.getFileInfo(file);

    expect(serviceReturn).toStrictEqual({
      name: expectedFullFilePath,
      type: expectedType,
    });
  });

  test("getFileStream ~ should create a file stream and return it with the file type", async () => {
    const file = "/index.html";
    const expectedType = ".html";
    const expectedFullFilePath = publicDirectory + file;
    const mockFileStream = TestUtil.generateReadableStream(["data"]);

    jest.spyOn(fs, fs.createReadStream.name).mockResolvedValue(mockFileStream);

    jest.spyOn(path, path.join.name).mockResolvedValue(expectedFullFilePath);

    jest
      .spyOn(fsPromises, fsPromises.access.name)
      .mockResolvedValue(expectedFullFilePath);

    jest.spyOn(path, path.extname.name).mockResolvedValue(expectedType);

    const service = new Service();
    const serviceReturn = await service.getFileStream(file);

    expect(serviceReturn.stream).resolves.toStrictEqual(mockFileStream);
    expect(serviceReturn.type).toStrictEqual(expectedType);
  });
});
