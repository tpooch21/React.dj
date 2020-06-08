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
  box-shadow:  6px 6px 12px #131313,
  -6px -6px 12px #252525;
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
  margin-left: 20px;
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
      rowGainNodes: {},
      row1Oscillators: {},
      row1GainNodes: {},
      row2Oscillators: {},
      row2GainNodes: {},
      row3Oscillators: {},
      row3GainNodes: {},
      playing: false,
      currentCol: 0
    };

    this.player = 0;
    this.refreshIntervalId = 0;

    this.createOscillator = this.createOscillator.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  }

  createOscillator(row, col) {
    if (this.state.noteSelections[row]) {
      var osc = context.createOscillator();
      var gainNode = context.createGain();
      gainNode.connect(context.destination);
      gainNode.gain.value = 0;

      var note = new Octavian.Note(this.state.noteSelections[row]);
      var freq = note.frequency;
      osc.frequency.value = freq;

      osc.connect(gainNode);
      osc.start();

      var rowToChange;
      var gainToChange;
      if (row === 0) {
        this.state.rowOscillators[col] = osc;
        this.state.rowGainNodes[col] = gainNode;
        rowToChange = 'rowOscillators';
        gainToChange = 'rowGainNodes';
      } else if (row === 1) {
        this.state.row1Oscillators[col] = osc;
        this.state.row1GainNodes[col] = gainNode;
        rowToChange = 'row1Oscillators';
        gainToChange = 'row1GainNodes';
      } else if (row === 2) {
        this.state.row2Oscillators[col] = osc;
        this.state.row2GainNodes[col] = gainNode;
        rowToChange = 'row2Oscillators';
        gainToChange = 'row2GainNodes';
      } else {
        this.state.row3Oscillators[col] = osc;
        this.state.row3GainNodes[col] = gainNode;
        rowToChange = 'row3Oscillators';
        gainToChange = 'row3GainNodes';
      };

      this.setState({
        [rowToChange]: this.state[rowToChange],
        [gainToChange]: this.state[gainToChange]
      });

    }
  }

  play() {
    this.player = 0;

    const crankIt = (i) => {
      // Stop gains from previous column
      var padRows = document.getElementsByClassName('sc-fzqNJr gKNPdH');

      let previous;
      if (i === 0) {
        previous = 3;
      } else {
        previous = i - 1;
      }

      // Unhighlight borders of buttons that are stopped
      padRows[0].children[previous].style.borderTopColor = '#757575';
      padRows[0].children[previous].style.borderLeftColor = '#757575';
      padRows[0].children[previous].style.borderRightColor = 'rgb(118, 118, 118)';
      padRows[0].children[previous].style.borderBottomColor = 'rgb(118, 118, 118)';
      padRows[1].children[previous].style.borderTopColor = '#757575';
      padRows[1].children[previous].style.borderLeftColor = '#757575';
      padRows[1].children[previous].style.borderRightColor = 'rgb(118, 118, 118)';
      padRows[1].children[previous].style.borderBottomColor = 'rgb(118, 118, 118)';
      padRows[2].children[previous].style.borderTopColor = '#757575';
      padRows[2].children[previous].style.borderLeftColor = '#757575';
      padRows[2].children[previous].style.borderRightColor = 'rgb(118, 118, 118)';
      padRows[2].children[previous].style.borderBottomColor = 'rgb(118, 118, 118)';
      padRows[3].children[previous].style.borderTopColor = '#757575';
      padRows[3].children[previous].style.borderLeftColor = '#757575';
      padRows[3].children[previous].style.borderRightColor = 'rgb(118, 118, 118)';
      padRows[3].children[previous].style.borderBottomColor = 'rgb(118, 118, 118)';

      var prevGain1 = this.state.rowGainNodes[previous];
      var prevGain2 = this.state.row1GainNodes[previous];
      var prevGain3 = this.state.row2GainNodes[previous];
      var prevGain4 = this.state.row3GainNodes[previous];

      if (prevGain1) {
        prevGain1.gain.value = 0;
      }
      if (prevGain2) {
        prevGain2.gain.value = 0;
      }
      if (prevGain3) {
        prevGain3.gain.value = 0;
      }
      if (prevGain4) {
        prevGain4.gain.value = 0;
      }

      // Start new gains
      var gain1 = this.state.rowGainNodes[i];
      var gain2 = this.state.row1GainNodes[i];
      var gain3 = this.state.row2GainNodes[i];
      var gain4 = this.state.row3GainNodes[i];

      if (gain1) {
        gain1.gain.value = .25;
      }
      if (gain2) {
        gain2.gain.value = .25;
      }
      if (gain3) {
        gain3.gain.value = .25;
      }
      if (gain4) {
        gain4.gain.value = .25;
      }

      // Turn button borders teal when column is being played
      padRows[0].children[this.player].style.borderColor = '#00ffff';
      padRows[1].children[this.player].style.borderColor = '#00ffff';
      padRows[2].children[this.player].style.borderColor = '#00ffff';
      padRows[3].children[this.player].style.borderColor = '#00ffff';

      this.player++;
      if (this.player === 4) {
        this.player = 0;
      }
    };

    this.refreshIntervalId = setInterval(() => {
      crankIt(this.player);
    }, 500);

    this.setState({
      playing: true
    });
  }

  stop() {
    clearInterval(this.refreshIntervalId);

    for (var i = 0; i < 4; i++) {
      var gain1 = this.state.rowGainNodes[i];
      var gain2 = this.state.row1GainNodes[i];
      var gain3 = this.state.row2GainNodes[i];
      var gain4 = this.state.row3GainNodes[i];

      if (gain1) {
        gain1.gain.value = 0;
      }
      if (gain2) {
        gain2.gain.value = 0;
      }
      if (gain3) {
        gain3.gain.value = 0;
      }
      if (gain4) {
        gain4.gain.value = 0;
      }
    }

    this.setState({
      playing: false
    });
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
              return <PadButton id={num} selected={selected} onClick={() => this.createOscillator(3, num)}></PadButton>
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

// box-shadow:  4px 4px 8px #002aff,
// -4px -4px 8px #3355ff;