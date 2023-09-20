import { placeOrder } from 'actions/orderActions';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './Cart.scss';

function Cart({ toggleCart, orders, handleToggleStatus, handleToggleCart }) {
  const dispatch = useDispatch();
  const [uniqueOrders, setUniqueOrders] = useState([]);

  useEffect(() => {
    if(orders.length > 0) {
      let unique = [];
      orders.forEach(o => {
        if(unique.filter(u => u.title === o.title).length === 0) {
          unique.push(o);
        }
      });
      setUniqueOrders(unique);
    } else {
      setUniqueOrders([]);
    }
  }, [orders]);


  const displayProductPriceAndCount = (product) => {
    let count = 0;

      let sortedOrders = orders.sort(function(a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
        return 0; });

    sortedOrders.forEach(o => {
      if(o.title === product.title) {
        count++;
      }
    });
    return [count * product.price, count];
  }

  const handleAddToCart = (item) => {
    let getLocalStorageOrders = JSON.parse(localStorage.getItem('order')) || [];
    localStorage.setItem('order', JSON.stringify( [...getLocalStorageOrders, item]));
    dispatch({
      type: 'ADD_TO_CART',
      payload: item,
    });
  };

  const handleRemoveFromCart = (item) => {
    let getLocalStorageOrders = JSON.parse(localStorage.getItem('order'));
    let newOrders = getLocalStorageOrders.filter((o) => o.id !== item.id);
    localStorage.setItem('order', JSON.stringify(newOrders));
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: item
    });
  };

  const handlePlaceOrder = () => {
    if(orders.length === 0) return;
    let placeThisOrder = [];
    orders.forEach(o => {
      placeThisOrder.push({
        name: o.title,
        price: o.price,
      });
    });
    let details = {
      order: placeThisOrder
    }
    dispatch(placeOrder(details));
    handleToggleCart();
    setTimeout(() => {handleToggleStatus()}, 200);
  };

  return (
    <div className={`app__cart ${toggleCart ? 'openCart' : null}`}>
      <figure className="app__cart--arrow"></figure>
       <h2>Din beställning</h2>
      <ul>
        {uniqueOrders.map((item, index) => (
          <li className='app__cart--item' key={index}>
            <aside>
              <p>{item.title}</p>
              <div className="app__cart--item-dots" />
              <p>{displayProductPriceAndCount(item)[1]}st</p>
            </aside>
            <aside>
              <span>{displayProductPriceAndCount(item)[0]} kr</span>
              <div className="app__cart--item-edit">
                <button onClick={() => handleRemoveFromCart(item)}>
                  <figure></figure>
                </button>
                <button onClick={() => {item.id = Math.floor(Math.random() * 99999); handleAddToCart(item)}}>
                  <figure></figure>
                  <figure></figure>
                </button>
              </div>
            </aside>
          </li>
        ))}
        {SearchDiscount(orders)[0] > 0 && 
          <li className='app__cart--item' style={{ color: 'red' }}>
            <aside>
              <p>Rabatt (Semla + Gustav)</p>
              <div className="app__cart--item-dots" />
              <p>{SearchDiscount(orders)[1]}st</p>
            </aside>
            <span>-{SearchDiscount(orders)[0]} kr</span>
          </li>
        }
      </ul>
      <div className="app__cart--sum">
        <span>Total:</span><span>{TotalSum(orders)} Kr</span>
        </div>
      <span className="app__cart--moms">Inclusive moms + drönarleverans</span>
      <button 
        className="app__cart--button"
        onClick={handlePlaceOrder}
      >
        Take My Money!
      </button>
    </div>
  )
  function TotalSum(orders) {
    let sum = 0;
    for (let i= 0; i < orders.length; i++) {
      sum += orders[i].price;
    }
    return sum - SearchDiscount(orders)[0];
  }
  
    function SearchDiscount(orders) {
      let semla = orders.filter( o => (o.title == "Semla") )
      let gustav = orders.filter( o => (o.title == "Gustav Adolfsbakelse") )
  
      if (semla > gustav || semla == gustav) {
        return [0 + (gustav.length * 49), gustav.length];
      }
      else {
        return [0 + (semla.length * 49), semla.length];
    }
  }
}

export default Cart;
