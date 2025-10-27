const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
    console.log(`Base de datos: ${conn.connection.name}`);

    // Manejo de eventos de conexión
    mongoose.connection.on("error", (err) => {
      console.error("Error en MongoDB:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB desconectado");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB desconectado por cierre de aplicación");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;