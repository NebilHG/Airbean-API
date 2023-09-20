import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Cart from 'components/Cart/Cart';
import Status from 'components/Status/Status';
import cartImage from 'assets/cartImage.svg';
import './Navbar.scss';

function Navbar() {
	const { order, placedOrder } = useSelector((state) => state.orderReducer);
	const [toggleStatus, setToggleStatus] = useState(false);
	const [toggleNavbar, setToggleNavbar] = useState(false);
	const [toggleCart, setToggleCart] = useState(false);
	const [orders, setOrders] = useState([]);
	const [latestOrder, setLatestOrder] = useState({});

	useEffect(() => {
	  let ordersFromLocalStorage = JSON.parse(localStorage.getItem('order'));
	  if(ordersFromLocalStorage) {
		setOrders(ordersFromLocalStorage);
	  } else {
		setOrders([]);
	  }
	}, [order]);

	function handleToggleNavbar() {
		setToggleNavbar((prevState) => !prevState);
	};
	function handleToggleCart() {
		setToggleCart((prevState) => !prevState);
	};
	function handleToggleStatus() {
		setToggleStatus((prevState) => !prevState);
		setToggleNavbar(false);
	};

	useEffect(() => {
		setLatestOrder(placedOrder);
		if(placedOrder.orderNr) {
			localStorage.setItem('placedOrder', JSON.stringify(placedOrder));
		}
		if(localStorage.getItem('placedOrder') && !placedOrder.orderNr) {
			setLatestOrder(JSON.parse(localStorage.getItem('placedOrder')));
		}
	}, [placedOrder]);

	return (
		<div className='app__navbar' id="top">
			<nav className={toggleNavbar ? 'openNavbar' : null}>
				<NavLink onClick={handleToggleNavbar} to="/menu">Meny</NavLink>
				<hr />
				<NavLink onClick={handleToggleNavbar} to="/about">Vårt kaffe</NavLink>
				<hr />
                <NavLink onClick={handleToggleNavbar} to="/profile">Min Profil</NavLink>
				{latestOrder.orderNr && 
					<>
						<hr />
						<span onClick={handleToggleStatus}>Orderstatus</span>
					</>
				}
			</nav>
			<button className={`navbar__burger ${toggleNavbar ? 'openNavbar' : null}`} onClick={handleToggleNavbar}>
				<figure></figure>
				<figure></figure>
				<figure></figure>
			</button>
			{!toggleNavbar && 
				<>
					<button 
						className="navbar__cart"
						onClick={handleToggleCart}
					>	
						<span>{orders.length}</span>
						<img src={cartImage} alt='cart' />
					</button>
					<Cart toggleCart={toggleCart} orders={orders} handleToggleStatus={handleToggleStatus} handleToggleCart={handleToggleCart} />
					<div className={`navbar__cartBg ${toggleCart ? 'openCart' : null}`} />
				</>
			}
			{toggleStatus && <Status handleToggleStatus={handleToggleStatus} order={placedOrder.orderNr || latestOrder.orderNr} time={placedOrder.eta || latestOrder.eta} />}
		</div>
	);
};

export default Navbar;