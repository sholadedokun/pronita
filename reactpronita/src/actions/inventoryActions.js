import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  FETCH_CATEGORIES,
  FETCH_SUBCATEGORIES,
  ADD_NEW_PRODUCT,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_OFFERS
} from './actionTypes';

const ROOT_URL = 'http://localhost:3000/appActions';

export function fetchAllCategories() {
    return function(dispatch) {
        return new Promise( (resolve, reject)=>{
            axios.get(`${ROOT_URL}/category`)
                .then(response => {
                    dispatch({ type: FETCH_CATEGORIES,
                        payload: response.data
                     });
                    resolve()
                })
                .catch(() => {
                    dispatch(inventoryError('Error Fetching Categoriee , Please Check your internet and try again.'));
                    reject()
                });
        })
  }
}
export function fetchAllSubCategories(category) {
    return function(dispatch) {
        return new Promise( (resolve, reject)=>{
            axios.get(`${ROOT_URL}/subCategory`, {category})
                .then(response => {
                    dispatch({ type: FETCH_SUBCATEGORIES,
                        payload: {categoryId:category, subCategories:response.data}
                     });
                     resolve(category)
                })
                .catch((e) => {
                    dispatch(inventoryError('Error Fetching Categoriee , Please Check your internet and try again.'));
                    reject(e)
                });
            })
        }
}
export function inventoryError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function addNewProduct(document, images){
    return function(dispatch) {
        console.log(document, images)
        // axios.get(`${ROOT_URL}/inventory`, {
        //     headers: { authorization: localStorage.getItem('PronitaToken') }
        // })
        // .then(response => {
        //     dispatch({
        //         type: FETCH_OFFERS,
        //         payload: response.data
        //     });
        // });
    }
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
