import mongoose from "mongoose";
import express from 'express';
import multer from "multer";
import { Product } from '../../models/product.js';

const router = express.Router();

// Configuración de multer para subir imagenes a uploads //
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.get('/', async (request, response) => {
    try {
        const products = await Product.find({});
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({ 'Error al traer todos los productos': `${error}` })
        console.log('Error al traer todos los productos: ', error);
    }
})

router.post('/', upload.single('productImage'), async (request, response) => {
    const { name, category, weight, weightType, price, description, stock } = request.body;

    try {
        // Verificamos si se subio una imagen o el path sera null //
        const imagePath = request.file ? request.file.path : null;

        if (name && category && weight && weightType && price && stock) {
            const newProduct = new Product({
                name: name,
                category: category,
                weight: weight,
                weightType: weightType,
                price: price,
                stock: stock,
                description: description,
                productImage: imagePath
            })

            Product.insertOne(newProduct)
                .then(response.status(201)
                    .json({ 'Producto creado': newProduct }));
        }
        else {
            console.error('Datos faltantes en el producto');
            response.status(204).json({ 'error': 'Datos faltantes en el producto' }).end();
        }
    } catch (error) {
        console.log('Error al agregar el producto: ', error);
        response.status(500).json({ 'Error al agregar el producto': `${error}` }).end();
    }
})

router.put('/:id', upload.single('productImage'), async (request, response) => {
    try {
        const id = new mongoose.Types.ObjectId(request.params.id);

        const { name, category, weight, weightType, price, description, stock } = request.body;

        // Verificamos si se subio una imagen o el path sera null //
        const imagePath = request.file ? request.file.path : null;

        const updateProduct = {
            name: name,
            category: category,
            weight: weight,
            weightType: weightType,
            price: price,
            stock: stock,
            description: description,
            productImage: imagePath
        }

        const updatedProduct = await Product.findOneAndUpdate(id, updateProduct);
        if (updateProduct) {
            response.status(200).json({ 'Producto actualizado': updatedProduct });
            console.log('Producto actualizado: ', updatedProduct);
        } else {
            response.status(404).json({ 'error': 'Producto no encontrado' }).end();
            console.error('Producto no encontrado: ', id);
        }
    } catch (error) {
        response.status(500).json({ 'Error de servidor': `${error}` }).end();
        console.error('Error del servidor al eliminar producto: ', error);
    }
})

router.delete('/:id', async (request, response) => {
    const id = new mongoose.Types.ObjectId(request.params.id);

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (deletedProduct) {
            response.status(200).send(`Producto de id ${id} eliminado`)
            console.log('Producto eliminado: ', id);
        } else {
            response.status(404).json({ 'error': 'Producto no encontrado' }).end();
            console.error('Producto no encontrado: ', id);
        }
    } catch (error) {
        console.error('Error el eliminar el producto: ', error);
        response.status(500).json({ 'Error al eliminar el producto': `${error}` }).end();
    }
})

export default router;

