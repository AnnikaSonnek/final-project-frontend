// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import styled from 'styled-components/macro';

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////// EXPORTED STYLES //////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const FormPostTodos = styled.form`
display: flex;
flex-direction: column;
align-items: center; 
justify-content: center; 
padding: 0 1em 1em 1em;`

export const CalendarContainer = styled.div`
position: relative;
width: 20px;
height: 20px;


@media (min-width: 668px) {
  width: 30px;
  height: 30px;
    }
`
export const IconButton = styled.button`
background-color: transparent;
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
font-size: 1.5rem;
border: none;
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
color: white;
cursor: pointer;
`
export const CategoryButton = styled.button`
width: 70px; 
border-radius: 12px;
border: none;
padding: 3px 10px;
margin-top: 10px;
cursor: pointer;
font-family:  "Quicksand", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;

`

export const PriorityButton = styled.button`
width: 70px; 
border-radius: 12px;
border: none;
padding: 3px 10px;
margin-top: 10px;
font-family:  "Quicksand", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;
`

export const NoDateButton = styled.button`
width: 100px; 
border-radius: 12px;
border: none;
background-color: transparent;
padding: 3px 10px;
cursor: pointer;
font-family:  "Quicksand", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;
`

export const FormWrapper = styled.div`
display: flex; 
width: 350px;
margin: auto; 
flex-direction: column;
border-radius: 12px;
background-color: #8DB48E;
`
export const AI = styled.p`
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
`
export const AIcontainer = styled.div`
display: flex;
flex-direction: row;
`
export const AcordionColapsed = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px 12px;

p {
  color: #212427;
  font-weight: 600;
  margin: 0;
  padding: 0;
}
`;

export const OuterWrapper = styled.div`
display: flex;
flex-direction: column;
padding-top: 1rem;

@media (min-width: 668px) {
  padding-top: 3rem;
    }

`
export const FormInput = styled.input`
background: #fafafa;
border: 1px solid #eeeeee;
padding: 12px;
border-radius: 12px;
height: 60px;
width: 330px;
font-family:  "Quicksand", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;
`;

export const CategoryButtonContainer = styled.div`
display: flex;
gap: 10px;
`;

export const PriorityButtonContainer = styled.div`
display: flex;
gap: 10px;
`;

export const Mockup = styled.img`
width: 200px;
`;

export const MockupContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
gap: 12px;
`;

export const PacmanContainer = styled.div`
position: fixed;
display: flex;
justify-content: center;
align-items: center;
position: relative;
width: 330px;
margin: 0 auto 0 auto;
img {
  width: 30px;
  margin: 4px;
}
`;

export const AddButton = styled.button`
border: none;
background-color: transparent;
color: #212427;
font-size: 30px;
cursor: pointer;
`;

export const SubmitButton = styled.button`
border-radius: 12px;
border: none;
padding: 5px 20px;
margin-top: 10px;
cursor: pointer;
font-family:  "Quicksand", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;

&:hover {
background: grey;
}
`;

export const DateButtonsContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 10px;
background-color: ffffff;
border-radius: 12px;
padding-top: 5px;
border: none;
`;
