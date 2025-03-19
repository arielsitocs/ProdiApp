import { Connection } from "../connection.js";
import { User } from "../models/user.js";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";

// Conectamos a la BD por medio de la funcion connection importada //
Connection();
// Se traen las variables de entorno desde el archivo .env //
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
    console.log('Servidor escuchando.');
})

app.get('/', (request, response) => {
    response.status(200).json({ message: "api/users para ver todos los usuarios." })
})

// Traer a todos los usuarios //
app.get('/api/users', async (request, response) => {
    try {
        const users = await User.find({});
        response.status(200).json(users);
    } catch (error) {
        response.status(500).json({ error: `Error al encontrar los usuarios: ${error}` });
        console.error('Error al encontrar los usuarios: ', error);
    }
})

// Creacion de un usuario //
app.post('/api/users', async (request, response) => {
    try {
        const user = request.body;

        if (user) {
            if (user.email && user.username && user.password) {
                const newUser = new User({
                    email: user.email,
                    username: user.username,
                    password: user.password
                })

                const savedUser = await User.insertOne(newUser)
                    .then(response.status(201)
                        .json({ "Usuario agregado": newUser }));
            } else {
                response.status(204).json({ error: 'Datos faltantes en la peticion' })
                console.error('Datos faltantes en la peticion');
            }
        }
    } catch (error) {
        response.status(500).json({ error: `Error al agregar el usuario: ${error}` })
        console.error('Error al agregar el usuario: ', error);
    }
})

// Borrar a un usuario por su ID //
app.delete('/api/users/:id', async (request, response) => {
    try {
        // Convertimos el id de la peticion al tipo de id de mongoDB //
        const ObjectId = new mongoose.Types.ObjectId(request.params.id);

        await User.findOneAndDelete(ObjectId)
            .then(response.status(202)
                .send(`Usuario de ID ${ObjectId} eliminado`));

    } catch (error) {
        response.status(500).json({ error: `Error al eliminar el usuario: ${error}` })
        console.error('Error al eliminar el usuario: ', error);
    }
})

// Actualizar un usuario por su ID //
app.put('/api/users/:id', async (request, response) => {
    try {
        const ObjectId = new mongoose.Types.ObjectId(request.params.id);
        const user = request.body;

        if (user) {
            if (user.email && user.username && user.password) {
                const updateUser = {
                    email: user.email,
                    username: user.username,
                    password: user.password
                }

                const updatedUser = await User.findByIdAndUpdate(ObjectId, updateUser)
                    .then(response.status(201)
                        .json({ "Usuario modificado": updateUser }));
            } else {
                response.status(204).json({ error: 'Datos faltantes en la peticion' })
                console.error('Datos faltantes en la peticion');
            }
        }

    } catch (error) {
        response.status(500).json(`Error al modificar el usuario: ${error}`)
        console.error('Error al modificar el usuario: ', error);
    }
})
