import './alert.css';

import alert from '../../assets/alert.svg';
import close from '../../assets/close.svg';

function Alert({ state, setAlertState, title, action }) {

    const handleAction = () => {
        if(action) {
            action();
            window.location.reload();
        }
    }

    if (state)
        return (
            <div className="alert">
                <div className="top-row">
                    <img src={alert} alt="-" />
                    <h1>{title}</h1>
                </div>
                <div className="bottom-row">
                    <button onClick={handleAction} className='confirm'>CONFIRMAR</button>
                    <button onClick={() => setAlertState(false)} className='cancel'>CANCELAR</button>
                </div>
            </div>
        )
}
export default Alert;