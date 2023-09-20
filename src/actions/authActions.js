import * as api from 'api';

export const signupUser = (formData, handleToggleView, setVerifyMessage) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        const data = await api.signup(formData);
        dispatch({ type: 'SIGNUP_USER', payload: data.data });
        handleToggleView();
        setVerifyMessage('Ditt konto är skapat, logga in för att fortsätta');
        dispatch({ type: 'STOP_LOADING' });
    } catch (error) {
        dispatch({ type: 'STOP_LOADING' });
        console.log(error);
    }
}

export const loginUser = (formData, setUserSignedIn, setErrorMessage) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        let data = await api.login(formData);
        data = { ...data, user: formData.username };
        if(data.data.success) {
            dispatch({ type: 'LOGIN_USER', payload: data });
            setUserSignedIn(true);
        }
        setErrorMessage('Fel användarnamn eller lösenord, försök igen');
        dispatch({ type: 'STOP_LOADING' });
    } catch (error) {
        setErrorMessage('Något gick fel, försök igen');
        dispatch({ type: 'STOP_LOADING' });
    }
}

export const userStatus = (setTokenExpired, navigate) => async (dispatch) => {
    try {
        dispatch({ type: 'START_LOADING' });
        await api.userStatus();
        dispatch({ type: 'STOP_LOADING' });
    } catch (error) {
        if(error.response.data.error === 'Unauthorized access') {
            navigate("/menu");
            setTokenExpired(true);
            setTimeout(() => {
                setTokenExpired(false);
                window.location.reload();
            }, 3000);
        } else {
            console.log(error);
        }
        dispatch({ type: 'LOGOUT_USER' });
        dispatch({ type: 'STOP_LOADING' });
    }
}