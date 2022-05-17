import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8041",
});

export const headers = {
  "content-type": "application/json;charset=UTF-8",
  accept: "application/json",
  authorization: `${localStorage.getItem("token")}`,
};

export const apis = {
  // 메인 상품리스트 불러오기
  getProduct: (page) =>
    instance.get(`/products?category1=&category2=&query=&page=${page}`, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
      },
    }),
  // 메인 배너 불러오기
  getBanner: () =>
    instance.get("/banners", {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
      },
    }),
  //검색
  getSearch: (input, page) =>
    instance.get(
      `/products?category1=&category2=&query=${input}&page=${page}`,
      {
        headers: {
          "content-type": "application/json;charset=UTF-8",
          accept: "application/json",
        },
      }
    ),

  // 상세페이지 상품 조회
  getProductDetail: (id) =>
    instance.get(`products/${id}`, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
      },
    }),
    
  // 상세페이지 후기 추가
  addReviews: (data) =>
    instance.post(`/reviews`, data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    }),

  // 상세페이지 후기 조회
  getReviews: (id) =>
    instance.get(`/reviews?productId=${id}&page=1&display=10`, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
      },
    }),
  // 상세페이지 후기 삭제
  deleteReviews: (id) =>
    instance.delete(`/reviews/${id}`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    }),
  // 장바구니 상품리스트 조회
  getCartProduct: () =>
    instance.get("/cart", {
      headers: { authorization: `${localStorage.getItem("token")}` },
    }),
  // 장바구니 상품 추가
  AddProductToCart: (cart) =>
    instance.post("/cart", cart, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    }),
  // 장바구니 상품 삭제
  RemoveCartProduct: (productId) =>
    instance.delete(`/cart/${productId}`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    }),
  // 회원가입
  signUp: (user) =>
    instance.post(`/user/register`, user, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
      },
    }),
  // 이메일 유효확인
  emailValidation: (email) => instance.get(`/user/register?email=${email}`),
  //로그인
  logIn: (user) =>
    instance.post(`/user/login`, user, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json",
      },
    }),
  //회원정보 요청
  getUser: () =>
    instance.get(`/user/info`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    }),
};
