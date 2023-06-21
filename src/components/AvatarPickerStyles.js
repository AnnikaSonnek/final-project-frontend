// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import styled from 'styled-components/macro'

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////// EXPORTED STYLES //////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const AvatarPickerOuterWrapper = styled.div`
display: flex;
flex-direction: column;
padding-bottom: 2rem; 

@media (min-width: 668px) {
  align-items: center;
  padding-bottom: 4rem; 
}
`

export const AvatarPickerInnerWrapper = styled.div`
display: flex;
flex-direction: column;
background-color: rgb(141, 180, 142);
border-radius: 12px;
width: 100%;

@media (min-width: 668px) {
  max-width: 690px;
}
`

export const AvatarPictures = styled.img`
  width: 50px;
  border: solid  4px #4D724D;
  border-radius: 50px;
`;

export const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const AvatarContainer = styled.label`
  display: flex;
  width: 65px;
  align-items: center;
  cursor: pointer;
  border: 2px solid ${(props) => (props.selected ? '#DB3A34' : 'transparent')};
  border-radius: 50px;
  padding: 5px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.09);
  }
`;

export const AddButton = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  font-size: 30px;
`;

export const AcordionColapsed = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1.2rem;
  border-radius: 12px;

  p {
    color: white;
    margin: 0;
    padding: 0;
  }
`;

export const ContainerAllAvatars = styled.div`
display: flex;
flex-direction: row;
justify-content: center; 
align-items: center; 
gap: 3rem; 
`

export const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center; 
align-items: center;
padding-bottom: 1rem;
`