import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";
const GET_PRODUCT = "GET_PRODUCT";
const GET_SEARCH_PRODUCT = "GET_SEARCH_PRODUCT";
const GET_BANNER = "GET_BANNER";
const GET_MY_PRODUCT = "GET_MY_PRODUCT";
const ADD_CART = "ADD_CART";
const GET_PRODUCT_FOR_INFINITY = "GET_PRODUCT_FOR_INFINITY";
const LOADING = "LOADING";
const SET_SEARCHINPUT = "SET_SEARCHINPUT";
const DELETE_MY_PRODUCT = "DELETE_MY_PRODUCT";
const addCart = createAction(ADD_CART, (data) => ({ data }));
const getBanners = createAction(GET_BANNER, (data) => ({ data }));
const getSearchProducts = createAction(
  GET_SEARCH_PRODUCT,
  (products, paging) => ({
    products,
    paging,
  })
);

const getProducts = createAction(GET_PRODUCT, (products, paging) => ({
  products,
  paging,
}));

const getMyProducts = createAction(GET_MY_PRODUCT, (data) => ({ data }));
const deleteMyProducts = createAction(DELETE_MY_PRODUCT, (id) => ({ id }));
const isLoading = createAction(LOADING, (loading) => ({ loading }));
const setSearchInput = createAction(SET_SEARCHINPUT, (searchInput) => ({
  searchInput,
}));

const initialState = {
  products: [],
  myProducts: [],
  searchProducts: [],
  numberOfElement: "",
  is_loaded: false,
  search: null,
  searchInput: null,
  infinityProducts: [],
  paging: { start: null, next: null },
  is_loading: false,
};

export const getProductAPI = () => {
  return function (dispatch, getState, { history }) {
    const search = getState((state) => state.product.search);
    let _paging = getState().product.paging;
    dispatch(isLoading(true));
    console.log("메인 돌기 전 서치 값", search);
    apis.getProduct(_paging.next + 1).then((res) => {
      const products = res.data;
      console.log(res);

      let paging = {
        start: _paging.next,
        next: _paging.next + 1,
      };
      dispatch(getProducts(products, paging));
    });
  };
};

export const getSearchProductAPI = (_input) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().product.paging;
    let input = getState().product.searchInput;
    console.log("겟 써치프러덕트 미들웨어");
    dispatch(isLoading(true));
    if (_input !== null) {
      dispatch(setSearchInput(_input));
    }
    apis
      .getSearch(_input !== null ? _input : input, _paging.next + 1)
      .then((res) => {
        console.log(res.data);
        const products = res.data;
        let paging = {
          start: _paging.next,
          next: _paging.next + 1,
        };
        dispatch(getSearchProducts(products, paging));
      });
  };
};

export const getMyProductAPI = () => {
  return function (dispatch, getState, { history }) {
    apis.getCartProduct().then((res) => {
      const products = res.data.data.products;
      dispatch(getMyProducts(products));
    });
  };
};
export const deleteMyProductAPI = (id) => {
  return function (dispatch, getState, { history }) {
    console.log(id);
    apis.RemoveCartProduct(id).then((res) => {
      dispatch(deleteMyProducts(id));
    });
  };
};
export const addCartAPI = (productId, amount) => {
  return function (dispatch, getState, { history }) {
    const _cart = {
      productId: productId,
      amount: amount,
    };
    apis
      .AddProductToCart(_cart)
      .then((res) => {
        console.log(" 장바구니 성공", res);
        window.alert(res.data.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export default handleActions(
  {
    [GET_PRODUCT]: (state, action) =>
      produce(state, (draft) => {
        draft.products.push(...action.payload.products.data.content);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
        draft.search = false;
      }),

    [GET_SEARCH_PRODUCT]: (state, action) =>
      produce(state, (draft) => {
        draft.searchProducts.push(...action.payload.products.data.content);
        draft.paging = action.payload.paging;
        draft.search = true;
      }),

    [GET_MY_PRODUCT]: (state, action) =>
      produce(state, (draft) => {
        draft.myProducts = action.payload.data;
        draft.is_loaded = true;
      }),

    [DELETE_MY_PRODUCT]: (state, action) =>
      produce(state, (draft) => {
        draft.myProducts = draft.myProducts.filter(
          (p) => p.productId !== action.payload.id
        );
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.loading;
      }),

    [SET_SEARCHINPUT]: (state, action) =>
      produce(state, (draft) => {
        draft.searchInput = action.payload.searchInput;
      }),
  },
  initialState
);
const productActions = {
  getProductAPI,
  getMyProductAPI,
  deleteMyProductAPI,
  addCartAPI,
  getSearchProducts,
  getProducts,
  getSearchProductAPI,
};
export { productActions };
