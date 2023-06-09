import styled from 'styled-components/macro';

export const WrapCircles = styled.div`
  display: flex;
  min-height: 100vh;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
`;

export const Circle = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0.5rem;
  border-radius: 50%;
  background: #FFCDB2;
  overflow: hidden;

  &.per-25 {
    background-image: conic-gradient(#B5838D 25%, #FFCDB2 0);
  }
  &.per-50 {
    background-image: conic-gradient(#B5838D 50%, #FFCDB2 0);
  }
  &.per-75 {
    background-image: conic-gradient(#B5838D 75%, #FFCDB2 0);
  }
  &.per-100 {
    background-image: conic-gradient(#B5838D 100%, #FFCDB2 0);
  }

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