import './benefit.css';

function Benefit({ logo, backgroundColor, title, description }) {
    return(
        <div className="benefit">
            <div className="benefit-top" style={{ backgroundColor: backgroundColor }}>
                <img src={logo} alt="" />
            </div>
            <div className="benefit-bottom">
                <h1 style={{ color: backgroundColor }}>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

<style>

</style>

export default Benefit;