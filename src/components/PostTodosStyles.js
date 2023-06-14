import styled from 'styled-components/macro';

export const FormPostTodos = styled.form`
display: flex;
flex-direction: column;
align-items: center; 
justify-content: center; 
padding: 1rem;`

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
`

export const PriorityButton = styled.button`
width: 70px; 
border-radius: 12px;
border: none;
padding: 3px 10px;
margin-top: 10px;
`
export const FormWrapper = styled.div`
display: flex; 
width: 350px;
margin: auto; 
flex-direction: column;
justify-content: center;
border-radius: 12px;
align-items: center;
background-color: #8DB48E;
`
export const AI = styled.p`
display: flex;
justify-content: center;
align-items: center;
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

p {
  color: white;
}
`;
export const OuterWrapper = styled.div`
display: flex;
flex-direction: column;
`
export const FormInput = styled.input`
background: #fafafa;
border: 1px solid #eeeeee;
padding: 12px;
border-radius: 12px;
margin-top: 12px;
width: 330px;
`;

export const CategoryButtonContainer = styled.div`
display: flex;
gap: 10px
`;

export const PacmanContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;

img {
  width: 30px;
  margin: 4px;
}
`;

export const AddButton = styled.button`
border: none;
background-color: transparent;
color: white;
font-size: 30px;
`;