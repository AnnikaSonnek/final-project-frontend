import styled from 'styled-components/macro';

export const GlobalStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  width: 350px;
  margin: 10px auto;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  padding-left: 7px;
`;

export const TrashButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 7px;
`;
export const LabelFrontContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DisplayedTodo = styled.form`
  width: 350px;
  margin: 0 auto;
  border-radius: 12px;
  margin-bottom: 23px;
`;

export const FormInput = styled.input`
  background: #fafafa;
  border: 1px solid #eeeeee;
  padding: 12px;
  border-radius: 12px;
  margin-top: 7px;
  width: 330px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  background: #8DB48E;
  border-radius: 12px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    padding: 0 0 10px 0;
    font-size: 1rem
  }

  hr {
    width: 90%;
    border: 2px solid white;
    margin-bottom: 10px;
  }
`;

export const EditForm = styled.form`
  margin-bottom: 1rem;
  background: #4D724D;
  border-radius: 12px;
`;

export const EditSubmitButton = styled.button`
 border-radius: 12px;
 border: none;
 padding: 3px 20px;
 background-color: ffffff;
 margin-bottom: 7px;

  &:hover {
    background: grey;
  }
`;

export const DeleteButton = styled.button`
 border-radius: 12px;
 border: none;
 padding: 5px 20px;
 background-color: lightgrey;
`;

export const TrashButton = styled.button`
 border-radius: 12px;
 border: none;
 padding: 5px 10px 0 29px;
 background-color: transparent;

 img {
  width: 22px
 }
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const DisplayedPriority = styled.div`
 border-radius: 12px;
 border: none;
 scale: 0.8;
 padding: 5px 12px;
 background-color: #CDA384;
`;

export const DisplayedItemsContainer = styled.div`
display: flex;
`;

export const DisplayedCategory = styled.div`
 border-radius: 12px;
 border: none;
 scale: 0.8;
 padding: 5px 12px;
 background-color: #DFD78E;
`;

export const FormFooter = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
padding-right: 7px;

width: 100%;
`;

export const FlipCard = styled.div`
  background-color: transparent;
  width: 350px;
  perspective: 1000px;
`;

export const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  &.flipped {
    transform: rotateY(180deg);
  }
`;

export const FlipCardFront = styled.div`
  position: absolute;
  z-index: 1; //ADDED
  width: 100%;
  height: 300px;
  backface-visibility: hidden;
  color: black;
`;

export const FlipCardBack = styled.div`
  position: absolute;
  z-index: 1; //ADDED
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: dodgerblue;
  transform: rotateY(180deg);
`;

export const CategoryButton = styled.button`
width: 70px; 
border-radius: 12px;
border: none;
padding: 2px 10px;
`
export const PriorityButton = styled.button`
width: 70px; 
border-radius: 12px;
border: none;
padding: 2px 5px;
`
export const PriorityButtonContainer = styled.div`
display: flex;
gap: 10px;
margin-top: 7px;
margin-bottom: 3px;
`;

export const CategoryButtonContainer = styled.div`
display: flex;
gap: 10px;
margin-top: 7px;
`;

export const CheckboxInput = styled.input`
  &:checked + .flipcard .flipcard-inner {
    transform: rotateY(180deg);
  }
`;

export const FormButtonRegister = styled(EditSubmitButton)`
  background: #2c91d8;

  &:hover {
    background: #2c91a8;
  }
`;

export const SwitchForm = styled.div`
  &:before {
    content: " ";
    display: block;
    background: red;
  }
`;

export const LabelHighlight = styled.label`
margin: 18px 0 0 5px;
  img {
    width: 19px;
  }
`;

export const LabelFront = styled.label`
margin-top: 10px;
  img {
    width: 20px;
  }
`;

export const LoginInput = styled.input`
  border: none;
  background-color: yellow;
  border-radius: 12px;
  height: 40px;
  width: 100%;
`;

export const TodoContainer = styled.div`
  margin-bottom: 11rem;
`;

export const CalendarContainer = styled.div`
  position: relative;
  z-index: 9999;
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-bottom: 7px;

@media (min-width: 668px) {
  width: 30px;
  height: 30px;
} `

export const NoDateButton = styled.button`
width: 70px; 
border-radius: 12px;
border: none;
background-color: transparent;
margin-top: 14px;
padding-left: 18px;

img {
width: 25px; 
height: auto; 
}
`

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  -webkit-appearance: none;
  height: 19px;
  width: 19px;
  background-color: #8DB48E;
  border-radius: 5px;
  border: 2px solid #000000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  margin-top: 7px;

  &:after {
    content: "\\2713"; /* Unicode character for checkmark */
    font-size: 12px;
    color: white;
    display: none;
  }

  &:hover {
    background-color: #4D724D;
  }

  &:checked {
    background-color: #4D724D;

    &:after {
      display: block;
    }
  }
`;

export const IconButton = styled.button`
background-color: transparent;
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
font-size: 1.1rem;
border: none;
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
color: white;
cursor: pointer;
margin-top: 8px;
`