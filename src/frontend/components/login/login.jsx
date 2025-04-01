import './login.css';

import login from '../../assets/email.png';

function Login() {
    return (
        <div className="background">
             <div className="login-header">
                    <h1 className='header-title'>Inicio de Sesión</h1>
                    <h1 className='header-app-name'>ProdiApp</h1>
            </div>
            <form action="" className="login-form">
               
                <div className="login-credentials">
                    <div className="login-email">
                        <h2>Correo Electrónico</h2>
                        <input required type="email" placeholder='Ingresa un correo válido...'></input>
                    </div>
                    <div className="login-password">
                        <h2>Contraseña</h2>
                        <input required type="password" placeholder='Ingresa la contraseña de tu tienda...' />
                    </div>
                </div>
                <div className="login-button">
                    <button>INGRESAR</button>
                </div>
                <div className="login-link">
                    <p>No tienes una cuenta? <a href="/register">Registrate aquí</a></p>
                </div>
            </form>
        </div>
    )
}

export default Login;