import { Connection } from "../connection.js";
import { Store } from "../models/store.js";
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
    response.status(200).json({ message: "api/stores para ver todas las tiendas." })
})

// Traer a todas las tiendas //
app.get('/api/stores', async (request, response) => {
    try {
        const stores = await Store.find({});
        response.status(200).json(stores);
    } catch (error) {
        response.status(500).json({ error: `Error al encontrar las tiendas: ${error}` });
        console.error('Error al encontrar las tiendas: ', error);
    }
})

// Creacion de una tienda //
app.post('/api/stores', async (request, response) => {
    try {
        const store = request.body;

        if (store) {
            if (store.email && store.username && store.password) {
                const newStore = new Store({
                    email: store.email,
                    username: store.username,
                    password: store.password
                })

                const savedStore = await Store.insertOne(newStore)
                    .then(response.status(201)
                        .json({ "Tienda agregada": newStore }));
            } else {
                response.status(204).json({ error: 'Datos faltantes en la peticion' })
                console.error('Datos faltantes en la peticion');
            }
        }
    } catch (error) {
        response.status(500).json({ error: `Error al agregar la tienda: ${error}` })
        console.error('Error al agregar la tienda: ', error);
    }
})

// Borrar una tienda por su ID //
app.delete('/api/stores/:id', async (request, response) => {
    try {
        // Convertimos el id de la peticion al tipo de id de mongoDB //
        const ObjectId = new mongoose.Types.ObjectId(request.params.id);

        await Store.findOneAndDelete(ObjectId)
            .then(response.status(202)
                .send(`Tienda de ID ${ObjectId} eliminada`));

    } catch (error) {
        response.status(500).json({ error: `Error al eliminar la tienda: ${error}` })
        console.error('Error al eliminar la tienda: ', error);
    }
})

// Actualizar una tienda por su ID //
app.put('/api/stores/:id', async (request, response) => {
    try {
        const ObjectId = new mongoose.Types.ObjectId(request.params.id);
        const store = request.body;

        if (store) {
            if (store.email && store.username && store.password) {
                const updateStore = {
                    email: store.email,
                    username: store.username,
                    password: store.password
                }

                const updatedStore = await Store.findByIdAndUpdate(ObjectId, updateStore)
                    .then(response.status(201)
                        .json({ "Tienda modificada": updateStore }));
            } else {
                response.status(204).json({ error: 'Datos faltantes en la peticion' })
                console.error('Datos faltantes en la peticion');
            }
        }

    } catch (error) {
        response.status(500).json(`Error al modificar la tienda: ${error}`)
        console.error('Error al modificar la tienda: ', error);
    }
})