import React from "react";
import "./modal.scss";
import styled from "styled-components";

const { width : WIDTH , height : HEIGHT } = window.screen;

export default ({ msg, setPopUp, apiResponse, props }) => {
  const commitHandler = () => {
    setPopUp(false);
    if(apiResponse === "Main") props.history.push("/");
    if(apiResponse === "Select") {
      props.history.push({
        pathname: "/Select_type",
        state : { backPath : "Login" }
      });
    }
    if(apiResponse === "SearchForm") props.history.push("/SearchForm");
    if(apiResponse === "AroundSearch") props.history.push(`/AroundSearch${props.location.pathname}`);
  }
  return (
    <Background>
      <MsgBox>
        <Title>Tribby</Title>
        <Content>{msg}</Content>
        <BtnLayout>
          <Commit onClick={commitHandler}>OK</Commit>
        </BtnLayout>
      </MsgBox>
    </Background>
  );
};

const Background = styled.div`
  width : ${WIDTH}px;
  max-width: 650px;
  height : ${HEIGHT}px;
  background-color : rgba(0,0,0,0.5);
  position : absolute;
  left : 0;
  top : 0;
  display : flex;
  justify-content : center;
  align-items : center;
  z-index: 150;
`;

const MsgBox = styled.div`
  width: ${WIDTH*0.7}px;
  max-width: 400px;
  height: ${HEIGHT/6}px;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
`;

const Title = styled.div`
  width: 100%;
  height: 30%;
  padding: 0px 20px;
  border-bottom: 1px solid #c7ecee;
  font-size : ${WIDTH/23}px;
  display : flex;
  align-items : center;
`;

const Content = styled.div`
  width: 100%;
  height: 30%;
  padding: 0px 20px;
  display: flex;
  align-items : center;
  font-size : ${WIDTH/30}px;
  border-bottom: 1px solid #c7ecee;
`;

const BtnLayout = styled.div`
  width: 100%;
  height: 40%;
  background-color: #dff9fb;
  padding: 0px 20px;
  display: flex;
  justify-content: flex-end;
  align-items : center;
`;

const Commit = styled.button`
  width: 30%;
  height: 80%;
  border: 1px solid #c7ecee;
  border-radius: 10px;
  color: black;
  background-color: white;
`;
