import React from 'react';

import styled from 'styled-components';
import '../../../styles/globals.css';

const RectWrapper = styled.button`
  background: ${props => (props.$primary ? '#FE4C40' : 'white')};
  color: ${props => (props.$primary ? 'white' : 'black')};
  border: ${props => (props.$primary ? 'none' : '1.5px solid #eee')};
  width: ${props => props.width};
  height: 25px;
  text-align: center;
  font-size: 12px;
  border-radius: 3px;
  margin: 1px;
`;

function RectButton({ children, width, $primary, onClick }) {
  if (!$primary) {
    return <RectWrapper width={width}>{children}</RectWrapper>;
  }
  return (
    <RectWrapper width={width} $primary onClick={onClick}>
      {children}
    </RectWrapper>
  );
}
export default RectButton;
