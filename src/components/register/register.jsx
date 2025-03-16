import './register.css';

function Register() {
    return (
        <div className="background">
            <form action="" className="register-form">
                <div className="register-header">
                    <h1 className='header-title'>Registro de Usuario</h1>
                    <h1 className='header-app-name'>ProdiApp</h1>
                </div>
                <div className="register-credentials">
                    <div className="top-row">
                        <div className="register-email">
                            <h2>Correo Electrónico</h2>
                            <input required type="email" placeholder='Ingresa un correo válido...' />
                        </div>
                        <div className="register-username">
                            <h2>Nombre de Usuario</h2>
                            <input required type="tex" placeholder='Ingresa un nombre de usuario...' />
                        </div>
                    </div>
                    <div className="bottom-row">
                        <div className="register-password">
                            <h2>Contraseña</h2>
                            <input required type="password" placeholder='Ingresa tu contraseña de usuario...' />
                        </div>
                        <div className="register-password-confirm">
                            <h2>Confirmar contraseña</h2>
                            <input required type="password" placeholder='Repite la contraseña ingresada...' />
                        </div>
                    </div>
                </div>
                <div className="register-button">
                    <button>REGISTRARSE</button>
                </div>
                <div className="register-link">
                    <p>Ya tienes una cuenta? <a href="/login">Ingresa aquí</a></p>
                </div>
            </form>
        </div>
    )
}

export default Register;