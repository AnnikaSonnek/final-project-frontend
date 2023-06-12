// In the styled components file (ProgressBarStyles.js)
import styled from 'styled-components/macro';

export const WrapCircles = styled.div`
  display: flex;
  min-height: 50vh;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem;
`;

export const StyledCircle = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0.5rem;
  border-radius: 50%;
  background: #FFCDB2;
  overflow: hidden;
  background-image: conic-gradient(#B5838D ${props => props.completedPercentage * 3.6}deg, #B5838D 0, #FFCDB2 0);

  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 115px;
    height: 115px;
    background: #000;
    border-radius: 50%;
    font-size: 1.85em;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.75);
  }
`
