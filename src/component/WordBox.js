import React, { Component } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import word from "../words.json";
import WordDescription from "./WordDescription";
import Lodder from "./Lodder";
import "../index.css";

export default class WordBox extends Component {

  constructor(props) {
    super(props);

    // add all alphabet activePagiBtns first time page is load 
    
    // Object.keys(word).map(letter => activePagiBtns[letter] = 1)
  this.state = {
    isOpen: false,
    words: word,
    openIndex: -1,
    openLetter: null,
    pagiOpenLetter:null,
    numWords : 6,
    perPage : 5,
    currentPage: {},
    activePagiBtns:{},
    showMaxPagiButton:{},
    showMinPagiButton:{},
    
    pageActive: 1,
   
  };
  
}


componentDidMount() {
  const {words} = this.state;
  const currentPage = {};
  const activePagiBtns = {};
  const showMaxPagiButton = {};
  const showMinPagiButton = {};



 Object.keys(words).map((letter) =>
 {
    return (
      currentPage[letter] = 1,
      activePagiBtns[letter] = 1,
      showMaxPagiButton[letter] = 4,
      showMinPagiButton[letter] = 1
   )
 })
   
 this.setState({activePagiBtns,currentPage,showMaxPagiButton, showMinPagiButton})

}



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

  


  handlePagination = (event)=> { 
    
    const { id, dataset } = event.target;
    const { value } = dataset;

    const activePagiBtns = { ...this.state.activePagiBtns};
    const currentPage = { ...this.state.currentPage };
      
    // set the particular alphabet key clicked id 
    activePagiBtns[value] = Number(id);
    currentPage[value] = Number(id);

    this.setState({activePagiBtns, currentPage});
    
   
    
  }


  nextPagination = (event) => {
    
    const value  = event.target.getAttribute('data-value')

    const showMaxPagiButton = { ...this.state.showMaxPagiButton };
    const showMinPagiButton = { ...this.state.showMinPagiButton };


    showMaxPagiButton[value] = this.state.showMaxPagiButton[value] + 1
    showMinPagiButton[value] = this.state.showMinPagiButton[value] + 1

    
     this.setState({showMaxPagiButton, showMinPagiButton});

  
  }


  previousPagination = (event) => {
    
    const value  = event.target.getAttribute('data-value')

    const showMaxPagiButton = { ...this.state.showMaxPagiButton };
    const showMinPagiButton = { ...this.state.showMinPagiButton };


    showMaxPagiButton[value] = this.state.showMaxPagiButton[value] - 1
    showMinPagiButton[value] = this.state.showMinPagiButton[value] - 1

    
     this.setState({showMaxPagiButton, showMinPagiButton});

  
  }

  

  

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
          {Object.keys(words).slice(0, numWords).map((letter) => {
             

            //  calculation of total pages 
            const totalPages = Math.ceil(words[letter].length / this.state.perPage)
            
            
            const pageNumbers = [];
            let i = this.state.showMinPagiButton[letter];

          
            for (i;i <= Math.min(totalPages, this.state.showMaxPagiButton[letter]); i++) {
              pageNumbers.push(i);
            }
             const munberPage = pageNumbers.length * this.state.perPage;
             
             let rightArrowComponent;
             if (munberPage < words[letter].length && this.state.showMaxPagiButton[letter] < totalPages) {
         
               rightArrowComponent = <RightArrow data-value={letter} onClick={this.nextPagination}/>;
             }
        
             else {
               rightArrowComponent = <RightArrowPlaceholder />;
             }
             let leftArrowComponent;
             if(this.state.showMinPagiButton[letter] > 1) {
              
              leftArrowComponent = <LeftArrow data-value={letter} onClick={this.previousPagination}/>;
            } else {
              leftArrowComponent = <LeftArrowPlaceholder />;
              
            }
        
              const endingItem = this.state.currentPage[letter] * this.state.perPage;
              const startingItem = endingItem - this.state.perPage;           
           
            return(
        
          
          <Wordbox key={letter}>
            <Words>
              <Boxtitle>
                <span>Word For Latter</span>
                <span>'{letter.toUpperCase()}'</span>
              </Boxtitle>
              <ul>
                
                {words[letter].slice(startingItem, endingItem).map((word, index) => (
                  <li key={index}>
                    <div>{word.charAt(0).toUpperCase() + word.slice(1)}</div>

                    {this.state.isOpen &&
                      this.state.openIndex === index &&
                      this.state.openLetter === letter && (
                       
                        <WordDescription word={word} />
                       
                      )}
                    <div>
                      <Plussign
                        onClick={() => this.handleToggle(index, letter)}
                        as={
                          this.state.isOpen &&
                          this.state.openIndex === index &&
                          this.state.openLetter === letter
                            ? RemoveIcon
                            : AddIcon
                        }
                      ></Plussign>
                    </div>

                  </li>
                ))}
<Pagination>

{leftArrowComponent}
{pageNumbers.map((number) => (
  <button
    key={number}
    id={number}
    data-value={letter}
    onClick={this.handlePagination}
    className={
      this.state.activePagiBtns[letter] === number ? "pagiActive" : null
    }
  >
    {number}
   
  </button>
))}

{rightArrowComponent}

</Pagination>
              </ul>
            </Words>
          </Wordbox>
            )
       })}

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


const Pagination = styled.div`

&.pagination{}

display: flex;
  justify-content: center; 
 
  padding: 12px 0;


  button {
    background-color: #3867d6;
    color: white;
    margin: 0 4px;
    padding: 6px 8px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

  }
`

const LeftArrow = styled(KeyboardArrowLeftIcon)`
cursor: pointer;
`;
const RightArrow = styled(KeyboardArrowRightIcon)`
cursor: pointer;`
const RightArrowPlaceholder = styled.span`
  // styles for a placeholder element when munberPage < words[letter].length is false
`;

const LeftArrowPlaceholder = styled.span`
  // styles for a placeholder element when munberPage < words[letter].length is false
`;
