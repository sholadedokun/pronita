import {
  FETCH_CATEGORIES,
  FETCH_SUBCATEGORIES,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_OFFERS
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_CATEGORIES:
      return { ...state, error: '', categories: action.payload };
    case FETCH_SUBCATEGORIES:
      return { ...state, currentCategory:action.payload.categoryId, subCategories:action.payload.subCategory };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_OFFERS:
      return { ...state, products:action.payload };
  }

  return state;
}
