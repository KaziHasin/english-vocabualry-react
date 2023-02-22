import React, { Component } from "react";
import styled from "styled-components";
import WordBox from "./WordBox";

export default class Home extends Component {
  render() {
    return (
      <>
        <Heading>
          <Title>Build Your Vocabulary Strong</Title>
        </Heading>
        <Wrapper>
          <WordBox />
        </Wrapper>
      </>
    );
  }
}

const Heading = styled.section``;

const Title = styled.h1`
  font-size: 50px;
  margin: 15px auto;
  text-align: center;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
