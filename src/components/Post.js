import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types'
import DaumPostcode from "react-daum-postcode";
 
const Post = (props) => {
    const setAddress = props.setAddress;
    const setZonecode = props.setZonecode;
	// 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)
        setAddress(fullAddress);
        setZonecode('㉾ '+data.zonecode)
        props.onClose()
    }
 
    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top: "10%",
        width: "600px",
        height: "600px",
        padding: "7px",
      };
 
    return(
        <Container>
             <Background onClick={() => {props.onClose()}} />
             {/* <ModalBlock> */}
             <Contents>
            <div>
            <DaumPostcode style={postCodeStyle} autoClose onComplete={handlePostCode} />
            {/* <button type='button' onClick={() => {props.onClose()}} className='postCode_btn'>닫기</button> */}
            </div>
            </Contents>
            {/* </ModalBlock> */}

        </Container>
    )
}
 

export default Post;

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;



const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    animation: modal-bg-show 1s;
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;