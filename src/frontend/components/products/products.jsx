import './products.css';

import Product from '../product/product.jsx';
import UpdateProducts from './update-products/updateProducts.jsx';
import Loader from '../loader/loader.jsx';

import add from '../../assets/add.png';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function Products() {

    const [productToupdate, setProductToUpdate] = useState(null);
    const [updateState, setUpdateState] = useState(false)
    const [alertState, setAlertState] = useState(true);
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
            console.log(`Producto encontrado: ${product.name}`)
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

    // Eliminacion de un producto //
    // Tambien se pasa a producto por parametro //
    const deleteProduct = async (id) => {
        try {
            setIsLoading(true);
            const product = products.find(p => p.id === id);

            if (product) {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
                    method: 'DELETE'
                })

                if (response.ok) {
                    console.log(`Producto de id ${id} eliminado`);
                    fetchProducts();
                }
            } else {
                console.error('No se encontro ningun producto para eliminar');
            }
        } catch (error) {
            console.error('Error al eliminar el producto: ', error);
        } finally {
            fetchProducts();
        }
    }

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

                {isLoading && <Loader message={'Cargando...'} />}

                <main className="products">
                    {
                        products.length > 0 ?
                            products.map(producto => (
                                console.log(producto.productImage),
                                <Product key={producto.id} name={producto.name} category={producto.category} quantity={producto.weight} price={producto.price} description={producto.description} image={producto.productImage} setUpdateState={setUpdateState} updateFilter={() => productUpdateFilter(producto.id)} deleteProduct={() => deleteProduct(producto.id)}></Product>
                            ))
                            :
                            <div className="no-products">
                                <h1>Aun no tienes productos. <a href="/createProduct">agrega tus productos aqui</a></h1>
                            </div>
                    }
                </main>
            </div>
            {/* <Alert state={alertState} setAlertState={setAlertState} title={'Quieres eliminar el producto?'} /> */}
            <UpdateProducts id={productToupdate?.id} name={productToupdate?.name} category={productToupdate?.category} weight={productToupdate?.weight} price={productToupdate?.price} description={productToupdate?.description} productImage={productToupdate?.productImage} state={updateState} setUpdateState={setUpdateState}  updateProductInList={updateProductInList} />
        </>
    )
}

export default Products;