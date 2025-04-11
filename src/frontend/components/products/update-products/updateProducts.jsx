import './updateProducts.css';
import { useState, useEffect } from 'react';

import close from '../../../assets/close.svg';

import Loader from '../../loader/loader';

function UpdateProducts({ state, setUpdateState, id, name, category, weight, weightType, price, description, productImage, updateProductInList }) {

    const [productName, setProductName] = useState(name);
    const [productCategory, setProductCategory] = useState(category);
    const [productWeight, setProductWeight] = useState(weight);
    const [productWeightType, setProductWeightType] = useState(weightType);
    const [productPrice, setProductPrice] = useState(price);
    const [productDescription, setProductDescription] = useState(description);
    const [productImageFile, setProductImageFile] = useState(productImage);
    const [loading, setLoading] = useState(false);

    // Sincroniza los estados con las props cuando cambian // 
    useEffect(() => {
        setProductName(name);
        setProductCategory(category);
        setProductWeight(weight);
        setProductWeightType(weightType);
        setProductPrice(price);
        setProductDescription(description);
        setProductImageFile(productImage);
    }, [name, category, weight, weightType, price, description, productImage]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Actualización optimista, esto se concreta en la funcion de abajo //
        const updatedProduct = {
            id,
            name: productName,
            category: productCategory,
            weight: productWeight,
            weightType: productWeightType,
            price: productPrice,
            description: productDescription,
            productImage: productImageFile,
        };

        // Actualiza la lista de productos en el componente padre de inmediato, sin tener que esperar respuesta //
        updateProductInList(id, updatedProduct);

        try {
            const formData = new FormData();
            formData.append("name", productName);
            formData.append("category", productCategory);
            formData.append("weight", productWeight);
            formData.append("weightType", productWeightType);
            formData.append("price", productPrice);
            formData.append("stock", 10);
            formData.append("description", productDescription);
            formData.append("productImage", productImageFile);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                console.log(`Producto ${productName} actualizado`);
                setUpdateState(false);
            }
        } catch (error) {
            console.error('Error al actualizar el producto: ', error);
        } finally {
            setLoading(false);
        }
    };

    if (state)
        return (
            <>
                <div className="update-product-background">
                    <form onSubmit={handleUpdate} className="update-product-form">
                        <div className="update-product-header">
                            <h1 className="header-title">Actualiza tu Producto</h1>
                            <h1 className="header-app-name">ProdiApp</h1>
                        </div>
                        <div className="product-data">
                            <div className="update-close">
                                <img src={close} alt="-" onClick={() => setUpdateState(false)} />
                            </div>
                            <div className="top-row">
                                <div className="product-name">
                                    <h2>Nombre</h2>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Ingresa el nombre de tu producto..."
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </div>
                                <div className="product-category">
                                    <h2>Categoría</h2>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Ingresa la categoría de tu producto..."
                                        value={productCategory}
                                        onChange={(e) => setProductCategory(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="middle-row">
                                <div className="product-weight">
                                    <div className="weight-number">
                                        <h2>Peso Base</h2>
                                        <input
                                            required
                                            type="number"
                                            placeholder="Ingresa el peso por unidad (gr, ltr, etc)"
                                            value={productWeight}
                                            onChange={(e) => setProductWeight(e.target.value)}
                                        />
                                    </div>
                                    <div className="weight-type">
                                        <h2>Tipo de Peso</h2>
                                        <select
                                            value={productWeightType}
                                            onChange={(e) => setProductWeightType(e.target.value)}
                                            className="weight-type"
                                        >
                                            <option value="kg">Kilo/s</option>
                                            <option value="gr">Gramos</option>
                                            <option value="lt">Litro/s</option>
                                            <option value="ml">Mililitros</option>
                                            <option value="oz">Onza/s</option>
                                            <option value="lb">Libra/s</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h2>Precio</h2>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Ingresa el precio de tu producto..."
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="bottom-row">
                                <div className="product-description">
                                    <h2>Descripción Producto</h2>
                                    <textarea
                                        required
                                        placeholder="Describe tu producto detalladamente..."
                                        value={productDescription}
                                        onChange={(e) => setProductDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="product-picture">
                                    <h2>Foto del Producto</h2>
                                    <input
                                        type="file"
                                        className="picture-input"
                                        onChange={(e) => setProductImageFile(e.target.files[0])}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="update-product-button">
                            <button type="submit">ACTUALIZAR PRODUCTO</button>
                        </div>
                    </form>
                </div>
                {loading ? <Loader message={'Actualizando producto...'}/> : <></>}
            </>
        );

    return null;
}

export default UpdateProducts;