import styled from 'styled-components/macro'

export const DescriptionWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
max-width: 20rem;
gap: 1.5rem;
`;

export const LevelsWrapper = styled.div`
padding-top: 2rem;
display: flex;
flex-direction: column;
justify-content: center; 
align-items: center;
padding-bottom: 1rem;
`

export const Paragraph = styled.p`
text-align: ${(props) => (props.center ? 'center' : '')};;
line-height: 1.6;
`

export const PrizeImg = styled.img`
width: 60px;
`

export const ImgContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
export const ImgBackgroundContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 1rem; 
border-radius: 50px;
border: dotted 4px #5A5A5A;
`