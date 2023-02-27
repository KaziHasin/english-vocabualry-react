import React, { Component } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import word from "../words.json";
import WordDescription from "./WordDescription";
import Lodder from "./Lodder";

export default class WordBox extends Component {
  state = {
    isOpen: false,
    words: word,
    openIndex: -1,
    openLetter: null,
    numWords : 6,
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

  fetchMoreData = () => {
    
    setTimeout(() => {
      this.setState({
        numWords: this.state.numWords+3
      });
    }, 2500);
  };


  render() {
    const { words } = this.state;
    const { numWords } = this.state;
    const TotalLength = Object.keys(words).length;

    
  
    return (
      <>

<InfiniteScroll
          dataLength={numWords}
          next={this.fetchMoreData}
          hasMore={numWords < TotalLength ? true: false}
          loader={<div style={{display:"flex", justifyContent: "center", width: '100%'}}><Lodder/></div>}

          style={{ 

            minHeight: '100vh',
            maxWidth: '100vw',
            display: 'flex',
            flexWrap:' wrap',
            justifyContent: 'space-between',
            padding: '15px',
            overflow: 'hidden'
          }}
        >
        {Object.keys(words).slice(0, numWords).map((key) => (
          <Wordbox key={key}>
            <Words>
              <Boxtitle>
                <span>Word For Latter</span>
                <span>'{key.toUpperCase()}'</span>
              </Boxtitle>
              <ul>
                {words[key].slice(0, 5).map((word, index) => (
                  <li key={index}>
                    <div>{word.charAt(0).toUpperCase() + word.slice(1)}</div>

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

        </InfiniteScroll>
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
