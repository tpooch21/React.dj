import React, { Component } from 'react';
import styled from 'styled-components';
import { unhighlightBorders, highlightBorders, silencePreviousGains, startCurrentGains } from '../helpers/HighlightAndVolumeHelpers';
import { device } from '../../public/assets/sizes';

import InstrumentRow from '../components/InstrumentRow/InstrumentRow.jsx';
import Controllers from '../components/Controllers/Controllers.jsx';
import NoteSelections from '../components/NoteSelections/NoteSelections.jsx';

const Octavian = require('octavian');

const rowCreator = Array(4).fill(0);

class Instrument extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noteSelections: this.props.notes,
      row0OscillatorsAndGains: {},
      row1OscillatorsAndGains: {},
      row2OscillatorsAndGains: {},
      row3OscillatorsAndGains: {},
      playing: false,
      currentCol: 0,
      bpm: 500,
      showBPM: false
    };

    this.player = 0;
    this.refreshIntervalId = 0;
  }

  componentDidUpdate = (prevProps) => {
    console.log('Updating');
    if (prevProps.notes !== this.props.notes) {
      this.setState({
        noteSelections: this.props.notes
      });
    }
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

  playArrangement = () => {
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

  stopArrangement = () => {
    clearInterval(this.refreshIntervalId);
    const padRows = this.padRows.children;

    let previous;
    if (this.player === 0) {
      previous = 3;
    } else {
      previous = this.player - 1;
    }

    const allRows = [
      this.state.row0OscillatorsAndGains,
      this.state.row1OscillatorsAndGains,
      this.state.row2OscillatorsAndGains,
      this.state.row3OscillatorsAndGains
    ];

    // Silence all gains (only previous col will be playing)
    silencePreviousGains(allRows, previous);

    // Unhighlight all borders (only previous col will be highlighted)
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
      this.stopArrangement();
      this.setState({
        bpm: ms
      }, () => {
        this.playArrangement();
      });
    } else {
      this.setState({
        bpm: ms
      });
    }
  }

  resetInstrumentSettings = () => {
    if (this.state.playing) {
      alert('Please pause arrangement before resetting.');
      return;
    }

    this.setState({
      noteSelections: {},
      row0OscillatorsAndGains: {},
      row1OscillatorsAndGains: {},
      row2OscillatorsAndGains: {},
      row3OscillatorsAndGains: {},
      playing: false,
      currentCol: 0,
      bpm: 500,
      showBPM: false
    }, this.props.resetAll);
  }

  render() {

    return (
      <PadWrapper>
        <NoteSelections
          remove={this.props.remove}
          noteSelections={this.state.noteSelections} />
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
        <Controllers
          playing={this.state.playing}
          playArrangement={this.playArrangement}
          stopArrangement={this.stopArrangement}
          showBPM={this.state.showBPM}
          toggleBPMOptions={this.toggleBPMOptions}
          changeBPM={this.changeBPM}
          bpm={this.state.bpm}
          reset={this.resetInstrumentSettings}/>
      </PadWrapper>
    );
  }
};

const PadWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 50px;
  @media ${device.mobileS} {
    max-width: 1023px;
    flex-direction: column;
    width: 90%;
    height: auto;
    max-width: 1023px;
  };
  @media ${device.laptop} {
    flex-direction: row;
    width: auto;
    height: 400px;
  }
`;

const PadButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 26px;
  margin: 30px 0;
  background: linear-gradient(145deg, #1e1e1e, #191919);
  box-shadow:  6px 6px 12px #121212,
              -6px -6px 12px #262626;
  @media ${device.mobileS} {
    max-width: 1023px;
    width: 90%;
    flex-direction: row;
    height: 60vh;
  };
  @media ${device.laptop} {
    flex-direction: column;
    width: 550px;
    height: 400px;
  }
`;

export default Instrument;
