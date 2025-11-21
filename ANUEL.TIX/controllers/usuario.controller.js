import Usuario from "../models/usuario.model.js";
import mongoose from "mongoose";

export const crearUsuario = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const existente = await Usuario.findOne({ correo });
        if (existente) {
            return res.status(400).json({ msg: "El correo ya está registrado" });
        }

        const usuario = new Usuario({ correo, contraseña });

        const errorValidacion = usuario.validateSync();
        if (errorValidacion) {
            const errores = Object.values(errorValidacion.errors).map(err => err.message);
            return res.status(400).json({ msg: errores });
        }

        await usuario.save();

        return res.status(201).json({
            msg: "Usuario registrado exitosamente",
            usuario
        });

    } catch {
        return res.status(500).json({ msg: "Error al registrar usuario" });
    }
};

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({}, { __v: 0 });
        res.status(200).json(usuarios);
    } catch {
        res.status(500).json({ msg: "Error al obtener usuarios" });
    }
};

export const obtenerUsuarioById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ msg: "ID no válido" });

    try {
        const usuario = await Usuario.findById(id, { __v: 0 });
        if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

        res.status(200).json(usuario);
    } catch {
        res.status(500).json({ msg: "Error al obtener usuario" });
    }
};

export const loginUsuario = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) return res.status(400).json({ msg: "Correo no registrado" });
        if (usuario.contraseña !== contraseña) return res.status(400).json({ msg: "Contraseña incorrecta" });

        return res.status(200).json({ msg: "Login exitoso", usuario });

    } catch {
        return res.status(500).json({ msg: "Error al iniciar sesión" });
    }
};

export const actualizarUsuario = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ msg: "ID no válido" });

    try {
        await Usuario.findByIdAndUpdate(id, req.body);
        res.status(200).json({ msg: "Usuario actualizado" });
    } catch {
        res.status(500).json({ msg: "Error al actualizar" });
    }
};

export const eliminarUsuario = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ msg: "ID no válido" });

    try {
        await Usuario.findByIdAndDelete(id);
        res.status(200).json({ msg: "Usuario eliminado" });
    } catch {
        res.status(500).json({ msg: "Error al eliminar" });
    }
};
