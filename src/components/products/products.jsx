import { useNavigate } from 'react-router';
import './products.css';

import Product from '../product/product.jsx';

import add from '../../assets/add.png';

function Products() {

    const navigate = useNavigate();

    const productos = [
        {
            "id": 1,
            "nombre": "Café Molido",
            "categoria": "Bebidas",
            "medida": "500g",
            "precio": 12.99,
            "descripcion": "Café molido de grano arábica, ideal para preparar en cafetera italiana o francesa.",
            "imagen": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            "id": 2,
            "nombre": "Leche de Almendras",
            "categoria": "Bebidas",
            "medida": "1L",
            "precio": 3.99,
            "descripcion": "Leche de almendras sin azúcar añadida, rica en vitaminas y minerales.",
            "imagen": "https://images.unsplash.com/photo-1615485737364-8c18d9d1b9c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            "id": 3,
            "nombre": "Miel Pura",
            "categoria": "Endulzantes",
            "medida": "500g",
            "precio": 7.99,
            "descripcion": "Miel 100% natural, ideal para endulzar bebidas y postres.",
            "imagen": "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            "id": 4,
            "nombre": "Quinoa Orgánica",
            "categoria": "Granos",
            "medida": "1kg",
            "precio": 6.99,
            "descripcion": "Quinoa orgánica de alta calidad, rica en proteínas y fibra.",
            "imagen": "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            "id": 5,
            "nombre": "Chocolate Negro",
            "categoria": "Snacks",
            "medida": "100g",
            "precio": 3.49,
            "descripcion": "Chocolate negro con 70% de cacao, perfecto para los amantes del chocolate.",
            "imagen": "https://images.unsplash.com/photo-1575377427642-087cf684f29d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            "id": 6,
            "nombre": "Té Verde",
            "categoria": "Bebidas",
            "medida": "100g",
            "precio": 5.99,
            "descripcion": "Té verde en hojas, rico en antioxidantes y beneficioso para la salud.",
            "imagen": "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            "id": 7,
            "nombre": "Pasta Integral",
            "categoria": "Granos",
            "medida": "500g",
            "precio": 2.99,
            "descripcion": "Pasta integral de trigo, ideal para una alimentación saludable.",
            "imagen": "https://images.unsplash.com/photo-1594046242217-704902aa446d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            "id": 8,
            "nombre": "Nueces Mixtas",
            "categoria": "Snacks",
            "medida": "200g",
            "precio": 4.99,
            "descripcion": "Mezcla de nueces, almendras y anacardos, perfecta para un snack saludable.",
            "imagen": "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            "id": 9,
            "nombre": "Aceite de Coco",
            "categoria": "Aceites",
            "medida": "500ml",
            "precio": 9.99,
            "descripcion": "Aceite de coco virgen, ideal para cocinar y cuidado personal.",
            "imagen": "https://images.unsplash.com/photo-1603665270146-bbdf9342c660?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        },
        {
            "id": 10,
            "nombre": "Harina de Almendras",
            "categoria": "Granos",
            "medida": "500g",
            "precio": 8.49,
            "descripcion": "Harina de almendras sin gluten, perfecta para repostería saludable.",
            "imagen": "https://images.unsplash.com/photo-1608190003443-86b2636f1b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        }
    ]

    return (
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
                    productos.map(producto => (
                        <Product key={producto.id} name={producto.nombre} category={producto.categoria} quantity={producto.medida} price={producto.precio} description={producto.descripcion} image={producto.imagen}></Product>
                    ))
                }
            </main>
        </div>
    )
}

export default Products;