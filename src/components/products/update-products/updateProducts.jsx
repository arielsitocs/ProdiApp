import './updateProducts.css';
import { useEffect, useState } from 'react';

import close from '../../../assets/close.svg';

function UpdateProducts({ state, setUpdateState, id, name, category, weight, price, description, productImage }) {

    const [newName, setName] = useState(name);
    const [newCategory, setCategory] = useState(category);
    const [newWeight, setWeight] = useState(weight);
    const [newPrice, setPrice] = useState(price);
    const [newDescription, setDescription] = useState(description);
    const [newProductImage, setProductImage] = useState(productImage);

    useEffect(() => {
        setName(name);
        setCategory(category);
        setWeight(weight);
        setPrice(price);
        setDescription(description);
        setProductImage(productImage);
    }, [name, category, weight, price, description, productImage]);

    const handleUpdate = async (e) => {
        try {
            const formData = new FormData();
            formData.append("name", newName);
            formData.append("category", newCategory);
            formData.append("weight", newWeight);
            formData.append("price", newPrice);
            formData.append("stock", 10)
            formData.append("description", newDescription);
            formData.append("productImage", newProductImage);

            const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'PUT',
                body: formData
            })

            if (response.ok) {
                console.log(`Producto ${name} actualizado`);
            } else {
                console.error(`Error al actualizar el producto ${name}`);
            }
        } catch (error) {
            console.error('Error al actualizar el producto: ', error);
        }
    }

    const closeUpdateState = () => {
        setUpdateState(false)
    }

    // Renderiza el componente solo si state es true
    if (state)

        return (
            <div className="update-product-background">
                <form onSubmit={handleUpdate} className="update-product-form">
                    <div className="update-product-header">
                        <h1 className='header-title'>Actualiza tu Producto</h1>
                        <h1 className='header-app-name'>ProdiApp</h1>
                    </div>
                    <div className="product-data">
                        <div className="update-close">
                            <img src={close} alt="-" onClick={closeUpdateState} />
                        </div>
                        <div className="top-row">
                            <div className="product-name">
                                <h2>Nombre</h2>
                                <input required type="text" placeholder='Ingresa el nombre de tu producto...' value={newName} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="product-category">
                                <h2>Categoría</h2>
                                <input required type="text" placeholder='Ingresa la categoría de tu producto...' value={newCategory} onChange={(e) => setCategory(e.target.value)} />
                            </div>
                        </div>
                        <div className="middle-row">
                            <div className="product-quantity">
                                <h2>Gramaje/Litraje</h2>
                                <input required type="text" placeholder='Ingresa la cantidad por unidad...' value={newWeight} onChange={(e) => setWeight(e.target.value)} />
                            </div>
                            <div className="product-price">
                                <h2>Precio</h2>
                                <input required type="text" placeholder='Ingresa el precio de tu producto...' value={newPrice} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className="bottom-row">
                            <div className="product-description">
                                <h2>Descripción Producto</h2>
                                <textarea required placeholder='Describe tu producto detadallamente...' value={newDescription} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <div className="product-picture">
                                <h2>Foto del Producto</h2>
                                <input type="file" className="picture-input" onChange={(e) => setProductImage(e.target.files[0])} />
                            </div>
                        </div>
                    </div>
                    <div className="update-product-button">
                        <button type="submit">ACTUALIZAR PRODUCTO</button>
                    </div>
                </form>
            </div>
        )
}

export default UpdateProducts;