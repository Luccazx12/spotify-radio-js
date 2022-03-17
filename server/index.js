import server from "./server.js";
import config from "./config/index.js";
import { logger } from "./util/index.js";

server.listen(config.port).on("listening", () => {
  // logger.info(config)
  logger.info(`server running at port ${server.address().port || config.port}`);
});
