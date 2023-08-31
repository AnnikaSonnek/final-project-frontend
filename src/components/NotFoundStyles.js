import styled from 'styled-components/macro';

export const NotFoundImgWrapper = styled.div`
  height: 145px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (min-width: 668px) {
    height: 200px;
  }
`;

export const NotFoundImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  gap: 1rem;
`