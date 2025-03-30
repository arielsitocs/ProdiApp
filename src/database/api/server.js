import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import storeRoutes from './routes/storeRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { Connection } from '../connection.js'; 

dotenv.config();
Connection();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.SERVER_PORT;

// Definimos una ruta principal, ya que todas las apis usaran este mismo servidor
app.get('/', (request, response) => {
    response.status(200).json({ 'message': 'Estas usando la API de ProdiApp. api/products -> productos, api/stores -> tiendas' })
})

// Usamos las rutas definidas en cada api //
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log('Servidor iniciado correctamente...')
});
