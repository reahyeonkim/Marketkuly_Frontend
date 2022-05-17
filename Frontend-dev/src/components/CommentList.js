/* eslint-disable */

import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { commentActions } from "../redux/modules/comment";
import Comment from "./Comment";

const CommentList = (props) => {
  const { productId } = props;

  const dispatch = useDispatch();

  // checks logined
  const is_login = useSelector((state) => state.user.is_login);
  const comment_list = useSelector((state) => state.comment.list);
  const isloaded = useSelector((state) => state.comment.loaded);

  React.useEffect(() => {
    dispatch(commentActions.getCommentAPI(productId));
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [comment, setComment] = useState("");
  const onChange = (e) => {
    console.log(e.target.value);
    setComment(e.target.value);
  };

  const addComment = () => {
    if (comment === "") {
      window.alert("댓글이 공란입니다.");
      return;
    }

    dispatch(commentActions.addCommentAPI(productId, comment));

    setComment("");
    closeModal();
  };

  const openModal = (e) => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <React.Fragment>
        <Grid>
          <P>
            PRODUCT REVIEW
            <br />
            ▪ 상품에 대한 리뷰가 쓰여지는 공간입니다.
            <br />
          </P>
          <Table>
            <thead>
              <tr>
                <th scope="cols" style={{ width: "50px" }}>
                  번호
                </th>
                <th scope="cols" style={{ width: "1000px" }}>
                  내용
                </th>
                <th scope="cols" style={{ width: "100px" }}>
                  작성자
                </th>
                <th scope="cols" style={{ width: "100px" }}>
                  작성일
                </th>
                <th scope="cols" style={{ width: "50px" }}>
                  추천
                </th>
              </tr>
            </thead>
            <tbody>
              {isloaded && (
                <>
                  {comment_list.map((doc, idx) => {
                    return <Comment key={idx} {...doc} id={idx} />;
                  })}
                </>
              )}
            </tbody>
          </Table>
          {is_login && <Button onClick={openModal}>후기쓰기</Button>}
        </Grid>

        <ModalFrame>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={props.clearSelectedOption}
            ariaHideApp={false}
            contentLabel="Selected Option"
            className="Modal"
          >
            <ModalTitle>리뷰 작성하기</ModalTitle>
            <br />

            <ElTextarea
              placeholder="리뷰 작성"
              rows={5}
              onChange={onChange}
              value={comment}
            />
            <ModalBtn className="ModalBtn">
              <BtnInModal className="BtnInModal" onClick={addComment}>
                작성 완료
              </BtnInModal>
              <BtnInModal className="BtnInModal" onClick={closeModal}>
                닫기
              </BtnInModal>
            </ModalBtn>
          </Modal>
        </ModalFrame>
      </React.Fragment>
    </>
  );
};

const Grid = styled.div`
  display: block;
  max-width: 1050px;
  margin: 0 auto;
  text-align: center;
`;
const P = styled.p`
  text-align: left;
  color: #4c4c4c;
`;
const Table = styled.table`
  width: 100%;
  color: #4c4c4c;
  border-top: 2px solid purple;
  border-bottom: 1px solid purple;
  font-size: 12px;

  & th {
    padding: 20px;
    border-bottom: 0.5px solid #dcdcdc;
  }
`;

const Button = styled.button`
  display: inline-block;
  text-align: center;
  width: 130px;
  height: 30px;
  margin: 20px 0px 0px 920px;
  background-color: #795b8f;
  border: 1px solid #5f0080;
  color: #fff;
  font-size: 13px;
  &:hover {
    background-color: #fff;
    color: #5f0080;
  }
`;

const ModalFrame = styled.div`
  max-width: 400px;
  max-height: 400px;
`;

const BtnInModal = styled.button`
  padding: 15px 15px 15px 15px;
  margin-top: 18px;
  border: none;
  border-radius: 10px;
  background: white;
  font-weight: bolder;
  :hover {
    transform: scale(1.1);
    transition: transform 200ms ease-in-out;
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

const ModalBtn = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ModalTitle = styled.h2`
  background: white;
  text-align: center;
  width: 100%;
  padding: 0px;
  border-radius: 10px;
  margin-bottom: 70px;
`;

const ElTextarea = styled.textarea`
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #212121;
  border-radius: 4px;
  width: 100%;
  max-width: 800px;
  padding: 12px 4px;
  box-sizing: border-box;
`;
export default CommentList;
