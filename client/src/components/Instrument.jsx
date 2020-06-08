import React from 'react';
import styled from 'styled-components';
import {ControllerPlay} from '@styled-icons/entypo/ControllerPlay';
import {Pause} from '@styled-icons/foundation/Pause';
const Octavian = require('octavian');

const PadWrapper = styled.div`
  width: 50%;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const NoteSelectionWrapper = styled.div`
  height: 375px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const PadButtonsWrapper = styled.div`
  height: 400px;
  width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 26px;
  background: linear-gradient(145deg, #1e1e1e, #191919);
  box-shadow:  6px 6px 12px #121212,
               -6px -6px 12px #262626;
`;

const NoteButtonEmpty = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 15px;
  background: linear-gradient(145deg, #1e1e1e, #191919);
  box-shadow:  8px 8px 16px #101010,
            -8px -8px 16px #282828;
  cursor: pointer;
`;

const NoteButtonFilled = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 15px;
  background: #f28c26;
  color: black;
  box-shadow:  8px 8px 16px #101010,
            -8px -8px 16px #282828;
  cursor: pointer;
  font-weight: bold;
`;

const PadButtonRow = styled.div`
  width: 550px;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const PadButton = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 15px;
  background: ${props => props.selected ? '#f28c26' : 'linear-gradient(145deg, #1e1e1e, #191919)'};
  box-shadow:  8px 8px 16px #101010,
            -8px -8px 16px #282828;
  cursor: pointer;
`;

const PlayPauseWrapper = styled.div`
  width: 60px;
  height: 375px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

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
  margin-bottom: 20px;
  margin-left: 15px;
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
  margin-left: 15px;
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

class Instrument extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noteSelections: this.props.parentState.currentNotes,
      rowOscillators: {},
      row1Oscillators: {},
      row2Oscillators: {},
      row3Oscillators: {},
      playing: false
    };

    this.createOscillator = this.createOscillator.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  }

  createOscillator(row, col) {
    if (this.state.noteSelections[row]) {
      var osc = context.createOscillator();
      var gainNode = context.createGain();
      gainNode.connect(context.destination);
      gainNode.gain.value = 0.25;

      var note = new Octavian.Note(this.state.noteSelections[row]);
      var freq = note.frequency;
      osc.frequency.value = freq;

      osc.connect(gainNode);
      // setTimeout(() => osc.stop(), 1000);
      var rowToChange;
      if (row === 0) {
        this.state.rowOscillators[col] = osc;
        rowToChange = 'rowOscillators';
      } else if (row === 1) {
        this.state.row1Oscillators[col] = osc;
        rowToChange = 'row1Oscillators';
      } else if (row === 2) {
        this.state.row2Oscillators[col] = osc;
        rowToChange = 'row2Oscillators';
      } else {
        this.state.row3Oscillators[col] = osc;
        rowToChange = 'row3Oscillators';
      };

      debugger;
      this.setState({
        [rowToChange]: this.state[rowToChange]
      });

    }
  }

  play() {
    debugger;
    for (var key in this.state.rowOscillators) {
      var oscillator1 = this.state.rowOscillators[key];
      var oscillator2 = this.state.row1Oscillators[key];
      var oscillator3 = this.state.row2Oscillators[key];
      var oscillator4 = this.state.row3Oscillators[key];
      // setTimeout(() => {oscillator.stop()}, 1000);
      oscillator1.start()
      oscillator2.start()
      oscillator3.start()
      oscillator4.start()
    }
    this.setState({
      playing: true
    });
  }

  stop() {
    for (var i = 0; i < this.state.row1Oscillators.length; i++) {

    }
  }

  render() {
    return (
      <PadWrapper>
        <NoteSelectionWrapper>
          {[0, 1, 2, 3].map(num => {
            if (this.state.noteSelections[num]) {
              return <NoteButtonFilled onClick={() => this.props.remove(num)}>{this.state.noteSelections[num]}</NoteButtonFilled>
            } else {
              return <NoteButtonEmpty></NoteButtonEmpty>
            }
          })}
        </NoteSelectionWrapper>
        <PadButtonsWrapper>
          <PadButtonRow>
            {[0, 1, 2, 3].map(num => {
              var selected = false;
              if (this.state.rowOscillators[num]) {
                selected = true;
              }
              return <PadButton selected={selected} onClick={() => this.createOscillator(0, num)}></PadButton>
            })}
          </PadButtonRow>
          <PadButtonRow>
            {[0, 1, 2, 3].map(num => {
              var selected = false;
              if (this.state.row1Oscillators[num]) {
                selected = true;
              }
              return <PadButton selected={selected}onClick={() => this.createOscillator(1, num)}></PadButton>
              })}
          </PadButtonRow>
          <PadButtonRow>
            {[0, 1, 2, 3].map(num => {
              var selected = false;
              if (this.state.row2Oscillators[num]) {
                selected = true;
              }
              return <PadButton selected={selected} onClick={() => this.createOscillator(2, num)}></PadButton>
              })}
          </PadButtonRow>
          <PadButtonRow>
            {[0, 1, 2, 3].map(num => {
              var selected = false;
              if (this.state.row3Oscillators[num]) {
                selected = true;
              }
              return <PadButton selected={selected} onClick={() => this.createOscillator(3, num)}></PadButton>
              })}
          </PadButtonRow>
        </PadButtonsWrapper>
        <PlayPauseWrapper>
          <PlayWrapper playing={this.state.playing} onClick={this.play}>
            <ControllerIcon></ControllerIcon>
          </PlayWrapper>
          <PauseWrapper playing={this.state.playing} onClick={this.stop}>
            <PauseIcon></PauseIcon>
          </PauseWrapper>
        </PlayPauseWrapper>
      </PadWrapper>
    );
  }

};

export default Instrument;