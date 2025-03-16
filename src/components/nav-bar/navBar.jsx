import { useState } from "react";
import { useNavigate } from "react-router";

import user from '../../assets/user.png';
import menu from '../../assets/menu.png';

import './navBar.css';

function NavBar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [iconOpen, setIconOpen] = useState(false);
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
                    <img src={menu} alt="-" className={`icon ${iconOpen ? 'open' : 'closed'}`} onClick={handleMenuOpen} />
                    <h1>ProdiApp</h1>
                </div>
                <div className="middle">
                    <input type="text" placeholder="Buscar por nombre de producto..." />
                </div>
                <div className="right">
                    <h2>Bienvenido Ariel!</h2>
                    <img src={user} alt="-" />
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
                    <input type="text" placeholder="Buscar por nombre de producto..." className="mobile-search-bar" />
                </div>
            </div>
        </>
    )
}

export default NavBar;