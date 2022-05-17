/* eslint-disable */

import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../redux/modules/product";
import { Grid } from "../elements/index";
import Banner from "../shared/img/45f975c1-e57c-403f-9f4f-1cb0c965897a.webp";
import { apis } from "../shared/axios";
import _ from "lodash";
import Infinity from "../shared/Infinity";
import Search from "../shared/Search";

const ProductList = (props) => {
  const dispatch = useDispatch();
  const [banner, setBanner] = useState(null);
  const search = Search();
  console.log(useSelector((state) => state.product));

  //배너 가져오기
  useEffect(() => {

    dispatch(productActions.getProductAPI());

    const fetchData = async () => {

      try {
        const result = await apis.getBanner();
        const _banner = result.data.data.banners[9];
        setBanner(_banner);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const product_list =
    search === true
      ? useSelector((state) => state.product.searchProducts)
      : useSelector((state) => state.product.products);
  console.log(
    "노릇노릇빔",
    useSelector((state) => state.product)
  );
  console.log(search);

  const product_list_count = useSelector(
    (state) => state.product.products.numberOfElements
  );

  const is_loading = useSelector((state) => state.product.is_loading);
  const paging = useSelector((state) => state.product.paging);
  const searchInput = useSelector((state) => state.product.searchInput);

  const callNext = () => {
    if (search === true) {
      console.log("서치서치서치", search);
      console.log("검색한걸로 불러오기");
      dispatch(productActions.getSearchProductAPI(searchInput));
    } else {
      console.log("서치서치서치", search);
      console.log("그냥 불러오기");
      dispatch(productActions.getProductAPI());
    }

  };

  return (
    <>
      {product_list && (
        <Infinity
          paging={paging}
          is_loading={is_loading}
          callNext={callNext}
          is_next={paging.next < 5 ? true : false}
        >
          <React.Fragment>
            <BannerImg src={banner}></BannerImg>
            <CategoryText>베스트</CategoryText>
            <Grid width="1050px" is_flex>
              <LittleP>총 {product_list_count}건</LittleP>
              <div style={{ display: "flex" }}>
                <LittleP2>추천순</LittleP2>
                <LittleLine> | </LittleLine>
                <LittleP2>신상품순</LittleP2>
                <LittleLine> | </LittleLine>
                <LittleP2>인기상품순</LittleP2>
                <LittleLine> | </LittleLine>
                <LittleP2>낮은 가격순</LittleP2>
                <LittleLine> | </LittleLine>
                <LittleP2>높은 가격순</LittleP2>
              </div>
            </Grid>
            <ProductWrap>
              {product_list.map((p, idx) => (
                <Product key={idx} {...p} />
              ))}
            </ProductWrap>
          </React.Fragment>
        </Infinity>
      )}
    </>
  );
};

const ProductWrap = styled.div`
  width: 1050px;
  margin: 0 auto;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 308px);
  grid-column-gap: 50px;
  align-items: center;
`;

const BannerImg = styled.img`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const CategoryText = styled.p`
  padding-top: 23px;
  font-weight: 700;
  font-size: 28px;
  color: #333;
  line-height: 35px;
  letter-spacing: -1px;
  text-align: center;
`;

const LittleP = styled.p`
  font-size: 12px;
  color: #333;
  line-height: 18px;
`;

const LittleP2 = styled.p`
  font-size: 12px;
  color: #999;
  line-height: 18px;
  margin-left: 6px;
  cursor: pointer;
`;
const LittleLine = styled.p`
  font-size: 12px;
  color: #9999;
  line-height: 18px;
  margin-left: 6px;
`;

export default ProductList;
