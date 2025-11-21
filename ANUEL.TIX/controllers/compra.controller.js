import Compra from "../models/compra.model.js";
import mongoose from "mongoose";

export const getCompras = async (req, res) => {
    try {
        const compras = await Compra.find({}, { __v: 0 });
        res.status(200).json(compras);
    } catch {
        res.status(500).json({ msg: "Error al obtener compras" });
    }
};

export const getCompraById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ msg: "ID no válido" });

    try {
        const compra = await Compra.findById(id, { __v: 0 });
        if (!compra) return res.status(404).json({ msg: "Compra no encontrada" });

        res.status(200).json(compra);
    } catch {
        res.status(500).json({ msg: "Error al obtener compra" });
    }
};

export const createCompra = async (req, res) => {
    try {
        const body = req.body;
        const nuevaCompra = new Compra(body);
        await nuevaCompra.save();
        res.status(201).json({ msg: 'Compra registrada', body });
    } catch {
        res.status(500).json({ msg: "Error al registrar compra" });
    }
};

export const updateCompra = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ msg: "ID no válido" });

    try {
        await Compra.findByIdAndUpdate(id, req.body);
        res.status(200).json({ msg: "Compra actualizada" });
    } catch {
        res.status(500).json({ msg: "Error al actualizar compra" });
    }
};

export const deleteCompra = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ msg: "ID no válido" });

    try {
        await Compra.findByIdAndDelete(id);
        res.status(200).json({ msg: "Compra eliminada", id });
    } catch {
        res.status(500).json({ msg: "Error al eliminar compra" });
    }
};
