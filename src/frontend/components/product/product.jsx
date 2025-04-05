import './product.css';

import update from '../../assets/update.png';
import trash from '../../assets/trash.png';
import defaultImage from '../../assets/default.png';

function Product({ name, category, quantity, price, description, image, setUpdateState, updateFilter, deleteProduct }) {

    const handleUpdate = () => {
        updateFilter();
        setUpdateState(true);
    }

    return (
        <div className="product">
            <div className="top-row">
                <img src={image} alt="-" onError={(e) => e.target.src = defaultImage} />
                <div className="product-data">
                    <div className="data-left">
                        <div className="data-top">
                            <h2 className='product-name'>{name}</h2>
                        </div>
                        <div className="data-middle">
                            <h2 className='product-category'>{category}</h2>
                            <h2>-</h2>
                            <h2 className='product-quantity'>{quantity}</h2>
                        </div>
                        <div className="data-bottom">
                            <h2 className='product-price'>${price}CLP</h2>
                        </div>
                    </div>
                    <div className="data-right">
                        <div className="product-options">
                            <div className='update'>
                                <img src={update} alt="-" onClick={handleUpdate}  />
                            </div>
                            <div className='delete'>
                                <img src={trash} alt="-" onClick={deleteProduct} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-row">
                <div className="product-description">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default Product;