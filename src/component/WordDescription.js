import React, { Component } from "react";
import styled, { keyframes }from "styled-components";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import Lodder from "./Lodder";

export default class WordDescription extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
      word: this.props.word,
      data: null,
      error: null,
      loading: true,
      isPlaying: false,
      isNotAudio: false,
     
    };

     this.audioRef = React.createRef();
    
  }
  
 
  // pronunciation of the word 
  handlePlay = () => {
    

        if(this.audioRef.current.src.length === 22) {
            this.setState({isNotAudio : true})

            setTimeout(() => {
        this.setState({ isNotAudio: false });
      }, 1500);
        }else {
       console.log(this.audioRef.current.src.length);
      this.audioRef.current.play();
      this.setState({ isPlaying: true });
      setTimeout(() => {
        this.setState({ isPlaying: false });
      }, 1000);

    }
    
  };
  

  // call the method after dom render 
  componentDidMount() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${ this.state.word}`)
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
        this.setState({ data, loading: false });

      }, 1000);
        
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
     
  }

  
  render() {

    const { data, error, loading } = this.state;

    
    if (loading) {
      return <Lodder/>;
    }


    if (error) {
      return <p>Error: {error.message}</p>;
    }
  
    return (
      <>
       {Array.isArray(data) ? data.map((item)  => {
  
  const {audio} = item.phonetics[0];
  const [...synonyms] = item.meanings[0].definitions[0].synonyms
  const [...definition] = item.meanings[0].definitions;
  let definitionStr = [];
  definitionStr = item.meanings[0].definitions.map((item2) => item2.definition).join("").split(';')

 

 

          return(
        <Container key={item}>
          <FirstPart>
            <Audio onClick={this.handlePlay}>
           
              </Audio>
              {this.state.isPlaying &&
              <Sound>
             
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </Sound>
  }
              <audio ref={this.audioRef} src={audio} />
              {this.state.isNotAudio &&
              <NoAdudio>
                   
                 No Audio is Available

              </NoAdudio>

       }
            <span>{item.word.charAt(0).toUpperCase() + item.word.slice(1)}</span>
            <span>{(item.phonetics[0].text !== undefined)? item.phonetics[0].text : item.phonetics[1].text}</span>
          </FirstPart>

          <SecondPart>
            <span>{item.meanings[0].partOfSpeech}</span>
            <br />

            <span>{definition[0].definition}</span>
          </SecondPart>

          <ThirdPart>
            <span>Similar:</span>

            <span>

              {
                
                synonyms.length !== 0 ?  (
                  synonyms.map(syn => <small key={syn}>{syn.charAt(0).toUpperCase() + syn.slice(1)}</small>)
                )
                  :(
                    
                    definitionStr.map((syn, index)=>{
                        const words = syn.split(" ")
                        const lastWord = words[words.length - 1]; 

                        return  (lastWord.length > 5) && <small key={index}>{lastWord.charAt(0).toUpperCase() + lastWord.slice(1)}</small>
                       

                    })
                  )


                

              }
              
            </span>

            
          </ThirdPart>
        </Container>

       )
    
  }): <p><strong>Word not found...</strong></p>}
      </>
    );
  }
}
const Container = styled.p`

`
const FirstPart = styled.span`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  position: relative;
 
  
  span:last-child{

    width: 100%;
    margin-top: 2px;
  }

  audio {
   display: none;
  }

  

`;

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Sound = styled.span`
    
    position: relative;
    animation: ${fade} 1s ease-in-out 2;
    
  
    span {
      width: 10px;
      height: 2px;
      background-color: #3867d6;
      display: inline-block;
      position: absolute;
      transition: all 1s;
      
      
     
    }

    span:nth-of-type(1) {
      top: 4px;
      left: -10px;
      transform: rotate(-12deg) translateY(-4px);
      animation-delay: 0s;

      
}

span:nth-of-type(2) {
      top:11px;
      left: -10px;
      animation-delay: 0.5s;
      
}

span:nth-of-type(3) {
      top: 18px;
      left: -10px;
      transform: rotate(12deg) translateY(4px);
      animation-delay: 0.10s;
}

    

`

const NoAdudio = styled.span`
   
   
   position: absolute;
      display: inline-block;
       background-color: #fff;
       box-shadow: 0 0 4px 2px #f2f2f2;
       padding: 3px;
       left: 25px;
       top: -5px;
       z-index: 1;
       border-radius: 8px;
       

`
const SecondPart = styled.span`
  margin: 10px 0;

  span:last-child {
    font-family: Arial, Helvetica, sans-serif;
    opacity: 0.8;
    margin-left: 10px;
    font-size: 12px;
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


const Audio = styled(VolumeUpIcon)`
  color: #3867d6;
  margin-right: 4px;
  cursor: pointer;
 
  
`;
