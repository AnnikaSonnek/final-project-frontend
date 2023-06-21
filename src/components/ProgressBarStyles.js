// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

// In the styled components file (ProgressBarStyles.js)
import styled from 'styled-components/macro';

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////// EXPORTED STYLES //////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const ProgressbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

export const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6rem;
  padding-bottom: 6rem;

  @media (min-width: 668px) {
    flex-direction: row;
    gap: 15rem;
    padding-top: 4rem;
  }
`;

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  gap: 1rem;

  @media (min-width: 668px) {
    width: 150px;
    height: 150px;
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
`;

export const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1rem 0.5rem;
  border-radius: 1rem;
`;

export const TextStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  margin: 0 auto;
  gap: 1rem;
  text-align: center;

  @media (min-width: 668px) {
    width: 150px;
    height: 150px;
  }
`;

export const TextStatsNumber = styled.p`
  font-size: 1.2rem;
  font-weight: 700;

  @media (min-width: 668px) {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export const TextStatsDesc = styled.p`
  font-size: 1rem;

  @media (min-width: 668px) {
    font-size: 1.2rem;
  }
`;
export const ImgWrapper = styled.div`
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;
