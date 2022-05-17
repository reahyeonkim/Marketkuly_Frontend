/* eslint-disable */

import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/modules/user";
import Text from "../elements/Text";

const Signup = () => {
  const dispatch = useDispatch();
  const validation = useSelector((state) => state.user.emailValidation);
  const errorMessage = useSelector((state) => state.user.signUpError);
  console.log(errorMessage);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);

  const onChange = (e, setInput) => {
    setInput(e.target.value);
  };

  const validateEmail = () => {
    if (email) {
      dispatch(userActions.validateEmailAPI(email));
    } else {
      window.alert("이메일을 입력하세요.");
    }
  };
  const signUP = () => {
    dispatch(userActions.singUpAPI(email, username, password));
  };

  return (
    <>
      <Wrap>
        <Wrap>
          <Title>회원가입</Title>
          <InputWrapper>
            <TextWrapper>
              <Text size="14px" padding="20px" margin="50px" bold>
                이메일
              </Text>
            </TextWrapper>
            <Input
              type="text"
              placeholer="Email"
              required
              onChange={(e) => onChange(e, setEmail)}
              value={email}
            />
            <Button onClick={validateEmail}>중복확인</Button>
          </InputWrapper>
          {validation ? (
            <Text style={{ fontSize: "10px" }} bold>
              ✅&nbsp; 이메일 중복확인 완료
            </Text>
          ) : (
            <Text style={{ fontSize: "10px", color: "red" }} bold>
              {errorMessage}
            </Text>
          )}

          <InputWrapper>
            <TextWrapper>
              <Text size="14px" padding="20px" margin="50px" bold>
                실명
              </Text>
            </TextWrapper>
            <Input
              type="text"
              placeholer="Email"
              onChange={(e) => onChange(e, setUsername)}
              required
              value={username}
            />
            <FakeDiv />
          </InputWrapper>
          <InputWrapper>
            <TextWrapper>
              <Text size="14px" padding="20px" margin="50px" bold>
                비밀번호
              </Text>
            </TextWrapper>
            <Input
              type="password"
              placeholer="Email"
              onChange={(e) => onChange(e, setPassword)}
              required
              value={password}
            />
            <FakeDiv />
          </InputWrapper>

          <InputWrapper>
            <TextWrapper>
              <Text size="14px" padding="20px" margin="50px" bold>
                비밀번호 확인
              </Text>
            </TextWrapper>
            <Input
              type="password"
              placeholer="Email"
              onChange={(e) => onChange(e, setPasswordCheck)}
              required
              value={passwordCheck}
            />
            <FakeDiv />
          </InputWrapper>
          {!checkPassword && (
            <Text style={{ fontSize: "10px" }} bold>
              비밀번호 확인세요
            </Text>
          )}
          {isOpenPost ? (
            <DaumPostcode
              style={postCodeStyle}
              autoClose
              onComplete={onCompletePost}
            />
          ) : null}
          {errorMessage && (
            <Text style={{ fontSize: "10px", color: "red" }} bold>
              {` ${errorMessage}`}
            </Text>
          )}
        </Wrap>
        <ButtonWrapper>
          <Button
            style={{
              backgroundColor: "#5f0080",
              color: "white",
              width: "300px",
            }}
            onClick={signUP}
          >
            가입하기
          </Button>
        </ButtonWrapper>
      </Wrap>
    </>
  );
};

export default Signup;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1050px;
  height: 500px;
  margin: 30px auto;
  box-sizing: border-box;
`;

const Title = styled.p`
  color: black;
  font-size: 24px;
  margin: 0 auto;
  font-weight: 900;
  margin-bottom: 50px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 640px;
  height: 44px;
  padding: 10px 0px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 300px;
  height: 54px;
  margin: 10px 0;
  padding: 15px 10px;
  border: 1px solid #939597;
  border-radius: 5px;
  font-size: 16px;
  border-radius: 5px;
  color: black;
  margin-right: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  background-color: white;
  color: #5f0080;
  font-weight: 900;
  font-size: 14px;
  width: 100px;
  height: 54px;
  border-radius: 5px;
  border: 0.5px solid #5f0080;
`;

const TextWrapper = styled.div`
  width: 120px;
  margin: 0 auto;
`;

const FakeDiv = styled.div`
  width: 100px;
`;
