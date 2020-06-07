import React from 'react';
import styled from 'styled-components';
const Octavian = require('octavian');

const PadWrapper = styled.div`
  width: 50%;
  height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
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
  background: linear-gradient(145deg, #1e1e1e, #191919);
  box-shadow:  8px 8px 16px #101010,
            -8px -8px 16px #282828;
  cursor: pointer;
`;

class Instrument extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noteSelections: this.props.parentState.currentNotes,
      row1Oscillators: [],
      row2Oscillators: [],
      row3Oscillators: [],
      row4Oscillators: []
    };

    this.createOscillator = this.createOscillator.bind(this);
    this.play = this.play.bind(this);
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
      osc.start();
      // this.state.row1Oscillators.push(osc);
    }
  }

  play() {
    debugger;
    for (var i = 0; i < this.state.row1Oscillators.length; i++) {
      var oscillator = this.state.row1Oscillators[i];
      setTimeout(() => {oscillator.stop()}, 1000);
      oscillator.start()
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
              return <PadButton onClick={() => this.createOscillator(0, num)}></PadButton>
            })}
          </PadButtonRow>
          <PadButtonRow>
            {[0, 1, 2, 3].map(num => {
                return <PadButton onClick={() => this.createOscillator(1, num)}></PadButton>
              })}
          </PadButtonRow>
          <PadButtonRow>
            {[0, 1, 2, 3].map(num => {
                return <PadButton onClick={() => this.createOscillator(2, num)}></PadButton>
              })}
          </PadButtonRow>
          <PadButtonRow>
            {[0, 1, 2, 3].map(num => {
                return <PadButton onClick={() => this.createOscillator(3, num)}></PadButton>
              })}
          </PadButtonRow>
        </PadButtonsWrapper>
      </PadWrapper>
    );
  }

};

export default Instrument;