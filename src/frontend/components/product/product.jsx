import './product.css';

import { useState } from 'react';

import update from '../../assets/update.png';
import trash from '../../assets/trash.png';
import defaultImage from '../../assets/default.png';

import Alert from '../alert/alert';

function Product({ id, name, category, weight, weightType, price, description, image, setUpdateState, updateFilter }) {

    const [alertState, setAlertState] = useState(false);

    const handleUpdate = () => {
        updateFilter();
        setUpdateState(true);
    }

    // Eliminacion de un producto por ID //
    const deleteProduct = async (id) => {
        try {
            if (id) {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
                    method: 'DELETE'
                })

                if (response.ok) {
                    console.log(`Producto de id ${id} eliminado`);
                    setAlertState(false);
                }
            } else {
                console.error('No se encontro ningun producto para eliminar');
            }
        } catch (error) {
            console.error('Error al eliminar el producto: ', error);
        }
    }

    return (
        <>
            <div className="product">
                <div className="top-row">
                    <img src={image} alt="-" onError={(e) => e.target.src = defaultImage} />
                    <div className="product-data">
                        <div className="data-left">
                            <div className="data-top">
                                <h2 className='product-name'>{name}</h2>
                            </div>
                            <div className="data-middle">
                                <h2 className='product-category'>{category}</h2>
                                <h2>-</h2>
                                <h2 className='product-quantity'>{weight}{weightType}</h2>
                            </div>
                            <div className="data-bottom">
                                <h2 className='product-price'>${price}CLP</h2>
                            </div>
                        </div>
                        <div className="data-right">
                            <div className="product-options">
                                <div className='update'>
                                    <img src={update} alt="-" onClick={handleUpdate} />
                                </div>
                                <div className='delete'>
                                    <img src={trash} alt="-" onClick={() => setAlertState(true)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-row">
                    <div className="product-description">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
            <Alert state={alertState} setAlertState={setAlertState} title={'Quieres eliminar el producto?'} action={() => deleteProduct(id)} />
        </>
    )
}

export default Product;