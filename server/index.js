const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Prueba
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hola desde el backend!" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
