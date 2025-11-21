import { Router } from "express";
import { getCompras, getCompraById, createCompra, updateCompra, deleteCompra } from "../controllers/compra.controller.js";

const compra = Router();

compra.get('/', getCompras);
compra.get('/:id', getCompraById);
compra.post('/', createCompra);
compra.put('/:id', updateCompra);
compra.delete('/:id', deleteCompra);

export default compra;
