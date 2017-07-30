const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';

export const addProduct = (color, name) => ({
  type: ADD_PRODUCT,
  color,
  name,
});

export const fetchProducts = () => ({ type: FETCH_PRODUCTS });

export const addProductEpic = (action$, store, { post }) =>
  action$.ofType(ADD_PRODUCT)
    .mergeMap(({ color, name }) =>
      post('http://localhost:4000/products/', { color, name })
        .map(() => fetchProducts())
    );

export const fetchProductsEpic = (action$, store, { getJSON }) =>
  action$.ofType(FETCH_PRODUCTS)
    .mergeMap(() =>
      getJSON('http://localhost:4000/products/')
        .map(response => ({
          type: RECEIVE_PRODUCTS,
          payload: response
        }))
    );

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return [...action.payload];
    default:
      return state;
  }
};
