import React from 'react';
import ScaleForm from './ScaleForm.jsx';
import Instrument from './Instrument.jsx';
import styled from 'styled-components';
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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      currentNotes: {},
      firstOpenSpace: 0,
      filledSpaces: []
    };

    this.onNoteSelect = this.onNoteSelect.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  onNoteSelect(note) {
    // If 4 notes selected, don't add another note
    if (this.state.firstOpenSpace === undefined) {
      return;
    }

    this.state.currentNotes[this.state.firstOpenSpace] = note;
    this.state.filledSpaces.push(this.state.firstOpenSpace);
    let newOpenSpace;
    for (let i = 0; i < 4; i++) {
      if (this.state.filledSpaces.indexOf(i) === -1) {
        newOpenSpace = i;
        break;
      }
    }

    this.setState({
      currentNotes: this.state.currentNotes,
      firstOpenSpace: newOpenSpace,
      filledSpaces: this.state.filledSpaces
    });
  }

  removeNote(i) {
    delete this.state.currentNotes[i];
    debugger;

    let opening;
    if (this.state.firstOpenSpace === undefined) {
      opening = i;
    } else {
      opening = i < this.state.firstOpenSpace ? i : this.state.firstOpenSpace;
    }

    let spaceIndex = this.state.filledSpaces.indexOf(i);
    this.state.filledSpaces.splice(spaceIndex, 1);
    this.setState({
      currentNotes: this.state.currentNotes,
      firstOpenSpace: opening,
      filledSpaces: this.state.filledSpaces
    });
  }

  render() {
    return (
      <MainDiv>
        <MainTitle>REACT.dj</MainTitle>
        <ScaleForm selectNote={this.onNoteSelect}/>
        <Instrument parentState={this.state} remove={this.removeNote}></Instrument>
      </MainDiv>
    );
  }

};

export default App;