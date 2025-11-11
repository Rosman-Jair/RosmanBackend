import { Router } from "express";
import {
  getAllBoletos,
  getBoletoById,
  postBoleto,
  putBoleto,
  deleteBoleto,
} from "../controllers/boleto.controller.js";

const boletoRouter = Router();

boletoRouter.get("/", getAllBoletos);
boletoRouter.get("/:id", getBoletoById);
boletoRouter.post("/", postBoleto);
boletoRouter.put("/:id", putBoleto);
boletoRouter.delete("/:id", deleteBoleto);

export default boletoRouter;
