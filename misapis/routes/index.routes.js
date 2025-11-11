import { Router } from "express";
import boletoRouter from "./boleto.routes.js";

const indexRoutes = Router();

indexRoutes.use("/boleterias", boletoRouter);

export default indexRoutes;
