import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { ArrowheadRight } from '@styled-icons/evaicons-solid/ArrowheadRight';
import { ArrowheadDownOutline } from '@styled-icons/evaicons-outline/ArrowheadDownOutline';

class ArrowRightModal extends Component {
  shouldComponentUpdate(prevProps) {
    if (prevProps.vertical !== this.props.vertical || prevProps.show !== this.props.show) {
      return true;
    }
    return false;
  }

  render() {
    const arrow = this.props.vertical ? <ArrowDownIcon /> : <ArrowRightIcon />;
    const message = this.props.vertical ? 'Arrangement will play from top to bottom' : 'Arrangement will play from left to right';

    return (
      <Modal
        vertical={this.props.vertical}
        show={this.props.show}>
        <DirectionMessage
          vertical={this.props.vertical}
          show={this.props.show}>{message}</DirectionMessage>
        {arrow}
      </Modal>
    );
  }
};

const fadeIn = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0);
    color: rgba(256, 256, 256, 0);
  }

  to {
    background-color: rgba(0, 0, 0, 0.3);
    color: rgba(256, 256, 256, 1);
  }
`;

const fadeOut = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0.3);
    color: rgba(256, 256, 256, 1);
  }

  to {
    background-color: rgba(0, 0, 0, 0);
    color: rgba(256, 256, 256, 0);
  }
`;


const Modal = styled.div`
  width: ${props => props.vertical ? '50%' : '330px'};
  height: ${props => props.vertical ? '200px' : '100px'};
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 35%;
  left: auto;
  background-color: rgba(0, 0, 0, 0.3);
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  animation: ${props => props.show ? fadeIn : fadeOut} 0.5s linear;
  transition: visibility 0.5s linear;
  border-radius: 10px;
  color: rgba(256, 256, 256, 1);
`;

const DirectionMessage = styled.p`
  font-size: ${props => props.vertical ? '24px' : '18px'};
  font-family: inherit;
  margin: 0;
`;

const ArrowRightIcon = styled(ArrowheadRight)`
  width: 30%;
  height: 50%;
`;

const ArrowDownIcon = styled(ArrowheadDownOutline)`
  width: 30%;
  height: 30%;
`;

export default ArrowRightModal;