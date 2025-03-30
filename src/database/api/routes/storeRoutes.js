import { Store } from "../../models/store.js";
import express from 'express';
import mongoose from "mongoose";

const router = express.Router();

// Traer a todas las tiendas //
router.get('/', async (request, response) => {
    try {
        const stores = await Store.find({});
        response.status(200).json(stores);
    } catch (error) {
        response.status(500).json({ error: `Error al encontrar las tiendas: ${error}` });
        console.error('Error al encontrar las tiendas: ', error);
    }
})

// Creacion de una tienda //
router.post('/', async (request, response) => {
    try {
        const store = request.body;

        if (store.email && store.name && store.password && store.logo) {
            const newStore = new Store({
                logo: store.logo,
                email: store.email,
                name: store.name,
                password: store.password
            })

            const savedStore = await Store.insertOne(newStore)
                .then(response.status(201)
                .json({ "Tienda agregada": newStore }));
        } else {
            response.status(204).json({ error: 'Datos faltantes en la peticion' })
            console.error('Datos faltantes en la peticion');
        }

    } catch (error) {
        response.status(500).json({ error: `Error al agregar la tienda: ${error}` })
        console.error('Error al agregar la tienda: ', error);
    }
})

// Borrar una tienda por su ID //
router.delete('/:id', async (request, response) => {
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
router.put('/:id', async (request, response) => {
    try {
        const ObjectId = new mongoose.Types.ObjectId(request.params.id);
        const store = request.body;

        if (store) {
            if (store.email && store.name && store.password && store.logo) {
                const updateStore = {
                    logo: store.logo,
                    email: store.email,
                    name: store.name,
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

export default router;