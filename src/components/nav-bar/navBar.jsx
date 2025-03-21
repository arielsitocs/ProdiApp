import { useState } from "react";
import { useNavigate } from "react-router";

import ariel from '../../assets/ariel.png';
import logo from '../../assets/logo.png';
import menu from '../../assets/menu.png';
import home from '../../assets/home.png';
import products from '../../assets/products.png';
import add from '../../assets/navAdd.png'

import './navBar.css';

function NavBar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [iconOpen, setIconOpen] = useState(false);
    const [searchBar, setSearchBar] = useState('');

    const navigate = useNavigate();

    const handleMenuOpen = () => {
        setMenuOpen(true);
        setIconOpen(true);

        if (menuOpen == true) {
            setMenuOpen(false);
            setIconOpen(false);
        }
    }

    return (
        <>
            <div className="nav-bar">
                <div className="left">
                    <img src={logo} alt="" className="logo" />
                    <img src={menu} alt="-" className={`icon ${iconOpen ? 'open' : 'closed'}`} onClick={handleMenuOpen} />
                    <h1 onClick={() => navigate('/home')}>ProdiApp</h1>
                </div>
                <div className="middle">
                    <nav>
                        <div>
                            <img className="nav-icon" src={home} alt="" />
                            <a href="/home">Inicio</a>
                        </div>
                        <div>
                            <img className="nav-icon" src={products} alt="" />
                            <a href="/products">Mis Productos</a>

                        </div>
                        <div>
                            <img className="nav-icon" src={add} alt="" />
                            <a href="/createProduct">Agregar Producto</a>
                        </div>
                    </nav>
                </div>
                <div className="right">
                    <h2>Bienvenido Ariel!</h2>
                    <img src={ariel} alt="-" />
                </div>
            </div>
            <div className={`menu ${menuOpen ? 'open' : 'closed'}`}>
                <div className="menu-title">
                    <h1>Menú de Opciones</h1>
                </div>
                <div className="menu-options">
                    <h2 onClick={() => navigate('/products')}>Mis Productos</h2>
                    <h2 onClick={() => navigate('/createProduct')}>Agregar Producto</h2>
                    <h2 onClick={() => navigate('/login')}>Cerrar Sesión</h2>
                </div>
            </div>
        </>
    )
}

export default NavBar;