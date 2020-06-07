import React from 'react';
import ScaleForm from './ScaleForm.jsx';
import styled from 'styled-components';
import {ControllerPlay} from '@styled-icons/entypo/ControllerPlay';
import {Pause} from '@styled-icons/foundation/Pause';
const Octavian = require('octavian');

const MainDiv = styled.div`
  background-color: #1c1c1c;
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTitle = styled.h1`
  color: white;
  font-family: Muli, sans-serif;
  font-weight: bold;
`;

const PlayPauseWrapper = styled.div`
  width: 15%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
;`

const PlayWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #1c1c1c;
  background: ${props => props.playing ? '#f28c26' : 'linear-gradient(145deg, #191919, #1e1e1e)'};
  box-shadow:  6px 6px 12px #131313,
             -6px -6px 12px #252525;
  position: relative;
  cursor: pointer;
`;

const PauseWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #1c1c1c;
  background: ${props => props.playing ? 'linear-gradient(145deg, #191919, #1e1e1e)' : '#f28c26'};
  box-shadow:  6px 6px 12px #131313,
             -6px -6px 12px #252525;
  position: relative;
  cursor: pointer;
`;

const ControllerIcon = styled(ControllerPlay)`
  color: white;
  height: 35px;
  position: absolute;
  top: 7px;
  left: 9px;
`;

const PauseIcon = styled(Pause)`
  color: white;
  height: 35px;
  position: absolute;
  top: 7px;
  left: 7px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      currentNote: 'A'
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  componentDidMount() {

  }

  play(note) {
    var octave = 4;
    var newNote = new Octavian.Note(`${note}${octave}`);
    osc = context.createOscillator();
    osc.connect(context.destination);
    osc.frequency.value = newNote.frequency;
    osc.start();
    this.setState({
      playing: true
    })
  }

  pause() {
    osc.stop();
    osc.disconnect();
    this.setState({
      playing: false
    })
  }

  render() {
    return (
      <MainDiv>
        <MainTitle>JAVASLAPZ</MainTitle>
        <ScaleForm playNote={this.play}/>
        <PlayPauseWrapper>
          <PlayWrapper onClick={this.play} playing={this.state.playing}>
            <ControllerIcon></ControllerIcon>
          </PlayWrapper>
          <PauseWrapper onClick={this.pause} playing={this.state.playing}>
            <PauseIcon></PauseIcon>
          </PauseWrapper>
        </PlayPauseWrapper>
      </MainDiv>
    );
  }

};

export default App;