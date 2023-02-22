import React, { Component } from "react";
import styled from "styled-components";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default class WordDescription extends Component {
  state = {
    word: this.props.word,
  };

  render() {
    console.log(this.state.word);

    return (
      <>
        <p>
          <FirstPart>
            <Audio></Audio>
            <span>Apple</span>
          </FirstPart>

          <SecondPart>
            <span>Verb</span>
            <br />

            <span>Lorem ipsum dolor sit amet consectetur.</span>
          </SecondPart>

          <ThirdPart>
            <span>Similar:</span>

            <span>
              <small>Apple</small>
              <small>Apple</small>
              <small>Apple</small>
              <small>Apple</small>
              <small>Apple</small>
              <small>Apple</small>
              <small>Apple</small> <small>Apple</small>
            </span>

            <DownArrow></DownArrow>
          </ThirdPart>
        </p>
      </>
    );
  }
}

const FirstPart = styled.span`
  display: flex;
  margin: 10px 0;
`;
const SecondPart = styled.span`
  margin: 10px 0;

  span:last-child {
    font-family: Arial, Helvetica, sans-serif;
    opacity: 0.8;
    margin-left: 10px;
  }
`;

const ThirdPart = styled.span`
  margin: 15px 0;
  display: flex;

  span:first-child {
    color: #44bd32;
    font-family: Arial, Helvetica, sans-serif;
    margin-right: 10px;
  }

  span:not(:first-child) {
    display: flex;
    flex-wrap: wrap;
    margin-top: -4px;
  }

  span small {
    border: 1px solid #cccc;
    border-radius: 40px;
    padding: 2px 4px;
    margin: 4px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const DownArrow = styled(KeyboardArrowDownIcon)`
  opacity: 0.6;
  cursor: pointer;
`;
const Audio = styled(VolumeUpIcon)`
  color: #3867d6;
  margin-right: 4px;
  cursor: pointer;
`;
