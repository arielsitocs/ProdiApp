import './products.css';

import Product from '../product/product.jsx';
import UpdateProducts from './update-products/updateProducts.jsx';

import add from '../../assets/add.png';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Alert from '../alert/alert.jsx';

function Products() {

    const [productToupdate, setProductToUpdate] = useState(null);
    const [updateState, setUpdateState] = useState(false)
    const [alertState, setAlertState] = useState(true);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    // Filtro para encontrar el producto que se quiere actualizar //
    // Se le pasa al componente producto por parametro para ejecutarse en el //
    const productUpdateFilter = (id) => {
        console.log('ID enviado: ', id);
        const product = products.find(p => p.id === id);

        if (product) {
            setProductToUpdate(product);
            console.log(`Producto encontrado: ${product.name}`)
        } else {
            console.log('No se encontro ningun producto')
        }
    }

    // Eliminacion de un producto //
    // Tambien se pasa a producto por parametro //
    const deleteProduct = async (id) => {
        try {
            const product = products.find(p => p.id === id);

            if (product) {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
                    method: 'DELETE'
                })

                if (response.ok) {
                    window.location.reload(); // Recarga la pagina despues de eliminar el producto //
                    console.log(`Producto de id ${id} eliminado`);
                }
            } else {
                console.error('No se encontro ningun producto para eliminar');
            }
        } catch (error) {
            console.error('Error al eliminar el producto: ', error);
        }
    }

    // Trae todos los productos desde la BD al cargarse la pagina //
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'GET'
                })
                setProducts(await response.json());
            } catch (error) {
                console.error('Error al recuperar los productos')
            }
        }

        fetchProducts();
    }, [])

    return (
        <>
            <div className="products-background">
                <div className='products-bar'>
                    <div className="bar-title">
                        <h1>Mis Productos</h1>
                    </div>
                    <div className="bar-content">
                        <input type="text" placeholder='Buscar producto...' />
                        <div className="content-add">
                            <img src={add} alt="-" onClick={() => navigate('/createProduct')} />
                        </div>

                    </div>
                </div>
                <main className="products">
                    {
                        products.length > 0 ?
                            products.map(producto => (
                                <Product key={producto.id} name={producto.name} category={producto.category} quantity={producto.weight} price={producto.price} description={producto.description} image={producto.productImage} setUpdateState={setUpdateState} updateFilter={() => productUpdateFilter(producto.id)} deleteProduct={() => deleteProduct(producto.id)}></Product>
                            ))
                            :
                            <div className="no-products">
                                <h1>Aun no tienes productos. <a href="/createProduct">agrega tus productos aqui</a></h1>
                            </div>
                    }
                </main>
            </div>
            <Alert state={alertState} setAlertState={setAlertState} title={'Quieres eliminar el producto?'} />
            <UpdateProducts id={productToupdate?.id} name={productToupdate?.name} category={productToupdate?.category} weight={productToupdate?.weight} price={productToupdate?.price} description={productToupdate?.description} productImage={productToupdate?.productImage} state={updateState} setUpdateState={setUpdateState} />
        </>
    )
}

export default Products;