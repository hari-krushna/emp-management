import firebase from 'firebase';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

export const EmailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
};

export const PasswordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};


export const LoginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => { LoginUserSuccess(dispatch, user) })
            .catch((error) => {
                console.log(error);
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => { LoginUserSuccess(dispatch, user) })
                    .catch((() => LoginUserFail(dispatch)))
            });
    };
};

const LoginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
}

const LoginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
}