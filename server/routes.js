import config from "./config.js";
import { logger } from "./util.js";
import { Controller } from "./controller.js";

const {
  location,
  pages: { homeHTML, controllerHTML },
  constants: { CONTENT_TYPE },
} = config;

const controller = new Controller();

async function routes(request, response) {
  const { method, url } = request;

  const getFileStream = async (file) => {
    const { stream, type } = await controller.getFileStream(file);
    return { stream, type };
  };

  switch ((method, url)) {
    // Redirecionando para home
    case "GET" && "/":
      response.writeHead(302, {
        Location: location.home,
      });
      return response.end();

    case "GET" && "/home":
      const homeResponse = await getFileStream(homeHTML);
      return homeResponse.stream.pipe(response);

    case "GET" && "/controller":
      // Entregando o HTML
      const controllerResponse = await getFileStream(controllerHTML);
      return controllerResponse.stream.pipe(response);

    // Files
    default:
      const { stream, type } = await getFileStream(url);
      const contentType = CONTENT_TYPE[type];
      if (contentType) {
        response.writeHead(200, {
          "Content-Type": contentType,
        });
      }
      return stream.pipe(response);
  }
}

function handlerError(error, response) {
  if (error.message.includes("ENOENT")) {
    logger.warn(`asset not found ${error.stack}`);
    response.writeHead(404);
    return response.end();
  }
  logger.error(`caught error on API ${error.stack}`);
  response.writeHead(500);
  return response.end();
}

export function handler(request, response) {
  return routes(request, response).catch((error) =>
    handlerError(error, response)
  );
}
