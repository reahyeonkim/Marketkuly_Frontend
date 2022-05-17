import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../redux/modules/product";
import { apis } from "../shared/axios";
import { useState } from "react";
import { useEffect } from "react";
import CommentList from "../components/CommentList";

const ProductDetail = (props) => {
  const productId = props.match.params.id;
  const dispatch = useDispatch();
  const [buy_count, setBuy_count] = useState(1);
  const [price, setPrice] = useState(null);
  const [product, setProduct] = useState("");

  useEffect(() => {
    const fetchDate = async () => {
      try {
        let product_id = props.match.params.id;
        const result = await apis.getProductDetail(product_id);
        setProduct(result.data.data);
        setPrice(result.data.data.price);
      } catch (erorr) {
        console.log(erorr);
      }
    };
    fetchDate();
  }, []);

  const buyCart = () => {
    if (!localStorage.getItem("token")) {
      window.alert("로그인 후 이용하실 수 있습니다");
    } else {
      let product_id = props.match.params.id;
      dispatch(productActions.addCartAPI(product_id, buy_count));
    }
  };

  const BuyMinus = () => {
    if (buy_count > 1) {
      setBuy_count(buy_count - 1);
      setPrice(price - product.price);
    }
  };

  const BuyPlus = () => {
    if (buy_count < 100) {
      setBuy_count(buy_count + 1);
      setPrice(product.price + product.price * buy_count);
    }
  };

  return (
    <>
      {product && (
        <React.Fragment>
          <OutWrap>
            <ImgWrap>
              <img src={product.image} />
            </ImgWrap>

            <InfoWrap>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TitleText>{product.name}</TitleText>
                <ShareIcon src="https://res.kurly.com/mobile/service/goodsview/1910/ico_view_sns.png"></ShareIcon>
              </div>

              <Description>{product.description}</Description>
              <PriceText>{product.price}원</PriceText>
              <FlexDiv>
                <FlexDiv_title>판매단위</FlexDiv_title>
                <FlexDiv_des>1개</FlexDiv_des>
              </FlexDiv>
              <FlexDiv>
                <FlexDiv_title>배송구분</FlexDiv_title>
                <FlexDiv_des>샛별배송/택배배송</FlexDiv_des>
              </FlexDiv>
              <FlexDiv>
                <FlexDiv_title>포장타입</FlexDiv_title>
                <div style={{ display: "block" }}>
                  <FlexDiv_des>종이포장</FlexDiv_des>
                  <FlexDiv_des_des>
                    택배배송은 에코포장이 스티로폼으로 대체됩니다.
                  </FlexDiv_des_des>
                </div>
              </FlexDiv>

              <FlexDivBuy>
                <FlexDiv_title>구매수량</FlexDiv_title>
                <Buycount>
                  <BuyCountMinus
                    onClick={() => {
                      BuyMinus();
                    }}
                  >
                    &nbsp;
                  </BuyCountMinus>
                  <BuyCountText>{buy_count}</BuyCountText>
                  <BuyCountPlus
                    onClick={() => {
                      BuyPlus();
                    }}
                  >
                    &nbsp;{" "}
                  </BuyCountPlus>
                </Buycount>
              </FlexDivBuy>
              <PriceBox>
                <FlexDiv_des>총 상품금액: </FlexDiv_des>
                <Price>{price}</Price>
                <Won>&nbsp;원</Won>
              </PriceBox>
              <BuyButton
                onClick={() => {
                  buyCart();
                }}
              >
                장바구니 담기
              </BuyButton>
            </InfoWrap>
          </OutWrap>

          <FootMarketIMG src="https://media.vlpt.us/images/kbs2082/post/369c9ad0-6a69-4f23-9b7c-acbe288949c8/marketkurly_ProductDetail_Footer.PNG"></FootMarketIMG>
          <CommentList />
        </React.Fragment>
      )}
    </>
  );
};

const OutWrap = styled.div`
  display: flex;
  width: 1050px;
  margin: auto;
  margin-bottom: 100px;
`;

const ImgWrap = styled.div`
  position: relative;
  width: 430px;
  height: 552px;
  & img {
    width: 430px;
    height: 552px;
    margin: 0px;
    padding: 0px;
  }
`;

const InfoWrap = styled.div`
  display: block;
  margin-left: 60px;
  overflow: hidden;
  padding: 0px 0;
`;
const TitleText = styled.p`
  display: block;
  padding-right: 60px;
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
  word-break: break-all;
`;
const ShareIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
const Description = styled.p`
  display: block;
  font-size: 14px;
  color: #999;
  line-height: 20px;
  word-break: break-all;
  margin-top: -20px;
`;

const PriceText = styled.p`
  font-weight: 500;
  font-size: 28px;
  line-height: 30px;
  letter-spacing: 0;
  word-break: break-all;
  border-bottom: 1px solid #f4f4f4;
`;

const FlexDiv = styled.div`
  display: flex;
  width: 600px;
  border-bottom: 1px solid #f4f4f4;
`;

const FlexDiv_title = styled.p`
  font-size: 14px;
  color: #666;
  width: 150px;
`;
const FlexDiv_des = styled.p`
  font-size: 14px;
  color: #333;
`;
const FlexDiv_des_des = styled.p`
  font-size: 12px;
  color: #666;
`;

const FlexDivBuy = styled.div`
  display: flex;
  width: 600px;
  height: 50px;
  border-bottom: 1px solid #f4f4f4;
  align-items: center;
`;

const Buycount = styled.div`
  display: flex;
  border-radius: 3px;
  border: 0.5px solid #666;
  height: 28px;
  width: 80px;
`;

const PriceBox = styled.div`
  display: flex;
  float: right;
`;

// url 들어가니까 밑에 색 표시가 이상함 => 밑으로 뺴놓음
const BuyCountMinus = styled.button`
  font-size: 20px;
  display: block;
  width: 30px;
  margin: 0px 2px;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
  width: 20px;
  background: url("https://res.kurly.com/pc/ico/2010/ico_minus_on.svg");
`;

const BuyCountPlus = styled.button`
  font-size: 20px;
  margin-left: 5px;
  border: none;
  display: block;
  margin: 0px auto;
  cursor: pointer;
  width: 20px;
  background: #fff url("https://res.kurly.com/pc/ico/2010/ico_plus_on.svg");
`;

const BuyCountText = styled.p`
  font-size: 12px;
  display: block;
  align-items: center;
  margin: 5px 0px 0px 12px;
  font-weight: bold;
`;

const Price = styled.div`
  padding-left: 8px;
  font-weight: 800;
  font-size: 32px;
  line-height: 32px;
`;
const Won = styled.p`
  padding-left: 2px;
  font-size: 20px;
  font-weight: 700;
  line-height: 5px;
`;
const BuyButton = styled.button`
  display: block;
  width: 408px;
  height: 54px;
  padding-bottom: 2px;
  border: 0;
  background: 0 0;
  font-weight: 700;
  color: #fff;
  background-color: #5f0080;
  font-size: 16px;
  line-height: 52px;
  letter-spacing: -0.1px;
  text-align: center;
  cursor: pointer;
  float: right;
  margin-top: 10px;
`;

const FootMarketIMG = styled.img`
  margin-top: 200px;
  align-content: center;
  display: flex;
  margin: auto;
`;

export default ProductDetail;
