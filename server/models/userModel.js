const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido"],
    },
    password: {
      type: String,
      required: true,
    },
    fechaRegistro: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
