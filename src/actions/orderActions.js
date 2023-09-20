import * as api from 'api';

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const data = await api.getProducts();
        dispatch({ type: 'FETCH_PRODUCTS', payload: data.data.menu });
        dispatch({ type: 'STOP_LOADING' });
    } catch (error) {
        console.log(error);
        dispatch({ type: 'STOP_LOADING' });
    }
};

export const placeOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const data = await api.placeOrder({details: order});
        dispatch({ type: 'PLACE_ORDER', payload: data.data });
        dispatch({ type: 'STOP_LOADING' });
    } catch (error) {
        console.log(error);
        dispatch({ type: 'STOP_LOADING' });
    }
};

export const getUserHistory = () => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const data = await api.getUserHistory();
        dispatch({ type: 'GET_HISTORY', payload: data.data.orderHistory });
        dispatch({ type: 'STOP_LOADING' });
    } catch (error) {
        console.log(error);
        dispatch({ type: 'STOP_LOADING' });
    }
};

export const updateOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const data = await api.updateOrder(order);
        dispatch({ type: 'UPDATE_ORDER', payload: data.data.eta });
        dispatch({ type: 'STOP_LOADING' });
    } catch (error) {
        console.log(error);
        dispatch({ type: 'STOP_LOADING' });
    }
};