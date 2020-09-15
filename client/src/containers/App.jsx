import React, { Component } from 'react';
import ScaleForm from '../components/Scale/ScaleForm/ScaleForm.jsx';
import Instrument from './Instrument.jsx';
import ArrowDirectionModal from '../components/ArrowDirectionModal/ArrowDirectionModal.jsx';
import styled from 'styled-components';
import {Github} from '@styled-icons/boxicons-logos/Github';
import { device } from '../../public/assets/sizes';
import $ from 'jquery';

const Octavian = require('octavian');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: 'A',
      scale: 'Major',
      octave: '3',
      notesInScale: [],
      scaleSelected: false,
      playing: false,
      currentNotes: {},
      firstOpenSpace: 0,
      filledSpaces: [],
      displayModal: false,
      playVertically: false,
      windowSize: null
    };

  }

  // Set up resize listener, and determine which modal to display initially
  componentDidMount = () => {
    window.addEventListener('resize', this.toggleArrangementDirection);
    this.toggleArrangementDirection();
  }

  componentDidUpdate = (prevProps, prevState) => {
    let sizeCrossedThreshold;

    // If previous window size was not null, see if the resize crossed the threshold
    if (prevState.windowSize) {
      if (prevState.windowSize === this.state.windowSize) {
        return;
      }
      sizeCrossedThreshold = (prevState.windowSize > 1023 && this.state.windowSize <= 1023 || prevState.windowSize <= 1023 && this.state.windowSize > 1023);
    }

    // If previous window size is null (as on initial load), or resize crossed threhold, display appropriate modal
    if (!prevState.windowSize || sizeCrossedThreshold) {
      this.setState({
        displayModal: true
      }, () => {
        setTimeout(() => {
          this.setState({
            displayModal: false
          })
        }, 3000)});
    }
  }

  onFormSelection = (e, type) => {
    this.setState({
      [type]: e.target.value
    });
  }

  getNotes = () => {
    let scaleName = `${this.state.note}${this.state.scale}`;
    $.ajax({
      url: `scale/${scaleName}/notes`,
      method: 'GET',
      success: (data) => {
        let notesInOctave = [];
        let currentOctave = this.state.octave;

        data.notes.forEach((note, i) => {
          if (note.indexOf('C') > -1 && i !== 0) {
            currentOctave++;
          }
          notesInOctave.push(`${note}${currentOctave}`);
        });

        this.setState({
          notesInScale: notesInOctave,
          scaleSelected: true
        });
      },
      error: () => {
        console.log('Error requesting data from server');
      }
    });
  }

  // Should this be in instrument?
  onNoteSelect = (note) => {
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

  // Should this be in instrument?
  removeNote = (i) => {
    delete this.state.currentNotes[i];

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

  closeModal = () => {
    this.setState({
      displayModal: false
    });
  }

  toggleArrangementDirection = () => {
    this.setState({
      playVertically: window.innerWidth <= 1023,
      windowSize: window.innerWidth
    });
  }

  render() {

    return (
      <MainDiv>
        {<ArrowDirectionModal
          closeModal={this.closeModal}
          vertical={this.state.playVertically}
          show={this.state.displayModal}/>}
        <MainTitle><em>REACT.dj</em></MainTitle>
        <ScaleForm
          change={this.onFormSelection}
          getNotes={this.getNotes}
          selected={this.state.scaleSelected}
          notes={this.state.notesInScale}
          selectNote={this.onNoteSelect}
          currentNote={this.state.note}
          currentScale={this.state.scale}
          currentOctave={this.state.octave}/>
        <Instrument parentState={this.state} remove={this.removeNote}></Instrument>
        <GithubWrapper>
          <GithubLink href="https://github.com/tpooch21/React.dj" target="_blank">
            <GithubIcon></GithubIcon>
          </GithubLink>
          <LinkMessage>View Code and Demo</LinkMessage>
        </GithubWrapper>
      </MainDiv>
    );
  }

};

const MainDiv = styled.div`
  background-color: #1c1c1c;
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Overpass, sans-serif;
`;

const MainTitle = styled.h1`
  color: white;
  margin-top: 45px;
  line-height: 25px;
  font-family: inherit;
  font-weight: 900;
  text-decoration: underline;
  font-size: 3em;
`;

const GithubIcon = styled(Github)`
  color: white;
  height: 50px;
  width 50px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  &:hover {
    height: 60px;
    width: 60px;
  }
`;

const GithubWrapper = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GithubLink = styled.a`
  cursor: pointer;
  height: 50px;
  width: 50px;
  position: relative;
  margin-bottom: 5px;
  &:hover {
    height: 60px;
    width: 60px;
    margin-bottom: -5px;
  };
`;

const LinkMessage = styled.h5`
  color: white;
  font-family: inherit;
  font-size: 10px;
  margin-top: 10px;
`;

export default App;