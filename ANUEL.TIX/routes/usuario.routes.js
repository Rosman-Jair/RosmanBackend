import { Router } from "express";
import { 
    crearUsuario, 
    obtenerUsuarios,
    obtenerUsuarioById,
    loginUsuario, 
    actualizarUsuario, 
    eliminarUsuario 
} from "../controllers/usuario.controller.js";

const usuarioRouter = Router();

usuarioRouter.post("/", crearUsuario);
usuarioRouter.get("/", obtenerUsuarios);
usuarioRouter.get("/:id", obtenerUsuarioById);
usuarioRouter.put("/:id", actualizarUsuario);
usuarioRouter.delete("/:id", eliminarUsuario);
usuarioRouter.post("/login", loginUsuario);

export default usuarioRouter;
