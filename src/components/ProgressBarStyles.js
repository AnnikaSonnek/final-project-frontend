// In the styled components file (ProgressBarStyles.js)
import styled from 'styled-components/macro';

export const WrapCircles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem;
`;

export const StyledCircleProgress = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0.5rem;
  border-radius: 50%;
  background: #FFCDB2;
  overflow: hidden;
  background-image: conic-gradient(#B5838D ${(props) => props.completedPercentage * 3.6}deg, #B5838D 0, #FFCDB2 0);

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
export const Donut = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0.5rem;
  border-radius: 50%;
  background: #FFCDB2;
  overflow: hidden;
  background-image: conic-gradient(
    #B5838D 0deg ${(props) => props.jobPercentage}deg,
    #B5B883 ${(props) => props.jobPercentage}deg ${(props) => props.jobPercentage + props.schoolPercentage}deg,
    #838DB5 ${(props) => props.jobPercentage + props.schoolPercentage}deg ${(props) => props.jobPercentage + props.schoolPercentage + props.familyPercentage}deg,
    #83B58D ${(props) => props.jobPercentage + props.schoolPercentage + props.familyPercentage}deg ${(props) => props.jobPercentage + props.schoolPercentage + props.familyPercentage + props.hobbiesPercentage}deg,
    transparent ${(props) => props.jobPercentage + props.schoolPercentage + props.familyPercentage + props.hobbiesPercentage}deg 360deg
  );

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
`;

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

export const LabelContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 0.5rem;`