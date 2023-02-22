import React, { Component } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import word from "../words.json";
import WordDescription from "./WordDescription";

export default class WordBox extends Component {
  state = {
    isOpen: false,
    word: word,
    openIndex: -1,
    openLetter: null,
  };

  handleToggle = (index, openLetter) => {
    if (
      this.state.openIndex === index &&
      this.state.openLetter === openLetter
    ) {
      this.setState({ openIndex: -1 });
      this.setState({ openLetter: null });
      this.setState({ isOpen: false });
    } else {
      this.setState({ openIndex: index });
      this.setState({ openLetter: openLetter });
      this.setState({ isOpen: true });
    }
  };
  render() {
    const { word } = this.state;
    return (
      <>
        {Object.keys(word).map((key) => (
          <Wordbox key={key}>
            <Words>
              <Boxtitle>
                <span>Word For Latter</span>
                <span>'{key.toUpperCase()}'</span>
              </Boxtitle>
              <ul>
                {word[key].slice(0, 5).map((word, index) => (
                  <li key={index}>
                    <div>{word}</div>

                    {this.state.isOpen &&
                      this.state.openIndex === index &&
                      this.state.openLetter === key && (
                        <WordDescription word={word} />
                      )}
                    <div>
                      <Plussign
                        onClick={() => this.handleToggle(index, key)}
                        as={
                          this.state.isOpen &&
                          this.state.openIndex === index &&
                          this.state.openLetter === key
                            ? RemoveIcon
                            : AddIcon
                        }
                      ></Plussign>
                    </div>
                  </li>
                ))}
              </ul>
            </Words>
          </Wordbox>
        ))}
      </>
    );
  }
}

const Wordbox = styled.section`
  width: 30%;
  margin: 15px 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 15px auto;
  }

  p {
    margin-top: 45px;
    width: 100%;
    margin-left: -40px;
    display: block;
  }
`;

const Boxtitle = styled.h2`
  background-color: #3867d6;
  color: white;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  margin: 0;
`;

const Words = styled.div`
  background-color: #fff;
  box-shadow: 0 0 21px 15px #f2f2f2;

  ul {
    list-style-type: none;
    padding-left: 0;

    margin-top: 0;
  }

  ul li {
    padding: 16px 14px;
    display: flex;
    justify-content: space-between;
    border: none;
    border-bottom: 1px solid #ccc;
  }

  ul li > div {
    font-weight: 800;
    font-size: 20px;
  }
`;

const Plussign = styled(AddIcon)`
  font-size: 50px;
  cursor: pointer;
`;
