import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
        trim: true
    },
    contraseña: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [6, "La contraseña debe tener mínimo 6 caracteres"]
    }
}, {
    timestamps: true
});

export default mongoose.model("Usuario", usuarioSchema);
