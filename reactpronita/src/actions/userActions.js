import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_OFFERS
} from './actionTypes';

const ROOT_URL = 'http://localhost:3000/appActions';

export function signinUser({ identity, password }) {
  return function(dispatch) {
    return new Promise( (resolve)=>{
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { identity, password })
            .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                // - Save the JWT token
                localStorage.setItem('PronitaToken', response.data.token);
                resolve(response)
            })
            .catch(() => {
                // If request is bad...
                // - Show an error to the user
                dispatch(authError('Wrong Login credentials, Please try again.'));
            });
    })
  }
}

export function signupUser(values) {
    return function(dispatch) {
        return new Promise( (resolve)=>{
            axios.post(`${ROOT_URL}/signup`, values)
            .then(response => {

                dispatch({ type: AUTH_USER });
                localStorage.setItem('PronitaToken', response.data.token);
                resolve (response)
            })
            .catch(error => {
                let errorData= error.response.data.error
                dispatch(authError(errorData));
            });
        })
    }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('PronitaToken');
  return { type: UNAUTH_USER };
}

export function fetchProduct() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/inventory`, {
            headers: { authorization: localStorage.getItem('PronitaToken') }
        })
        .then(response => {
            dispatch({
                type: FETCH_OFFERS,
                payload: response.data
            });
        });
    }
}
