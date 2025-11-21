import { Router } from "express";
import { 
    getBoletosCotizados, 
    getBoletoCotizadoById,
    postBoletoCotizado, 
    putBoletoCotizado, 
    deleteBoletoCotizado 
} from "../controllers/boleto.controller.js";

const boletosRouter = Router();

boletosRouter.get("/", getBoletosCotizados);
boletosRouter.get("/:id", getBoletoCotizadoById);
boletosRouter.post("/", postBoletoCotizado);
boletosRouter.put("/:id", putBoletoCotizado);
boletosRouter.delete("/:id", deleteBoletoCotizado);

export default boletosRouter;
