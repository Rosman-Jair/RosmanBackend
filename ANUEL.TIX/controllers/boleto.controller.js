import Boleto from "../models/boleto.model.js";
import mongoose from "mongoose";

export const getBoletosCotizados = async (req, res) => {
    try {
        const boletos = await Boleto.find({}, { __v: 0 });
        res.status(200).json(boletos);
    } catch {
        res.status(500).json({ msg: "Error al obtener boletos" });
    }
};

export const getBoletoCotizadoById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ msg: "ID no válido" });

    try {
        const boleto = await Boleto.findById(id, { __v: 0 });
        if (!boleto) return res.status(404).json({ msg: "Boleto no encontrado" });

        res.status(200).json(boleto);
    } catch {
        res.status(500).json({ msg: "Error al obtener boleto" });
    }
};

export const postBoletoCotizado = async (req, res) => {
    try {
        const boleto = new Boleto(req.body);
        await boleto.save();
        res.status(201).json(boleto);
    } catch {
        res.status(500).json({ msg: "Error al guardar boleto" });
    }
};

export const putBoletoCotizado = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "ID no válido" });

    try {
        const boleto = await Boleto.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json(boleto);
    } catch {
        res.status(500).json({ msg: "Error al actualizar boleto" });
    }
};

export const deleteBoletoCotizado = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "ID no válido" });

    try {
        await Boleto.findByIdAndDelete(id);
        res.status(200).json({ msg: "Boleto eliminado" });
    } catch {
        res.status(500).json({ msg: "Error al eliminar boleto" });
    }
};
