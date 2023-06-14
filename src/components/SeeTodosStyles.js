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
  height: 400px;
  margin: 50px auto;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  margin-top: 12px;
  width: 330px;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  background: #8DB48E;
  border-radius: 12px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EditForm = styled.form`
  margin-bottom: 1rem;
  background: #4D724D;
  border-radius: 12px;
`;

export const EditSubmitButton = styled.button`
 border-radius: 12px;
 border: none;
 padding: 5px 20px;
 background-color: lightgrey;

  &:hover {
    background: grey;
  }
`;

export const DeleteButton = styled.button`
 border-radius: 12px;
 border: none;
 padding: 5px 20px;
 background-color: lightgrey;

  &:hover {
    background: grey;
  }
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const FormFooter = styled.div`
  text-align: center;
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
  color: #db3a34;
`;

export const LoginInput = styled.input`
  border: none;
  background-color: yellow;
  border-radius: 12px;
  height: 40px;
  width: 100%;
`;

export const TodoContainer = styled.div`
  margin-bottom: 13rem;
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

@media (min-width: 668px) {
  width: 30px;
  height: 30px;
} `

export const NoDeadlineButton = styled.button`
width: 80px; 
  /* Define your button styles here */
  /* Add styles for the green button when there is no deadline */
  background-color: ${(props) => (props.noDeadline ? 'green' : 'default-color')};
  /* Add other styles as needed */
`;