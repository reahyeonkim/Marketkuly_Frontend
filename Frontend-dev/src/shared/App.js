/* eslint-disable */

import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../pages/ProductList";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Comment from "../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";
import ProductDetail from "../pages/ProductDetail";
import dir from "../pages/dir";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (user) {
        dispatch(userActions.getUserAPI());
      }
    }
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={ProductList}></Route>
          <Route path="/signup" exact component={Signup}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/product/:id" exact component={ProductDetail}></Route>
          <Route path="/comment" exact component={Comment}></Route>
          <Route path="/cart" exact component={Cart}></Route>
        </Switch>
        <Footer />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
