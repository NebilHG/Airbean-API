import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import droneImg from "assets/status_drone.svg";
import cupImg from "assets/status_cup.svg";
import "./Status.scss";
import { updateOrder } from 'actions/orderActions';

const Status = ({ handleToggleStatus, order, time }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if(time > 0) {
            const interval = setInterval(() => {
                setCount(count + 1);
            }, 30000);
      
            return () => clearInterval(interval);
        }
    }, [count]);

    useEffect(() => {
        let orderNumber = JSON.parse(localStorage.getItem('placedOrder'));
        if((orderNumber.orderNr || order) && time > 0) {
            dispatch(updateOrder(orderNumber.orderNr || order));
        }
    }, [count]);

    return (
        <article className="app__status">
            <p className="app__status--ordernumber">
                Ordernummer 
                <span>
                    {' '}#{order}
                </span>
            </p>
            <img className="app__status--droneImg" src={droneImg} alt="drone" />
            <img className="app__status--cupImg" src={cupImg} alt="cup" />
            <p className="app__status--orderMsg">
                Din beställning är på väg!
            </p>
            <p className="app__status--orderDeliveryTime">
                <span>
                    {time > 0 ? time : 'Levererad'}
                </span> 
                {' '}{time > 1 ? 'Minuter' : time === 1 ? 'Minut' : ''}
            </p>
            <button className="app__status--button" onClick={handleToggleStatus}>
                Ok, cool!
            </button>
        </article>
    );
};

export default Status;