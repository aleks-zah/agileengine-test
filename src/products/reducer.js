const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const addProduct = (color, name) => ({
  type: ADD_PRODUCT,
  color,
  name,
});

export const removeProduct = id => ({ type: REMOVE_PRODUCT, id });
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

export const removeProductEpic = (action$, store, { ajax }) =>
  action$.ofType(REMOVE_PRODUCT)
    .mergeMap(action =>
      ajax({ url: `http://localhost:4000/products/${action.id}`, method: 'DELETE' })
        .map(() => fetchProducts())
    );

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return [...action.payload];
    default:
      return state;
  }
};
