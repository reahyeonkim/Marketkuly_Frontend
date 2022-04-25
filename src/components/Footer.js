import React from "react";
import FooterLeft from "./FooterLeft";
import FooterRight from "./FooterRight";
import styled from "styled-components";
const Footer = () => {
  return (
    <>
      <Hr></Hr>
      <Foot>
        <FooterLeft />
        <FooterRight />
      </Foot>
    </>
  );
};

export default Footer;

const Hr = styled.hr`
  border-top: 1em solid white;
  width: 1600px;
`;
const Foot = styled.div`
  width: 1050px;
  margin: auto;
  padding-bottom: 60px;
  font-weight: 400;
  letter-spacing: -0.2px;
  display: flex;
`;
