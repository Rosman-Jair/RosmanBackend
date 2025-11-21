import { Router } from "express";
import usuarioRouter from "./usuario.routes.js";
import compraRouter from "./compra.routes.js";
import boletosRouter from "./boleto.routes.js";

const indexRoutes = Router();

indexRoutes.use("/usuarios", usuarioRouter);
indexRoutes.use("/CompraBoletos", compraRouter);
indexRoutes.use("/boletos", boletosRouter);


export default indexRoutes;
