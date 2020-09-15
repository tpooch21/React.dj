import React, { useEffect } from 'react';
import styled from 'styled-components';

const arrowDirectionModal = props => {
  useEffect(() => {
    console.log(timer);
    clearTimeout(timer);
  }, []);

  setTimeout(() => {
    props.toggleModal();
  }, 2000);

  return (
    <Modal>
      Arrangement will play from left to right
    </Modal>
  );
};

const Modal = styled.div`
  width: 330px;
  height: 100px;
  position: fixed;
  top: 35%;
  left: auto;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 100px;
  border-radius: 5px;
  color: white;
  font-family: inherit;
`;

export default arrowDirectionModal;