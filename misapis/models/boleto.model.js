import mongoose from "mongoose";

const boletoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  edad: {
    type: Number,
    required: [true, "La edad es obligatoria"],
  },
  cantidad: {
    type: Number,
    required: [true, "La cantidad de boletos es obligatoria"],
  },
  eventos: {
    type: [String],
    required: [true, "Debes seleccionar al menos un evento"],
  },
  total: {
    type: Number,
    required: [true, "El total es obligatorio"],
  },
});

const Boleto = mongoose.model("Boleto", boletoSchema);

export default Boleto;
