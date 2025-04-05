import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    weight: Number,
    price: Number,
    stock: Number,
    description: String,
    productImage: String,
    createdAt: { type: Date, default: Date.now }
})

// Funcion que nos permite instruir al toJSON como deberia hacer la transformacion segun nuestras necesidades
ProductSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id // Asignamos el id creado en mongoDB al objeto creado por nosotros 
        delete returnedObject._id // Borramos el campo de _id ya que se lo asignamos al objeto
        delete returnedObject.__v // Borramos el campo de __v ya que no nos sirve de nada
    }
})

export const Product = mongoose.model('Product', ProductSchema);