import './register.css';

function Register() {
    return (
        <div className="background">
            <div className="register-header">
                <h1 className='header-title'>Registro de Negocio</h1>
                <h1 className='header-app-name'>ProdiApp</h1>
            </div>
            <form action="" className="register-form">
                <div className="register-credentials">
                    <div className="top-row">
                        <div className="register-email">
                            <h2>Correo Electrónico</h2>
                            <input required type="email" placeholder='Ingresa un correo válido...' />
                        </div>
                        <div className="register-username">
                            <h2>Nombre de Tienda</h2>
                            <input required type="tex" placeholder='Ingresa el nombre de tu tienda...' />
                        </div>
                    </div>
                    <div className="bottom-row">
                        <div className="register-password">
                            <h2>Contraseña</h2>
                            <input required type="password" placeholder='Ingresa la contraseña de tu cuenta ProdiApp...' />
                        </div>
                        <div className="register-password-confirm">
                            <h2>Confirmar contraseña</h2>
                            <input required type="password" placeholder='Repite la contraseña ingresada...' />
                        </div>
                    </div>
                    <div className="register-store-logo">
                    <h2>Logo de tu Tienda</h2>
                    <input required type="file" />
                    </div>
                </div>
                <div className="register-button">
                    <button>REGISTRAR TIENDA</button>
                </div>
                <div className="register-link">
                    <p>Ya tienes una cuenta? <a href="/login">Ingresa aquí</a></p>
                </div>
            </form>
        </div>
    )
}

export default Register;