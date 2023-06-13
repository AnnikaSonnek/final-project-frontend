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
width: 80px; 
`

export const PriorityButton = styled.button`
width: 80px; 
`
export const FormWrapper = styled.div`
display: flex; 
flex-direction: column;
justify-content: center;
align-items: center;
background-color: lightcoral;
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