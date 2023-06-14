import styled from 'styled-components/macro'

export const DescriptionWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
max-width: 20rem;
`;

export const LevelsWrapper = styled.div`
padding-top: 5rem;
display: flex;
flex-direction: column;
justify-content: center; 
align-items: center;
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