import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const setComment = createAction(SET_COMMENT, (data) => ({
  data,
}));

const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));

const initialState = {
  list: [],
};

const addCommentAPI = (product_id, content) => {
  return function (dispatch, getState, { history }) {
    let comment_data = {
      productId: product_id,
      content: content,
      title: "가짜타이틀임",
    };

    apis
      .addReviews(comment_data)
      .then((res) => {
        console.log(res);
        const comment = res.data.data;
        dispatch(addComment(comment));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getCommentAPI = (product_id) => {
  return function (dispatch, getState, { history }) {
    if (!product_id) {
      return;
    }
    apis
      .getReviews(product_id)
      .then((res) => {
        dispatch(setComment(res.data.data.reviews));
      })
      .catch((err) => console.log("Get Error!", err.response));
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.comment);
      }),
  },
  initialState
);

const commentActions = {
  setComment,
  addComment,
  getCommentAPI,
  addCommentAPI,
};

export { commentActions };
