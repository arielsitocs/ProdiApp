import './products.css';

import Product from '../product/product.jsx';
import UpdateProducts from './update-products/updateProducts.jsx';
import Loader from '../loader/loader.jsx';
import Alert from '../alert/alert.jsx';

import add from '../../assets/add.png';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function Products() {

    const [productToupdate, setProductToUpdate] = useState(null);
    const [updateState, setUpdateState] = useState(false)
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            })
            setProducts(await response.json());
        } catch (error) {
            console.error('Error al recuperar los productos')
        } finally {
            setIsLoading(false);
        }
    }

    // Trae todos los productos desde la BD al cargarse la pagina //
    useEffect(() => {
        fetchProducts();
    }, [])

    // Filtro para encontrar el producto que se quiere actualizar //
    // Se le pasa al componente producto por parametro para ejecutarse en el //
    const productUpdateFilter = (id) => {
        const product = products.find(p => p.id === id);

        if (product) {
            setProductToUpdate(product);
        } else {
            console.log('No se encontro ningun producto')
        }
    }

    // Actualiza un producto en la lista para cargar el producto actualizado //
    // de inmediato en la interfaz y no tener que esperar para mostrarlo actualizado //
    const updateProductInList = (id, updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? updatedProduct : product
            )
        );
    }; 

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
                                <>
                                    <Product key={producto.id} id={producto.id} name={producto.name} category={producto.category} weight={producto.weight} weightType={producto.weightType} price={producto.price} description={producto.description} image={producto.productImage} setUpdateState={setUpdateState} updateFilter={() => productUpdateFilter(producto.id)}></Product>
                                </>
                            ))
                            :
                            <div className="no-products">
                                <h1>Aun no tienes productos. </h1>
                                <a href="/createProduct">agrega tus productos aqui</a>
                            </div>
                    }
                </main>
            </div>
            {productToupdate && <UpdateProducts id={productToupdate?.id} name={productToupdate?.name} category={productToupdate?.category} weight={productToupdate?.weight} weightType={productToupdate?.weightType} price={productToupdate?.price} description={productToupdate?.description} productImage={productToupdate?.productImage} state={updateState} setUpdateState={setUpdateState} updateProductInList={updateProductInList} />}
            {isLoading && <Loader message={'Cargando...'} />}
        </>
    )
}

export default Products;