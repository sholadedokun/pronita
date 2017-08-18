import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  FETCH_CATEGORIES,
  FETCH_SUBCATEGORIES,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_OFFERS
} from './actionTypes';

const ROOT_URL = 'http://localhost:3000/appActions';

export function fetchAllCategories() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/category`)
            .then(response => {
                dispatch({ type: FETCH_CATEGORIES,
                    payload: response.data
                 });
            })
            .catch(() => {
                dispatch(inventoryError('Error Fetching Categoriee , Please Check your internet and try again.'));
            });
  }
}
export function fetchAllSubCategories(category) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/subCategory`, {category})
            .then(response => {
                dispatch({ type: FETCH_SUBCATEGORIES,
                    payload: {categoryId:category, subcategories:response.data}
                 });
            })
            .catch(() => {
                dispatch(inventoryError('Error Fetching Categoriee , Please Check your internet and try again.'));
            });
        }
}
export function inventoryError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
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
