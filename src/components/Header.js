import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import history from "../redux/history";
import { userActions } from "../redux/modules/user";

const Header = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");

  const onChange = (e) => {
    // console.log(e.target.value);
    setSearchInput(e.target.value);
  };

 

  useEffect(() => {
    if (user) {
      dispatch(userActions.getUserAPI());
    }
  }, []);

  return (
    <>
      <Grid>
        <HeaderMenu>
          {!is_login && (
            <React.Fragment>
              <li
                onClick={() => history.push("/signup")}
                className="header-menu signup"
              >
                회원가입
              </li>
              <li
                onClick={() => history.push("/login")}
                className="header-menu"
              >
                로그인
              </li>
              <li>고객센터 ▼</li>
            </React.Fragment>
          )}
          {is_login && (
            <React.Fragment>
              <li className="header-menu">{user ? user.username : "농민"}님</li>
              <li
                className="header-menu"
                onClick={() => {
                  dispatch(userActions.logOutAPI());
                }}
              >
                로그아웃
              </li>
            </React.Fragment>
          )}
        </HeaderMenu>

        <Logo
          onClick={() => {
            history.push("/");
          }}
        ></Logo>

        <HeaderCategory>
          <li className="all-category">전체 카테고리</li>
          <li onClick={() => history.push("/new")}>신상품</li>
          <li onClick={() => history.push("/")}>베스트</li>
          <li onClick={() => history.push("/cheap")}>알뜰쇼핑 </li>
          <li onClick={() => history.push("/event")}> 특가/혜택</li>
        
          <CartIcon onClick={() => history.push("/cart")} />
        </HeaderCategory>
      </Grid>
    </>
  );
};

const Grid = styled.div`
  display: block;
  max-width: 1050px;
  margin: 0 auto;
  text-align: center;
`;

const HeaderMenu = styled.ul`
  display: flex;
  font-size: 11px;
  justify-content: flex-end;
  cursor: pointer;
  /* position : absolute; */
  & li {
    padding: 0px 24px 0px 0px;
    position: relative;
  }
  & .signup {
    color: #5f0080;
  }
`;

const Logo = styled.div`
  position: absolute;
  left: 50%;
  top: 2%;
  width: 104px;
  max-width: 100%;
  margin-left: -60px;
  height: 79px;
  background-image: url("https://res.kurly.com/images/marketkurly/logo/logo_x2.png");
  background-size: cover;
  cursor: pointer;
  /* background-position: center; */
`;

const HeaderCategory = styled.ul`
  display: flex;
  padding: 0px;
  font-weight: bold;
  margin-top: 90px;
  cursor: pointer;
  & li {
    padding: 0px 75px 0px 0px;
    display: block;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: purple;
      text-decoration: underline;
    }
  }
  & .all-category::before {
    content: url("https://res.kurly.com/pc/service/common/1908/ico_gnb_all_off.png");
    position: relative;
    top: 2px;
    margin-right: 13px;
  }
`;
// const HeaderInput = styled.input`

// `

const CartIcon = styled.span`
  margin-left: 1000px;
  position: absolute;
  width: 36px;
  height: 36px;
  top: 7.1em;
  background-image: url("https://res.kurly.com/pc/service/common/2011/ico_cart.svg");
  &:hover {
    background-image: url("https://res.kurly.com/pc/service/common/2011/ico_cart_on.svg?v=1");
  }
`;

const Search = styled.input`
  border-radius: 50px;
  box-sizing: border-box;
  border: 1px solid #f7f7f7;
  background-color: #f7f7f7;
  background-image: "https://res.kurly.com/pc/service/common/1908/ico_search_x2.png";
  outline: none;
  width: 235px;
  height: 35px;
  font-size: 16px;
  letter-spacing: -1px;
`;

export default Header;
