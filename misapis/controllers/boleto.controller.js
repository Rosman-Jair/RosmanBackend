import Boleto from "../models/boleto.model.js";
import mongoose from "mongoose";

export const getAllBoletos = async (req, res) => {
  try {
    const boletos = await Boleto.find({}, { __v: 0 });
    res.status(200).json({ boletos });
  } catch {
    res.status(500).json({ msg: "Error al obtener los boletos" });
  }
};

export const getBoletoById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ msg: "ID no válido" });

    const boleto = await Boleto.findById(id);
    if (!boleto) return res.status(404).json({ msg: "Boleto no encontrado" });

    res.status(200).json({ boleto });
  } catch {
    res.status(500).json({ msg: "Error al obtener el boleto" });
  }
};

export const postBoleto = async (req, res) => {
  const body = req.body;
  try {
    const boleto = new Boleto(body);
    await boleto.save();
    res.status(201).json({ msg: "Boleto creado", boleto });
  } catch (error) {
    res.status(500).json({ msg: "Error al guardar el boleto", error });
  }
};

export const putBoleto = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ msg: "ID no válido" });

    const boleto = await Boleto.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!boleto) return res.status(404).json({ msg: "Boleto no encontrado" });

    res.status(200).json({ msg: "Boleto actualizado", boleto });
  } catch {
    res.status(500).json({ msg: "Error al actualizar el boleto" });
  }
};

export const deleteBoleto = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ msg: "ID no válido" });

    const boleto = await Boleto.findByIdAndDelete(id);
    if (!boleto) return res.status(404).json({ msg: "Boleto no encontrado" });

    res.status(200).json({ msg: "Boleto eliminado", boleto });
  } catch {
    res.status(500).json({ msg: "Error al eliminar el boleto" });
  }
};
