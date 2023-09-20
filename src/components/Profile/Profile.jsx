import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserHistory } from "actions/orderActions";

import "./Profile.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.authReducer);
  const { orderHistory, isLoading } = useSelector((state) => state.orderReducer);
  const [username, setUsername] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setUsername("");
    if (localStorage.getItem("user")) {
      dispatch(getUserHistory());
      const user = JSON.parse(localStorage.getItem("user"));
      setUsername(user.user);
    }
  }, [auth]);

  useEffect(() => {
    setHistory(orderHistory);
  }, [orderHistory]);

  function TotalSum(orders) {
    let sum = 0;
    for (let i= 0; i < orders.length; i++) {
      sum += orders[i].total;
    }
    return sum;
  }

  const handleSignOut = () => {
    dispatch({ type: "LOGOUT_USER" });
  };

  return (
    <article className="app__profile">
      <div className="app__profile--picture" />
      <h2 className="app__profile--name"> {username}</h2>
      {username && history?.length > 0 ? 
        <>
          <div className="app__profile--ulWrapper">
            <h2 className="ulWrapper__header">Orderhistorik</h2>
            <ul>
                {history && history.map(order => (
                  <li key={order.orderNr}>
                    <p className="orderHistory__orderNumber">{order.orderNr}</p>
                    <p className="orderHistory__date">{order.orderDate}</p>
                    <p className="orderHistory__totalText">Total ordersumma</p>
                    <p className="orderHistory__orderSum">{order.total}</p>
                  </li>
                ))}
                {history ? 
                <li className="orderHistory__totalList">
                  <p className="totalList__text">Totalt spenderat</p>
                  <p className="totalList__sum">{TotalSum(history)} kr</p>
                </li> : ''}
            </ul>
          </div>
          <button
            onClick={handleSignOut}
          >
            <a href="/menu#top">Logga ut</a>
          </button>
        </>
      : <p style={{ padding: '1rem 0' }}>{isLoading ? 'Laddar...' : 'Inga ordrar hittades...'}</p>}
    </article>
  );
};

export default Profile;


