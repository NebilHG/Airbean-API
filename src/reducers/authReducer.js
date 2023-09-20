const authReducer = (state = { auth: {}, isAuthLoading: false }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isAuthLoading: true };
        case 'STOP_LOADING':
            return { ...state, isAuthLoading: false };
        case 'SIGNUP_USER':
            return action.payload;
        case 'LOGIN_USER':
            localStorage.setItem('user', JSON.stringify({ token: action.payload.data.token, user: action.payload.user }));
            return { ...state, auth: { token: action.payload.data.token, user: action.payload.user } };
        case 'LOGOUT_USER':
            localStorage.removeItem('user');
            return { ...state, auth: '' };
        default:
            return state;
    }
};

export default authReducer;
