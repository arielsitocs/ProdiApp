import { useState } from "react";
import { useNavigate } from "react-router";

import Loader from '../loader/loader.jsx';

import './create-product.css';

function CreateProduct() {

    const navigate = useNavigate();

    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [weight, setWeight] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [description, setDescription] = useState();
    const [productImage, setProductImage] = useState();
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            
            const formData = new FormData();
            formData.append("name", name);
            formData.append("category", category);
            formData.append("weight", weight);
            formData.append("price", price);
            formData.append("stock", stock)
            formData.append("description", description);
            formData.append("productImage", productImage);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                navigate('/products')
                console.log(`Producto ${name} creado`)
            } else {
                console.error(`Error al crear ${name}`)
            }
        } catch (error) {
            console.log('Error al hacer la peticion de crear producto: ', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="background">
                <form onSubmit={handleCreate} className="create-product-form">
                    <div className="create-product-header">
                        <h1 className='header-title'>Crear tu Producto</h1>
                        <h1 className='header-app-name'>ProdiApp</h1>
                    </div>
                    <div className="product-data">
                        <div className="top-row">
                            <div className="product-name">
                                <h2>Nombre</h2>
                                <input required type="text" placeholder='Ingresa el nombre de tu producto...' onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="product-category">
                                <h2>Categoría</h2>
                                <input required type="text" placeholder='Ingresa la categoría de tu producto...' onChange={e => setCategory(e.target.value)} />
                            </div>
                        </div>
                        <div className="middle-row">
                            <div className="product-quantity">
                                <h2>Peso Base</h2>
                                <input required type="number" placeholder='Ingresa el peso por unidad (gr, ltr, etc)' onChange={e => setWeight(e.target.value)} />
                            </div>
                            <div className="product-price">
                                <h2>Precio(CLP)</h2>
                                <input required type="number" placeholder='Ingresa el precio de tu producto...' onChange={e => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className="bottom-row">
                            <div className="product-description">
                                <h2>Descripción Producto</h2>
                                <textarea required placeholder='Describe tu producto detadallamente...' onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                            <div className="product-stock">
                                <h2>Stock Disponible</h2>
                                <input required type="number" placeholder='Disponibilidad de su producto...' onChange={e => setStock(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="product-picture">
                            <h2>Foto del Producto</h2>
                            <input required type="file" className="picture-input" onChange={e => setProductImage(e.target.files[0])} />
                        </div>
                    </div>
                    <div className="create-product-button">
                        <button type="submit">CREAR PRODUCTO</button>
                    </div>
                </form>
            </div>
            {
                loading ? <Loader message={'Creando producto...'}/> : <></>
            }
    
        </>
    )
}

export default CreateProduct;