import './alert.css';

import alert from '../../assets/alert.svg';
import close from '../../assets/close.svg';

function Alert({ state, setAlertState, title, action }) {

    if (state)
        return (
            <div className="alert">
                <img src={close} alt="" onClick={setAlertState(false)} />
                <div className="top-row">
                    <img src={alert} alt="-" />
                    <h1>{title}</h1>
                </div>
                <div className="bottom-row">
                    <button onClick={() => { action }}>CONFIRMAR</button>
                    <button onClick={setAlertState(false)}>CANCELAR</button>
                </div>
            </div>
        )
}
export default Alert;