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
import { BsCalendarDateFill } from 'react-icons/bs';
import 'react-datepicker/dist/react-datepicker.css';
import trashbin from '../img/trash.png';
import editpen from '../img/edit.png';
import { todos } from '../reducers/todos';
import { user } from '../reducers/user';
import { API_URL } from '../utils/urls';
import {
  GlobalStyle,
  Wrapper,
  DisplayedTodo,
  TodoContainer,
  CalendarContainer,
  FormInput,
  FormGroup,
  EditSubmitButton,
  FormFooter,
  FlipCard,
  FlipCardBack,
  FlipCardInner,
  FlipCardFront,
  NoDateButton,
  TrashButton,
  LabelFront,
  Checkbox,
  PriorityButtonContainer,
  CategoryButtonContainer,
  CategoryButton,
  PriorityButton,
  IconButton,
  CheckboxContainer,
  TrashButtonContainer,
  LabelFrontContainer,
  DisplayedPriority,
  DisplayedCategory,
  DisplayedItemsContainer,
  DisplayedDeadlineContainer,
  TransparentDiv
} from './SeeTodosStyles';

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
  const accessToken = useSelector((store) => store.user.accessToken);
  const todoList = useSelector((store) => store.todos.items); // We fint the thoughts in the store and set them to the variable
  const userId = useSelector((store) => store.user.userId); // Get the userID.
  const checkedtasks = useSelector((store) => store.user.checkedTasks);

  // //////////////////////// STATE VARIABLES /////////////////////////// //
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedDeadline, setSelectedDeadline] = useState(null);
  const [updatedTodo, setUpdatedTodo] = useState({});
  const [todoLength, setTodoLength] = useState(null);

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
          setTodoLength(data.response.length); // We get the length of how many todos there is, (used for styling)
        } else {
          // If the fetch is unsuccessful the error is set to the response that is returned from the server and the items(todoslist) is set to be an empty array.
          dispatch(todos.actions.setError(data.response));
          dispatch(todos.actions.setItems([]));
        }
      });
  });

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
          console.log(messageToDelete);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  // /////////////////// TOGGLE TODO ///////////////// //
  const onToggleTodo = (todoId, completed) => {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        completed: !completed // Changes the status of completed, no matter if it's false or true
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
          console.log(increment);
          console.log(userId);

          fetch(API_URL(`users/${userId}/checkedtasks`), {
            method: 'PATCH',
            body: JSON.stringify({
              increment
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
              dispatch(user.actions.setCheckedTasks(userData.response.checkedTasks));
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
    console.log('updated todo:', updatedTodo);

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
          console.log(JSON.stringify(updatedTodo));
          dispatch(todos.actions.setError(null));
          console.log(data.response);
        } else {
          dispatch(todos.actions.setError(data.response));
        }
      })
      .finally(() => {
        setSelectedTodo(null);
        console.log('checked tasks in store', checkedtasks);
      });
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////// HANDLE INPUT-FUNCTIONS /////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  // ////////////////// FIND TODO TO EDIT //////////////// //
  const editTodo = (todoId, item) => {
    // We set the selectedTodo with the todo-id in order to flip the card correctly.
    setSelectedTodo(todoId);

    // Find the selected todo by its ID
    const selected = todoList.find((todo) => todo._id === todoId);

    if (selected) {
      console.log('selected todo:', selectedTodo);
      // This is to make sure that the deadlinedate is saved in the correct date-format
      const deadline = item.deadline ? new Date(item.deadline) : null;
      setSelectedCategory(item.category);
      setSelectedPriority(item.priority);
      setSelectedDeadline(deadline);
    } else {
      console.log('no selected todo');
    }
  };

  // ////////////////// HANDLE DESCRIPTION //////////////// //
  const handleDescriptionChange = (e) => {
    setUpdatedTodo({
      ...updatedTodo,
      description: e.target.value
    });
  };

  // ////////////////// HANDLE CATEGORY //////////////// //
  const handleCategoryChange = (category) => {
    setUpdatedTodo({ ...updatedTodo, category });
    setSelectedCategory(category);
  };

  // ////////////////// HANDLE PRIORITY //////////////// //
  const handlePriorityChange = (priority) => {
    setUpdatedTodo({ ...updatedTodo, priority });
    setSelectedPriority(priority);
  };

  const FormatDate = (date) => {
    // Format the deadline date so that the day of the week, date and month is displayed
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: 'Europe/Stockholm'
    };

    return date.toLocaleString('sv-SE', options);
  };

  // The showGap prop is truthy if todoLength is longer than 1.
  const showGap = todoLength > 1;

  const getPrioBackgroundColor = (priority) => {
    // Changes the color of the priority-labels in the todo-cards
    if (priority === 1) {
      return '#9771B6';
    } else if (priority === 2) {
      return '#C281B4';
    } else if (priority === 3) {
      return '#D3A7CA';
    }
  };

  const getCategoryBackgroundColor = (category) => {
    // Changes the color of the category-labels in the todo-cards
    if (category === 'Job') {
      return '#CD8484';
    } else if (category === 'School') {
      return '#76A1D3';
    } else if (category === 'Family') {
      return '#DFD78E';
    } else {
      return '#CDA384';
    }
  };
  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  return (
    <GlobalStyle>
      <Wrapper showGap={showGap}>
        {todoList.map((item) => (
          <TodoContainer key={item._id}>
            <input type="checkbox" id="form_switch" style={{ display: 'none' }} />
            <FlipCard>
              <FlipCardInner
                className={`flipcard-inner${selectedTodo === item._id ? ' flipped' : ''}`}>
                <FlipCardFront>
                  <DisplayedTodo>
                    <FormGroup>
                      <CheckboxContainer>
                        <Checkbox
                          type="checkbox"
                          name={item._id}
                          id={item._id}
                          checked={item.completed}
                          onChange={() => onToggleTodo(item._id, item.completed)} />
                      </CheckboxContainer>
                      <h2>{item.description}</h2>
                      <hr />
                      <DisplayedItemsContainer>
                        {item.priority && (
                          <DisplayedPriority
                            style={{ backgroundColor: getPrioBackgroundColor(item.priority) }}>
                            <p>{item.priority}</p>
                          </DisplayedPriority>
                        )}
                        <DisplayedCategory
                          style={{ backgroundColor: getCategoryBackgroundColor(item.category) }}>
                          <p>{item.category}</p>
                        </DisplayedCategory>
                      </DisplayedItemsContainer>
                      <DisplayedDeadlineContainer>
                        {item.deadline ? (
                          <p>Deadline: {FormatDate(new Date(item.deadline))}</p>
                        ) : (
                          <TransparentDiv />
                        )}
                      </DisplayedDeadlineContainer>
                      <FormFooter>
                        <TrashButtonContainer>
                          <TrashButton type="button" onClick={() => DeleteMessage(item._id)}>
                            <img alt="trashbin" src={trashbin} />
                          </TrashButton>
                        </TrashButtonContainer>
                        <LabelFrontContainer>
                          <LabelFront
                            className="label-highlight"
                            htmlFor={`form_switch_${item._id}`}
                            onClick={() => editTodo(item._id, item)}>
                            <img alt="editpen" src={editpen} />
                          </LabelFront>
                        </LabelFrontContainer>
                      </FormFooter>
                    </FormGroup>
                  </DisplayedTodo>
                </FlipCardFront>
                <FlipCardBack>
                  <form onSubmit={handleEditSubmit}>
                    <FormGroup>
                      <FormInput
                        defaultValue={item.description}
                        required
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={handleDescriptionChange} />
                      <CategoryButtonContainer>
                        <CategoryButton
                          type="button"
                          onClick={() => handleCategoryChange('Job')}
                          style={
                            selectedCategory !== 'Job'
                              ? { backgroundColor: '#CD8484' }
                              : { backgroundColor: '#B17373', transform: 'translateY(2px)' }
                          }>
                          Job
                        </CategoryButton>
                        <CategoryButton
                          type="button"
                          onClick={() => handleCategoryChange('School')}
                          style={
                            selectedCategory !== 'School'
                              ? { backgroundColor: '#76A1D3' }
                              : { backgroundColor: '#678CB8', transform: 'translateY(2px)' }
                          }>
                          School
                        </CategoryButton>
                        <CategoryButton
                          type="button"
                          onClick={() => handleCategoryChange('Family')}
                          style={
                            selectedCategory !== 'Family'
                              ? { backgroundColor: '#DFD78E' }
                              : { backgroundColor: '#C0B97A', transform: 'translateY(2px)' }
                          }>
                          Family
                        </CategoryButton>
                        <CategoryButton
                          type="button"
                          onClick={() => handleCategoryChange('Hobbies')}
                          style={
                            selectedCategory !== 'Hobbies'
                              ? { backgroundColor: '#CDA384' }
                              : { backgroundColor: '#AF8D74', transform: 'translateY(2px)' }
                          }>
                          Hobbies
                        </CategoryButton>
                      </CategoryButtonContainer>
                      <PriorityButtonContainer>
                        <PriorityButton
                          type="button"
                          onClick={() => handlePriorityChange(1)}
                          style={
                            selectedPriority === 1
                              ? { backgroundColor: '#9771B6', transform: 'translateY(2px)' }
                              : {}
                          }>
                          1
                        </PriorityButton>
                        <PriorityButton
                          type="button"
                          onClick={() => handlePriorityChange(2)}
                          style={
                            selectedPriority === 2
                              ? { backgroundColor: '#C281B4', transform: 'translateY(2px)' }
                              : {}
                          }>
                          2
                        </PriorityButton>
                        <PriorityButton
                          type="button"
                          onClick={() => handlePriorityChange(3)}
                          style={
                            selectedPriority === 3
                              ? { backgroundColor: '#D3A7CA', transform: 'translateY(2px)' }
                              : {}
                          }>
                          3
                        </PriorityButton>
                        <PriorityButton
                          type="button"
                          style={selectedPriority === null ? { backgroundColor: '#4D724D' } : {}}
                          onClick={() => handlePriorityChange(null)}>
                          X
                        </PriorityButton>
                      </PriorityButtonContainer>
                      <CalendarContainer>
                        <NoDateButton
                          type="button"
                          style={selectedDeadline === null ? { backgroundColor: '#4D724D' } : {}}
                          onClick={() => {
                            setSelectedDeadline(null);
                            setUpdatedTodo({ ...updatedTodo, deadline: null });
                          }}>
                          No Deadline
                        </NoDateButton>
                        <DatePicker
                          customInput={<CustomInput />}
                          selected={selectedDeadline}
                          popperPlacement="top-start"
                          popperModifiers={{
                            preventOverflow: {
                              enabled: true,
                              escapeWithReference: false,
                              boundariesElement: 'viewport'
                            }
                          }}
                          onChange={(date) => {
                            console.log('Date selected:', date);
                            setSelectedDeadline(date);

                            setUpdatedTodo({
                              ...updatedTodo,
                              deadline: date
                            });
                            console.log('Selected deadline:', selectedDeadline);
                          }} />
                      </CalendarContainer>
                      <FormFooter>
                        <EditSubmitButton htmlFor={`form_switch_${item._id}`} type="submit">
                          EDIT
                        </EditSubmitButton>
                      </FormFooter>
                    </FormGroup>
                  </form>
                </FlipCardBack>
              </FlipCardInner>
            </FlipCard>
          </TodoContainer>
        ))}
      </Wrapper>
    </GlobalStyle>
  );
};
