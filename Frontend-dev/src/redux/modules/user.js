/* eslint-disable */

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";
import { headers } from "../../shared/axios";

//액션타입
const SIGN_UP = "SIGN_UP";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const VALIDATE_EMAIL = "VALIDATE_EMAIL";
const GET_LOGIN_ERROR = "GET_LOGIN_ERROR";
const GET_SINGUP_ERROR = "GET_SINGUP_ERROR";

//액션함수
const signUp = createAction(SIGN_UP, (user) => ({ user }));
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT);
const getUser = createAction(GET_USER, (user) => ({ user }));
const validateEmail = createAction(VALIDATE_EMAIL, (validation) => ({
  validation,
}));
const getLoginError = createAction(GET_LOGIN_ERROR, (error) => ({ error }));
const getSignupError = createAction(GET_SINGUP_ERROR, (error) => ({ error }));

//리듀서
const initialState = {
  user: null,
  is_login: false,
  emailValidation: false,
  signUpError: "",
  loginError: "",
};

export const singUpAPI = (email, username, password , address) => {
  return function (dispatch, getState, { history }) {
    const _user = {
      email,
      username,
      password,
      address,
    };
    console.log(_user);

    apis
      .signUp(_user)
      .then((res) => {
        console.log(res);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err.response);
        window.alert(err.response.data.message);
      });
  };
};

export const logInAPI = (email, password) => {
  return function (dispatch, getState, { history }) {
    const _user = {
      email,
      password,
    };

    console.log(_user);

    apis
      .logIn(_user)
      .then((res) => {
        console.log("유저 토큰", res);
        const token = res.data.data.token;
        const user = res.data.data.user;
        localStorage.setItem("token", token);
        dispatch(logIn(user));
        history.push("/");
        console.log(headers);
      })
      .catch((err) => {
        const message = err.response.data.message;
        console.log(message);
        dispatch(getLoginError(message));
      });
  };
};

export const validateEmailAPI = (email) => {
  return function (dispatch, getState, { history }) {
    console.log(email);
    apis
      .emailValidation(email)
      .then((res) => {
        if (res.data.result === "success") {
          dispatch(validateEmail(true));
        }
      })
      .catch((err) => {
        console.log(err.response);
        window.alert(err.response.data.message);
      });
  };
};

export const logOutAPI = () => {
  return function (dispatch, getState, { history }) {
    localStorage.removeItem("token");
    console.log(headers);
    dispatch(logOut());
    history.push("/login");
  };
};

export const getUserAPI = () => {
  return function (dispatch, getState, { history }) {
    apis.getUser().then((res) => {
      const user = res.data.data.user;
      dispatch(getUser(user));
    });
  };
};

export default handleActions(
  {
    [SIGN_UP]: (state, action) =>
      produce(state, (draft) => {
        draft.user = { ...action.payload.user };
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [VALIDATE_EMAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.emailValidation = action.payload.validation;
      }),
    [GET_LOGIN_ERROR]: (state, action) =>
      produce(state, (draft) => {
        draft.loginError = action.payload.error;
      }),
    [GET_SINGUP_ERROR]: (state, action) =>
      produce(state, (draft) => {
        draft.signUpError = action.payload.error;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
  },
  initialState
);

const userActions = {
  singUpAPI,
  logInAPI,
  logOutAPI,
  validateEmailAPI,
  getUserAPI,
};

export { userActions };
