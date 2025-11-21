import mongoose from "mongoose";

const boletoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  eventos: { type: [String], required: true },
  total: { type: Number, required: true }
});

const Boleto = mongoose.model("Boleto", boletoSchema);
export default Boleto;
