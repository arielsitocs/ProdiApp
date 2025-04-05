import './home.css';

import Benefit from './benefit/benefit';

import logo from '../../assets/logo.png';
import simpleBenefit from '../../assets/simple-benefit.svg'
import fastBenefit from '../../assets/fast-benefit.svg';
import securityBenefit from '../../assets/security-benefit.svg';
import controlBenefit from '../../assets/control-benefit.svg';

const handleScroll = () => {
    const benefits = document.querySelector('.benefits');

    if(benefits){
        benefits.scrollIntoView({ behavior: "smooth" })
    } 
}

function Home() {
    return (
        <main className="home">
            <section className="home-landing">
                <div className="landing-info">
                    <img src={logo} alt="-" />
                    <h1>Control total de tus productos,</h1>
                    <h2>en un solo lugar...</h2>
                    <button onClick={() => handleScroll()}>EXPLORAR</button>
                </div>

            </section>
            <section className="benefits">
                <div className="benefits-title">
                    <h1>Nosotros te ofrecemos...</h1>
                </div>
                <div className="benefits-content">
                    <Benefit logo={simpleBenefit} backgroundColor="#079311" title="SENCILLEZ" description="Interfaz intuitiva y fácil de usar, sin complicaciones." />
                    <Benefit logo={fastBenefit} backgroundColor="#F19E39" title="RAPIDEZ" description="Publica y gestiona productos en segundos, sin procesos largos." />
                    <Benefit logo={securityBenefit} backgroundColor="#E9D500" title="SEGURIDAD" description="Protegemos tus datos y transacciones con cifrado avanzado." />
                    <Benefit logo={controlBenefit} backgroundColor="#0599FF" title="CONTROL TOTAL" description="Monitorea tus ventas, stock y rendimiento en tiempo real." />
                </div>
            </section>
            <section className="sell-stock">
                <div className="sell-stock-title">
                    <h1>Vende y Reabastece sin Complicaciones</h1>
                </div>
                <div className="sell-stock-cards">
                    <div className="sell">
                        <div className="sell-top">
                            <h1>VENTA RAPIDA Y SENCILLA</h1>
                        </div>
                        <div className="sell-bottom">
                            <p>
                                Con ProdiApp puedes gestionar la venta de tus productos de manera sencilla y expedita.
                                Genera ganancias facilmente gracias a nuestro sistema de ventas publicando tus productos
                                para que otros proveedores se interesen en las ofertas de tu tienda. Todo en un mismo lugar!
                            </p>
                            <button>COMENZAR A VENDER</button>
                        </div>
                    </div>
                    <div className="stock">
                        <div className="stock-top">
                            <h1>REABASTECE PARA GANAR</h1>
                        </div>
                        <div className="stock-bottom">
                            <p>
                                Al vender tus productos mediante nuestra función de ventas, puedes volver a reabastecer tus
                                productos gracias a las demas ofertas de otros negocios registrados en nuestra Web. Solo debes
                                explorar el mercado de productos y elegir la oferta mas conveniente.
                            </p>
                            <button>GESTIONAR STOCK</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;