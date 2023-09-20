const orderReducer = (state = { products: [], order: [], placedOrder: [], orderHistory: [], isLoading: false }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'STOP_LOADING':
            return { ...state, isLoading: false };
        case 'FETCH_PRODUCTS':
            return { ...state, products: action.payload };
        case 'ADD_TO_CART':           
            return  { ...state, order: [...state.order, action.payload, action.payload.id = Math.floor(Math.random() * 99999)] }
        case 'REMOVE_FROM_CART':
            return { ...state, order: state.order.filter(item => item.id !== action.payload) };
        case 'PLACE_ORDER':
            localStorage.removeItem('order');
            return { ...state, order: [], placedOrder: action.payload };
        case 'GET_HISTORY':
            return { ...state, orderHistory: action.payload };
        case 'UPDATE_ORDER':
            return { ...state, placedOrder: { ...state.placedOrder, eta: action.payload } };
        default:
            return state;
    }
}

export default orderReducer;