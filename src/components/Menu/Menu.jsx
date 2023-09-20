import Loader from 'components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';

import './Menu.scss';

function Menu() {
  let { products, isLoading } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    let getLocalStorageOrders = JSON.parse(localStorage.getItem('order')) || [];
    localStorage.setItem('order', JSON.stringify( [...getLocalStorageOrders, item] ));

    dispatch({
      type: 'ADD_TO_CART',
      payload: item,
    });
  };

  return (
    <section className="app__menu">
      <h1>Meny</h1>
      <article className="app__menu--items">
        <ul>
          {isLoading ? <Loader /> :
            products && products.map(item => (
            <li 
              className="app__menu--item"
              key={item.id}
              onClick={() => handleAddToCart(item)}
            >
              <button 
                className="app__menu--item-button"
              >
                +
              </button>
              <span className="app__menu--item-name" style={item.title.length > 16 ? { fontSize: '20px' } : null}>
                {item.title}
              </span>
              <div className="app__menu--item-dots" />
              <span className="app__menu--item-price">
              {item.price} kr
              </span>
              <span className="app__menu--item-desc">
                {item.desc}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );  
};

export default Menu;