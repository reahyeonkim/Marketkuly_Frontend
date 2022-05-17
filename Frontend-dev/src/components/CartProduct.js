import React from "react";
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CartProduct = (props) => {
  return (
    <>
      <ProductUnitWrapper>
        <CheckCircleIcon style={{ marginRight: "10px" }} />
        <ProductImage src="http://img2.tmon.kr/cdn3/deals/2021/01/18/2776520766/2776520766_front_662d07f3a2.jpg" />
        <ProductTextWrapper>
          <ProductDeadline>10월 21일까지 구매가능</ProductDeadline>
          <ProductName>
            [신규회원 이벤트] 에너지바 4입 + 단백질바 3입
          </ProductName>
        </ProductTextWrapper>

        <ProductQtyWrapper>
          <button>-</button>
          <p>수량</p>
          <button>+</button>
        </ProductQtyWrapper>
        <ProductPriceWrapper>
          <p>100원</p>
          <p>7,500원</p>
        </ProductPriceWrapper>
        <ClearIcon />
      </ProductUnitWrapper>
    </>
  );
};

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
  font-size: 15px;
  font-weight: 800;
  margin: 20px 0 0 0;
  color: #5f0080;
`;

const ProductName = styled.div`
  font-size: 16px;
  margin: 0 0 15px 0;
`;

const ProductQtyWrapper = styled.div`
  width: 86px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0 20px;
`;

const ProductPriceWrapper = styled.div`
  width: 116px;
`;

export default CartProduct;
