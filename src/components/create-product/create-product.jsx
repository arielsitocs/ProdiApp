import { useState } from "react";

import './create-product.css';

function CreateProduct() {
    return (
        <div className="background">
            <form action="" className="create-product-form">
                <div className="create-product-header">
                    <h1 className='header-title'>Crear tu Producto</h1>
                    <h1 className='header-app-name'>ProdiApp</h1>
                </div>
                <div className="product-data">
                    <div className="top-row">
                        <div className="product-name">
                            <h2>Nombre</h2>
                            <input required type="text" placeholder='Ingresa el nombre de tu producto...' />
                        </div>
                        <div className="product-category">
                            <h2>Categoría</h2>
                            <input required type="text" placeholder='Ingresa la categoría de tu producto...' />
                        </div>
                    </div>
                    <div className="middle-row">
                        <div className="product-quantity">
                            <h2>Gramaje/Litraje</h2>
                            <input required type="text" placeholder='Ingresa la cantidad por unidad...' />
                        </div>
                        <div className="product-price">
                            <h2>Precio</h2>
                            <input required type="text" placeholder='Ingresa el precio de tu producto...' />
                        </div>
                    </div>
                    <div className="bottom-row">
                        <div className="product-description">
                            <h2>Descripción Producto</h2>
                            <textarea required placeholder='Describe tu producto detadallamente...'></textarea>
                        </div>
                        <div className="product-picture">
                            <h2>Foto del Producto</h2>
                            <input required type="file" className="picture-input" />
                        </div>
                    </div>
                </div>
                <div className="create-product-button">
                    <button>CREAR PRODUCTO</button>
                </div>
            </form>
        </div>
    )
}

export default CreateProduct;