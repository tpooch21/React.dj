import React from 'react';
import styled from 'styled-components';
import {ControllerPlay} from '@styled-icons/entypo/ControllerPlay';
import {Pause} from '@styled-icons/foundation/Pause';

import InstrumentRow from './InstrumentRow/InstrumentRow.jsx';

const Octavian = require('octavian');

class Instrument extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noteSelections: this.props.parentState.currentNotes,
      row0OscillatorsAndGains: {},
      row1OscillatorsAndGains: {},
      row2OscillatorsAndGains: {},
      row3OscillatorsAndGains: {},
      row0Oscillators: {},
      row0GainNodes: {},
      row1Oscillators: {},
      row1GainNodes: {},
      row2Oscillators: {},
      row2GainNodes: {},
      row3Oscillators: {},
      row3GainNodes: {},
      playing: false,
      currentCol: 0,
      bpm: 500,
      showBPM: false
    };

    this.player = 0;
    this.refreshIntervalId = 0;

  }

  createOscillator = (row, col) => {
    // If there's no note selection for this row, don't add an oscillator
    if (!this.state.noteSelections[row]) {
      return;
    }

    // Create an oscillator and a gain node
    const osc = context.createOscillator();
    const gainNode = context.createGain();
    gainNode.connect(context.destination);
    gainNode.gain.value = 0;

    // Create a note based on the note for the row, and assign the oscillator's frequency to that note's frequency
    const note = new Octavian.Note(this.state.noteSelections[row]);
    const freq = note.frequency;
    osc.frequency.value = freq;

    // Connect the oscillator to the gain node and start it (will be silent, because current gain value (essentially volume) is 0)
    osc.connect(gainNode);
    osc.start();

    // Add oscillator and gain node to appropriate row and column in state
    const rowToUpdate = `row${row}OscillatorsAndGains`;
    const updatedRow = {
      ...this.state[rowToUpdate],
      [col]: [osc, gainNode]
    };

    this.setState({
      [rowToUpdate]: updatedRow
    });
  }

  removeOscillator = (row, col) => {

    let gainToChange;

    // Disconnect and remove oscillators, and related gain nodes
    const rowToUpdate = `row${row}OscillatorsAndGains`;

    // Disconnect oscillator, then remove gain and oscillator from row
    const currentOscillator = this.state[rowToUpdate][col][0];
    currentOscillator.disconnect();
    const updatedRow = {
      ...this.state[rowToUpdate]
    };

    delete updatedRow[col];

    this.setState({
      [rowToUpdate]: updatedRow
    });
  }

  play = () => {
    this.player = 0;

    const crankIt = (i) => {
      // Stop gains from previous column
      const padRows = this.padRows.children;

      let previous;
      if (i === 0) {
        previous = 3;
      } else {
        previous = i - 1;
      }

      // Unhighlight borders of pads in column that was previously playing
      unhighlightBorders(padRows, previous);

      const allRows = [
        this.state.row0OscillatorsAndGains,
        this.state.row1OscillatorsAndGains,
        this.state.row2OscillatorsAndGains,
        this.state.row3OscillatorsAndGains
      ];

      // Silence gains in previous column
      silencePreviousGains(allRows, previous);

      // Start gains in current column
      startCurrentGains(allRows, i);

      // Turn button borders teal when column is being played
      highlightBorders(padRows, i);

      this.player++;
      if (this.player === 4) {
        this.player = 0;
      }
    };

    this.refreshIntervalId = setInterval(() => {
      crankIt(this.player);
    }, this.state.bpm);

    this.setState({
      playing: true
    });
  }

  stop = () => {
    clearInterval(this.refreshIntervalId);
    const padRows = this.padRows.children;

    let previous;
    if (this.player === 0) {
      previous = 3;
    } else {
      previous = this.player - 1;
    }

    for (var i = 0; i < 4; i++) {
      var gain1 = this.state.row0GainNodes[i];
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

    unhighlightBorders(padRows, previous);

    this.setState({
      playing: false
    });
  }

  toggleBPMOptions = () => {
    this.setState({
      showBPM: !this.state.showBPM
    });
  }

  changeBPM = (ms) => {
    if (this.state.playing) {
      this.stop();
      this.setState({
        bpm: ms
      }, () => {
        this.play();
      });
    } else {
      this.setState({
        bpm: ms
      });
    }

  }

  render() {
    const rowCreator = Array(4).fill(0);

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
        <PadButtonsWrapper ref={(inputEl) => {this.padRows = inputEl}}>
          {rowCreator.map((_, i) => {
            return <InstrumentRow
                      key={i}
                      rowID={i}
                      removeOsc={this.removeOscillator}
                      createOsc={this.createOscillator}
                      rowOscillators={this.state[`row${i}OscillatorsAndGains`]}/>
          })}
        </PadButtonsWrapper>
        <PlayPauseWrapper>
          <PlayWrapper playing={this.state.playing} onClick={this.play}>
            <ControllerIcon></ControllerIcon>
          </PlayWrapper>
          <PauseWrapper playing={this.state.playing} onClick={this.stop}>
            <PauseIcon></PauseIcon>
          </PauseWrapper>
        <BPMButton clicked={this.state.showBPM} onClick={this.toggleBPMOptions}>BPM</BPMButton>
        <BPMMenu show={this.state.showBPM}>
          <BPMOption onClick={() => this.changeBPM(375)}>160</BPMOption>
          <BPMOption onClick={() => this.changeBPM(430)}>140</BPMOption>
          <BPMOption onClick={() => this.changeBPM(500)}>120</BPMOption>
          <BPMOption onClick={() => this.changeBPM(600)}>100</BPMOption>
          <BPMOption onClick={() => this.changeBPM(750)}>80</BPMOption>
        </BPMMenu>
        </PlayPauseWrapper>
      </PadWrapper>
    );
  }

};

const unhighlightBorders = (padRows, col) => {
  const pads = [...padRows];
  pads.forEach(row => {
    const padToUnhighlight = row.children[col];
    padToUnhighlight.style.borderTopColor = '#757575';
    padToUnhighlight.style.borderLeftColor = '#757575';
    padToUnhighlight.style.borderRightColor = 'rgb(118, 118, 118)';
    padToUnhighlight.style.borderBottomColor = 'rgb(118, 118, 118)';
  });
};

const highlightBorders = (padRows, col) => {
  const pads = [...padRows];
  pads.forEach(row => {
    const padToHighlight = row.children[col];
    padToHighlight.style.borderColor = '#00ffff';
  });
};

const silencePreviousGains = (rows, col) => { // {0: [osc, gain]}
  rows.forEach(row => {
    if (row[col]) {
      const gain = row[col][1];
      gain.gain.value = 0;
    }
  });
};

const startCurrentGains = (rows, col) => {
  rows.forEach(row => {
    if (row[col]) {
      const gain = row[col][1];
      gain.gain.value = .25;
    }
  });
};

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
  margin-bottom: 20px
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

const BPMButton = styled.button`
  height: 25px;
  font-family: Muli, sans-serif;
  color: ${props => props.clicked ? '#f28c26' : 'white'};
  border-radius: 11px;
  background: linear-gradient(145deg, #1e1e1e, #191919);
  box-shadow:  5px 5px 10px #151515,
             -5px -5px 10px #232323;
  margin-left: 20px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const BPMMenu = styled.div`
  height: 125px;
  width: 45px;
  display: ${props => props.show ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BPMOption = styled.button`
  height: 23px;
  width: 42px;
  font-family: Muli, sans-serif;
  color: white;
  border-radius: 11px;
  background: linear-gradient(145deg, #1e1e1e, #191919);
  box-shadow:  5px 5px 10px #151515,
             -5px -5px 10px #232323;
  margin-left: 20px;
  margin-bottom: 5px;
  &:hover {
    background: #f28c26;
    color: black;
  }
  cursor: pointer;
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
  @media (max-width: 401px) {
    width: 90%;
  }
`;


export default Instrument;
