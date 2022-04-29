/* eslint-disable */

import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import product, { productActions } from "../redux/modules/product";
import RoomIcon from "@mui/icons-material/Room";
import { useSelector, useDispatch } from "react-redux";

const Cart = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productActions.getMyProductAPI());
  }, []);

  const products = useSelector(state => state.product.myProducts);
  const is_loaded = useSelector(state => state.product.is_loaded);
  const totalPrice = products.reduce((acc, cur) => {
    return acc + cur.price * 0.5 * cur.amount;
  }, 0);

  console.log(totalPrice);

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(100);

  const plusQty = () => {
    setQty(qty + 1);
  };

  const subQty = () => {
    setQty(qty - 1);
  };

  const deleteProduct = id => {
    dispatch(productActions.deleteMyProductAPI(id));
  };

  const setOrder = () => {
    console.log("주문!");
  };

  return (
    <>
      {is_loaded && (
        <Wrapper>
          <Title>장바구니</Title>
          <InfoWrapper>
            <ProductWrapper>
              <ProductSummary>
                <CheckCircleIcon
                  color="disabled"
                  style={{ marginRight: "20px", cursor: "pointer" }}
                />
                <SelectText style={{ marginRight: "20px" }}>
                  전체선택 / {products.length}
                </SelectText>
                <SelectText>선택삭제</SelectText>
              </ProductSummary>
              <hr style={{ width: "720px", size: "5" }} />

              {products.map((p, idx) => {
                return (
                  <ProductUnitWrapper key={p.idx}>
                    <CheckCircleIcon
                      color="disabled"
                      style={{ marginRight: "10px", cursor: "pointer" }}
                    />
                    <ProductImage src={p.image} />
                    <ProductTextWrapper>
                      <ProductDeadline>{p.name}</ProductDeadline>
                      <ProductName>{p.description}</ProductName>
                    </ProductTextWrapper>

                    <ProductQtyWrapper>
                      <ProductQtyButton
                        onClick={subQty}
                        style={{ cursor: "pointer" }}
                      >
                        -
                      </ProductQtyButton>
                      <ProductQty>{p.amount + qty}</ProductQty>
                      <ProductQtyButton
                        style={{ cursor: "pointer" }}
                        onClick={plusQty}
                      >
                        +
                      </ProductQtyButton>
                    </ProductQtyWrapper>
                    <ProductPriceWrapper>
                      <ProductActualPrice>{p.price * 0.5}</ProductActualPrice>
                      <ProductPrice>{p.price}</ProductPrice>
                    </ProductPriceWrapper>
                    <ClearIcon
                      style={{ color: "#e1e1e1", cursor: "pointer" }}
                      onClick={() => deleteProduct(p.productId)}
                    />
                  </ProductUnitWrapper>
                );
              })}
            </ProductWrapper>
            <PriceWrapper>
              <DeliveryArea style={{ padding: "20px" }}>
                <p style={{ fontWeight: 600 }}>🏠 &nbsp; 배송지</p>
                <p
                  style={{
                    lineHeight: "24px",
                    margin: "0 0 5px 0",
                    fontWeight: 600,
                  }}
                >
                  서울시 중구 다산로36길 110(신당푸르지오) 103동 1302호
                </p>
                <p
                  style={{
                    color: "#5f0080",
                    fontSize: "14px",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  샛별배송
                </p>
                <button
                  style={{
                    color: "#5f0080",
                    backgroundColor: "white",
                    border: "1px solid #5f0080",
                    height: "36px",
                    marginTop: "17px",
                    fontWeight: 600,
                    fontSize: "12px",
                    width: "281px",
                    margin: "20px 0 30px 0",
                  }}
                >
                  배송지 변경
                </button>
              </DeliveryArea>
              <PriceArea style={{ padding: "20px" }}>
                <PriceDetail>
                  <p>상품금액</p>
                  <p>{totalPrice}원</p>
                </PriceDetail>
                <PriceDetail>
                  <p style={{ margin: 0 }}>상품할인금액</p>
                  <p style={{ margin: 0 }}>0원</p>
                </PriceDetail>
                <PriceDetail>
                  <p>배송비</p>
                  <p>0원</p>
                </PriceDetail>
                <hr style={{ width: "278px", border: "1px solid #f2f2f2" }} />
                <PriceDetail style={{ alignItems: "center" }}>
                  <p>결제예정금액</p>
                  <p style={{ fontSize: "20px", fontWeight: "700" }}>
                    {totalPrice}원
                  </p>
                </PriceDetail>
              </PriceArea>
              <button
                style={{
                  backgroundColor: "#5f0080",
                  color: "white",
                  height: "50px",
                  borderRadius: "5px",
                  fontSize: "17px",
                  fontWeight: 700,
                  width: "326px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                주문하기
              </button>

              <ul
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  padding: "20px 0 0 20px",
                }}
              >
                <li>쿠폰/적립금은 주문서에서 사용 가능합니다</li>
                <li>
                  '입금확인'상태일 때는 주문 내역 상세에서 직접 주문취소가
                  가능합니다.
                </li>
                <li>'입금확인'이후 상태에는 고객센터로 문의해주세요.</li>
              </ul>
            </PriceWrapper>
          </InfoWrapper>
        </Wrapper>
      )}
    </>
  );
};

export default Cart;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1050px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 100px;
`;

const Title = styled.p`
  color: black;
  font-size: 24px;
  margin: 0 auto;
  font-weight: 900;
  margin-bottom: 50px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
`;

const SelectText = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 742px;
  box-sizing: border-box;
  padding: 10px;
  margin-right: 20px;
`;

const ProductSummary = styled.div`
  display: flex;
  align-items: center;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 284px;
  box-sizing: border-box;
`;

const ProductUnitWrapper = styled.div`
  display: flex;
  width: 730px;
  align-items: center;
  box-sizing: border-box;
  padding: 20px 20px 20px 0px;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 78px;
  margin-right: 10px;
`;

const ProductTextWrapper = styled.div`
  width: 327px;
`;

const ProductDeadline = styled.p`
  font-size: 13px;
  font-weight: 700;
  margin: 15px 0 0 0;
  color: #5f0080;
`;

const ProductName = styled.div`
  font-size: 15px;
  margin: 0 0 15px 0;
  font-weight: 500;
`;

const ProductQtyWrapper = styled.div`
  width: 86px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0 20px;
  border: 1px solid #e1e1e1;
  height: 30px;
`;

const ProductQtyButton = styled.button`
  background-color: white;
  color: black;
  border: none;
  font-size: 20px;
  width: 40px;
`;

const ProductQty = styled.p`
  font-size: 14px;
`;

const ProductPriceWrapper = styled.div`
  width: 50px;
  margin-right: 70px;
`;

const ProductActualPrice = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin: 15px 0 0 0;
  text-align: right;
`;

const ProductPrice = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin: 0 0 15px 0;
  color: #999;
  text-decoration: line-through;
  text-align: right;
`;

const DeliveryArea = styled.div`
  background-color: white;
  border: 1px solid #f2f2f2;
  width: 284px;
`;

const PriceArea = styled.div`
  background-color: #fafafa;
  border: 1px solid #f2f2f2;
  width: 284px;
`;

const PriceDetail = styled.div`
  display: flex;
  justify-content: space-between;
`;
