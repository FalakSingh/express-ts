import { createServer, Server as HttpServer } from "http";
import app from "./app";
import { Server as SocketServer } from "socket.io";
import { env, port } from "./envVars";
import database from "./database";

class Server {
  server: HttpServer;
  constructor() {
    this.server = createServer(app);
  }

  start() {
    database();

    this.server.listen(port, () => {
      console.log(
        `Server is up and running in ${env} environment on PORT: ${port}`
      );
    });
  }

  initSocket() {
    const io = new SocketServer(this.server);
  }
}

export default Server;
