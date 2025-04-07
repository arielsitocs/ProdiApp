import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    logo: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
})

// Funcion que nos permite instruir al toJSON como deberia hacer la transformacion segun nuestras necesidades
storeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id // Asignamos el id creado en mongoDB al objeto creado por nosotros 
        delete returnedObject._id // Borramos el campo de _id ya que se lo asignamos al objeto
        delete returnedObject.__v // Borramos el campo de __v ya que no nos sirve de nada
    }
})

export const Store = mongoose.model('Store', storeSchema);

