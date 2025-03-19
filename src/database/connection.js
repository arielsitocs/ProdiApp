import mongoose from "mongoose";
import dotenv from "dotenv"

// Traemos las variables del .env al archivo //
dotenv.config();

// Se realiza la conexion a la BD de mongo por medio del url del cluster //
export const Connection = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL);
        console.log('Conexion a BD exitosa.');
    } catch (error) {
        console.error('Error al conectar a la BD: ', error);
    }
}