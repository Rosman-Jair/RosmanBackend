import Server from "./server/server.js";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

const server = new Server();
server.listen();

console.log("Anuel AA - Boleterías Server Ready");
