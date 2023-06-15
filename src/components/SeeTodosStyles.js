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
  display: grid;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @media (min-width: 720px) {
    align-items: center;
    justify-content: center;
    grid-template-columns: ${(props) => (props.showGap ? '1fr 1fr' : '1fr')};
    gap: ${(props) => (props.showGap ? '16px' : '0')};
  }

 @media (min-width: 1024px) {
  grid-template-columns: 1fr 1fr 1fr;
 }
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
    font-size: 1rem;
    color: #212427;
  }

  hr {
    width: 90%;
    border: 2px solid #212427;
    margin-bottom: 5px;
    margin-bottom: 5px;
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
 font-family: Quicksand;
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
    width: 22px;
    transition: transform 0.2s; /* Add a transition effect to the image */
  }

  &:active img {
    transform: translateY(1px); /* Apply a transform on button press */
    opacity: 0.7; /* Reduce the opacity to make the image lighter */
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

p {
  color: #212427;
}
`;
export const DisplayedDeadlineContainer = styled.div`
display: flex;
margin-bottom: 0;

p {
  color: #212427;
  margin-bottom: 0;
}
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
padding-right: 10px;
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
  height: 100%;
  backface-visibility: hidden;
  color: #212427;
`;

export const FlipCardBack = styled.div`
  position: absolute;
  z-index: 1; //ADDED
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

export const CategoryButton = styled.button`
width: 70px; 
border-radius: 12px;
border: none;
font-family: Quicksand;
padding: 2px 10px;
`
export const PriorityButton = styled.button`
width: 70px; 
border-radius: 12px;
font-family: Quicksand;
border: none;
padding: 2px 5px;
`
export const PriorityButtonContainer = styled.div`
display: flex;
gap: 10px;
margin-top: 7px;

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
  margin-bottom: 11.5rem;
`;

export const TransparentDiv = styled.div`
  background-color: transparent;
  height: 25px;
`;

export const CalendarContainer = styled.div`
  position: relative;
  z-index: 9000;
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 50px;
  width: 100%;
  padding-left: 30px;
  height: 20px;
  gap: 15px;
  margin-bottom: 5px;

@media (min-width: 668px) {
  width: 30px;
  height: 30px;
} `

export const NoDateButton = styled.button`
border-radius: 12px;
border: none;
font-family: Quicksand;
white-space: nowrap;
margin-top: 4px;
padding: 2px 10px 2px 10px;`

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  -webkit-appearance: none;
  height: 19px;
  width: 19px;
  background-color: #8DB48E;
  border-radius: 5px;
  border: 2px solid #212427;
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
font-size: 1.2rem;
border: none;
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
color: white;
cursor: pointer;
`