import mongoose from "mongoose";

const compraSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: String, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Compra", compraSchema);
