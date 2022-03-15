import fs from "fs";
import fsPromises from "fs/promises";
import config from "./config.js";
import { join, extname } from "path";

const {
  dir: { publicDirectory },
} = config;

export class Service {
  createFileStream(filename) {
    return fs.createReadStream(filename);
  }

  async getFileInfo(file) {
    // file = home/index.html
    const fullFilePath = join(publicDirectory, file);

    // Validar se existe o arquivo
    await fsPromises.access(fullFilePath);

    // Recuperando tipo do arquivo
    const fileType = extname(fullFilePath);

    return {
      name: fullFilePath,
      type: fileType,
    };
  }

  async getFileStream(file) {
    const { name, type } = await this.getFileInfo(file);
    return {
      stream: this.createFileStream(name),
      type,
    };
  }
}
