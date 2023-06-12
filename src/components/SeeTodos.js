/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //
import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendarDateFill } from 'react-icons/bs';
import { todos } from '../reducers/todos';
import { user } from '../reducers/user';
import { API_URL } from '../utils/urls';
import { GlobalStyle, Wrapper, DisplayedTodo, TodoContainer, CalendarContainer, FormInput, LabelHighlight, FormGroup, EditSubmitButton, FormHeader, FormFooter, FlipCard, FlipCardBack, FlipCardInner, FlipCardFront } from './SeeTodosStyles';
import { CategoryButton, PriorityButton, IconButton } from './PostTodosStyles';
// //////////////////////////////////////////////////////////////////////// //
// //////////////// CUSTOM INPUT FOR DATEPICKER /////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //


const CustomInput = forwardRef(({ onClick }, ref) => (
  <IconButton onClick={onClick} ref={ref} type="button">
    <BsCalendarDateFill fill="black" />
  </IconButton>
));



// //////////////////////////////////////////////////////////////////////// //
// //////////////////////// SEE TODOS-COMPONENT /////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //
export const SeeTodos = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken)
  const todoList = useSelector((store) => store.todos.items); // We fint the thoughts in the store and set them to the variable
  const userId = useSelector((store) => store.user.userId); // Get the userID.
  const checkedtasks = useSelector((store) => store.user.checkedTasks)

// //////////////////////// STATE VARIABLES /////////////////////////// //
  const [messageToDelete, setMessageToDelete] = useState(null)
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedDeadline, setSelectedDeadline] = useState(null);
  const [updatedTodo, setUpdatedTodo] = useState({});


// //////////////////////////////////////////////////////////////////////// //
// //////////////////////////// FETCH FUNCTIONS /////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //


  // /////////////////// USE EFFECT FETCH ALL TODOS ///////////////// //
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken // the accessToken is used for getting all the todos and display them for the user
      }
    };

    fetch(API_URL('todos'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // If the fetch is successful the error is set to null and the items (which is the list of todos) is set to the response from the database, displaying all todos.
          dispatch(todos.actions.setError(null));
          dispatch(todos.actions.setItems(data.response));
        } else {
          // If the fetch is unsuccessful the error is set to the response that is returned from the server and the items(todoslist) is set to be an empty array.
          dispatch(todos.actions.setError(data.response));
          dispatch(todos.actions.setItems([]));
        }
      });
  })

 // /////////////////// DELETE TODO ///////////////// //
  const DeleteMessage = (deleteID) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      } // There is no need to send a when calling the likes-function
    };

    fetch(API_URL(`todos/${deleteID}`), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessageToDelete(data.response._id);
          // Remove the deleted message from the message list
          console.log(messageToDelete)
        } else {
          console.error(data.message)
        }
      })
      .catch((error) => console.log(error))
  };


 // /////////////////// TOGGLE TODO ///////////////// //
 const onToggleTodo = (todoId, completed) => {
  const options = {
    method: 'PATCH',
    body: JSON.stringify({
      completed: !completed
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  };

  fetch(API_URL(`todos/${todoId}/completed`), options)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        dispatch(todos.actions.setError(null));
        console.log(data.response);

        // Increment or decrement checked tasks based on the completion status
        const increment = completed ? -1 : 1;
        console.log(increment)
        console.log(userId)

        fetch(API_URL(`users/${userId}/checkedtasks`), {
          method: 'PATCH',
          body: JSON.stringify({
            increment: increment
          }),
          headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json'
          }
        })
          .then((response) => response.json())
          .then((userData) => {
            // Handle the response data for the user update if needed
            console.log(userData);
            dispatch(user.actions.setCheckedTasks(userData.response.checkedTasks))
          })
          .catch((error) => {
            // Handle the error if the user update fails
            console.error('Error updating user:', error);
          });
      } else {
        dispatch(todos.actions.setError(data.response));
      }
    })
    .catch((error) => {
      // Handle the error if the todo update fails
      console.error('Error updating todo:', error);
    });
};


 // /////////////////// EDIT TODO ///////////////// //
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const todoId = selectedTodo;
    // Handle the submission of updatedTodo object
    console.log("updated todo:", updatedTodo);

    const options = {
      method: 'PATCH',
      body: JSON.stringify(updatedTodo),
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    };
    fetch(API_URL(`todos/${todoId}/`), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(JSON.stringify(updatedTodo))
          dispatch(todos.actions.setError(null));
          console.log(data.response)
        } else {
          dispatch(todos.actions.setError(data.response));
        }
        
      })
      .finally(() => {
          setSelectedTodo(null);
          console.log('checked tasks in store', checkedtasks)
        })
    // ...
  };

// //////////////////////////////////////////////////////////////////////// //
// ///////////////////////// HANDLE INPUT-FUNCTIONS /////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

 // ////////////////// FIND TODO TO EDIT //////////////// //
const editTodo = (todoId, item) => {
    // Find the selected todo by its ID
    setSelectedTodo(todoId);

    const selected = todoList.find((todo) => todo._id === todoId);
    
    if (selected) {
      console.log("selected todo:", selectedTodo)
      setSelectedCategory(item.category);
      setSelectedPriority(item.priority);
    } else {
      console.log("no selected todo")
    }
  };
 // ////////////////// FLIP CARD BACK TO LIST //////////////// //
  const backtoTodoList = () => {
    // Find the selected todo by its ID
    setSelectedTodo(null);
  };

 // ////////////////// HANDLE DESCRIPTION //////////////// //
  const handleDescriptionChange = (e) => {
    setUpdatedTodo({...updatedTodo, description: e.target.value
    });
  };

   // ////////////////// CATEGORY //////////////// //
  const handleCategoryChange = (category) => {
    setUpdatedTodo({...updatedTodo, category});
    setSelectedCategory(category)
  };

   // ////////////////// HANDLE PRIORITY //////////////// //
  const handlePriorityChange = (priority) => {
    setUpdatedTodo({...updatedTodo, priority});
    setSelectedPriority(priority);
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  return (
    <>
    <GlobalStyle>
      <Wrapper>
        {todoList.map((item) => (
          <TodoContainer key={item._id}>
            <input type="checkbox" id="form_switch" style={{ display: 'none' }} />
            <FlipCard>
              <FlipCardInner className={`flipcard-inner${selectedTodo === item._id ? ' flipped' : ''}`}>
                <FlipCardFront>
                  <DisplayedTodo>
                    <FormGroup>
                      <input
                        type="checkbox"
                        name={item._id}
                        id={item._id}
                        checked={item.completed}
                        onChange={() => onToggleTodo(item._id, item.completed)} />
                      <p>{item.description}</p>
                      <p>{item.priority}</p>
                      <p>{item.category}</p>
                      <p>Created: {new Date (item.createdAt).toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })}</p>
                      <p>Deadline: {new Date(item.deadline).toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })}</p>
                      <p>{item.completed}</p>

                      <button type="button" onClick={() => DeleteMessage(item._id)}>Delete</button>
                      <FormFooter>
                      Do you want to edit this todo? <label className="label-highlight" htmlFor={`form_switch_${item._id}`} onClick={() => editTodo(item._id, item)}>EDIT</label>
                      </FormFooter>
                    </FormGroup>
                  </DisplayedTodo>
                </FlipCardFront>
                <FlipCardBack>
                <form onSubmit={handleEditSubmit}>
                    <FormHeader>
                      <h3>EDIT TODO</h3>
                    </FormHeader>
                    <FormGroup>
                      <FormInput
                        defaultValue={item.description}
                        required
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={handleDescriptionChange} />
                      <div>
                        <CategoryButton
                          type="button"
                          style={selectedCategory === 'Job' ? { backgroundColor: 'green' } : {}}
                          onClick={() => handleCategoryChange('Job')}>
                          Job
                        </CategoryButton>
                        <CategoryButton
                          type="button"
                          style={selectedCategory === 'School' ? { backgroundColor: 'green' } : {}}
                          onClick={() => handleCategoryChange('School')}>
              School
                        </CategoryButton>
                        <CategoryButton
                          type="button"
                          style={selectedCategory === 'Family' ? { backgroundColor: 'green' } : {}}
                          onClick={() => handleCategoryChange('Family')}>
              Family
                        </CategoryButton>
                        <CategoryButton
                          type="button"
                          style={selectedCategory === 'Hobbies' ? { backgroundColor: 'green' } : {}}
                          onClick={() => handleCategoryChange('Hobbies')}>
              Hobbies
                        </CategoryButton>
                      </div>
                      <div>
                        <PriorityButton
                          type="button"
                          style={selectedPriority === 1 ? { backgroundColor: 'green' } : {}}
                          onClick={() => handlePriorityChange(1)}>
              1
                        </PriorityButton>
                        <PriorityButton
                          type="button"
                          style={selectedPriority === 2 ? { backgroundColor: 'green' } : {}}
                          onClick={() => handlePriorityChange(2)}>
              2
                        </PriorityButton>
                        <PriorityButton
                          type="button"
                          style={selectedPriority === 3 ? { backgroundColor: 'green' } : {}}
                          onClick={() => handlePriorityChange(3)}>
              3
                        </PriorityButton>
                        <PriorityButton
                          type="button"
                          style={selectedPriority === null ? { backgroundColor: 'green' } : {}}
                          onClick={() => handlePriorityChange(null)}>
              No priority
                        </PriorityButton>
                      </div>
                      <CalendarContainer>
                        <DatePicker
                          customInput={<CustomInput />}
                          selected={selectedDeadline}
                          popperPlacement="top-start" // Add this line to adjust the position of the calendar
                          popperModifiers={{
                            preventOverflow: {
                              enabled: true,
                              escapeWithReference: false, // Add this line to prevent the calendar from escaping the reference element
                              boundariesElement: 'viewport' // Add this line to set the viewport as the boundary for the calendar
                          }}}
                          onChange={(date) => {
                            console.log('Date selected:', date);
                            setSelectedDeadline(date);
                            const adjustedDate = new Date(date.setHours(0, 0, 0));
                            setUpdatedTodo({
                              ...updatedTodo,
                              deadline: adjustedDate ? adjustedDate.toISOString() : null,
                            });
                            console.log('Selected deadline:', selectedDeadline);
                        }}
                        />
                    </CalendarContainer>
                      <EditSubmitButton htmlFor={`form_switch_${item._id}`} type="submit">Submit</EditSubmitButton>
                    </FormGroup>
                    <FormFooter>
                  See updated todo <LabelHighlight onClick={() => backtoTodoList()}>CLICK HERE</LabelHighlight>
                    </FormFooter>
                </form>    
                </FlipCardBack>
              </FlipCardInner>
            </FlipCard>
          </TodoContainer>
        ))}
      </Wrapper>
    </GlobalStyle>
    </>
  );
};