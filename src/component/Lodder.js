import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components';
  
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Spinner = styled.span`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3867d6;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 2s linear infinite;
  
`;

const Container = styled.p`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;



export default class Lodder extends Component {
  render() {
    return (
      <Container>
     
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      
    </Container>
    )
  }
}
