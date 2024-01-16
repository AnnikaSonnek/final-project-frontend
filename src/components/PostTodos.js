/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { BsCalendarDateFill } from 'react-icons/bs';
import pacman from '../img/pacman.png';
import { user } from '../reducers/user';
import { API_URL } from '../utils/urls';
import {
  FormPostTodos,
  AI,
  AIcontainer,
  IconButton,
  CategoryButton,
  PriorityButton,
  FormWrapper,
  OuterWrapper,
  AcordionColapsed,
  FormInput,
  CategoryButtonContainer,
  AddButton,
  PacmanContainer,
  PriorityButtonContainer,
  SubmitButton,
  NoDateButton,
  DateButtonsContainer
} from './PostTodosStyles.js';
import 'react-datepicker/dist/react-datepicker.css';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

// This codesnippet adds the the Icon and make it into a button and brins out the calendar
const CustomInput = forwardRef(({ onClick }, ref) => (
  <IconButton onClick={onClick} ref={ref} type="button">
    <BsCalendarDateFill fill="#212427" />
  </IconButton>
));

// //////////////////////////////////////////////////////////////////////// //
// //////////////////////////// POST TODOS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const PostTodos = () => {
  const dispatch = useDispatch(); // Here we use the dispatch function to dispatch actions.
  // const maxCharacters = 29; // Max amount of characters allowed in the input field.
  const accessToken = useSelector((store) => store.user.accessToken);
  const [deadlineDate, setDeadlineDate] = useState(null);
  // get the Deadline date using the useState hook.
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);

  // NEW TODO-OBJECT USE STATE
  const [newTodo, setNewTodo] = useState({
    description: '',
    deadline: deadlineDate ? deadlineDate.toISOString() : null,
    category: '',
    priority: ''
  });

  // //////HANDLE CATEGORIES////////////
  const handleCategoryChange = (category) => {
    setNewTodo({ ...newTodo, category });
    setSelectedCategory(category)
  };

  // //////HANDLE PRIORITIES////////////
  const handlePriorityChange = (priority) => {
    setNewTodo({ ...newTodo, priority });
    setSelectedPriority(priority)
  };

  // //////CLEARS THE SUGGESTIONS AFTER SUBMIT////////////
  const clearSuggestions = () => {
    setSuggestions([]);
  };

  // ////////////////FORM SUBMIT//////////////////
  const onFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify(newTodo) // Convert the username and password to JSON string and set as the request body
    };
    fetch(API_URL('todos'), options) // Make a POST request to the API URL based on the current mode
      .then((response) => response.json()) // Convert the response to JSON
      .then((responsedata) => {
        if (responsedata.success) {
          dispatch(user.actions.setError(null));
        } else {
          dispatch(user.actions.setError(responsedata.response)); // Dispatch an action to set the error message in the store
          if (newTodo.description === '' || newTodo.category === '') { // If the user does not choose a category
            alert('You must enter a description and choose a category.');
          }
        }
      })
      .finally(() => {
        setNewTodo({
          description: '',
          deadline: null,
          category: '',
          priority: ''
        }); // Dispatch an action to clear any previous error in the store
        setDeadlineDate(null);
        setAccordionOpen(!accordionOpen);
        clearSuggestions();
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTodo({ ...newTodo, [name]: value });
    setInputValue(event.target.value);
  };

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// AI /////////////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  const fetchSuggestions = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'text-davinci-002',
          prompt: `To-do: ${inputValue}`,
          temperature: 0.3,
          max_tokens: 2,
          n: 1,
          stop: '\n'
        })
      });
  
      const data = await response.json();
      const newsuggestions = data.choices[0].text.trim().split(' ');
      setSuggestions(newsuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.trim() !== '') {
        fetchSuggestions();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleAiSuggestion = () => {
    const suggestion = suggestions.slice(1).join(' ');
    setNewTodo({ ...newTodo, description: suggestion });
    setSuggestions([]);
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  return (
    <OuterWrapper>
      <PacmanContainer>
        <img alt="pacman" src={pacman} />
        <AIcontainer>
          {suggestions.map((suggestion, index) => (
            <AI key={index} onClick={handleAiSuggestion}>
              {suggestion}
              <span className="word-spacing">&nbsp;</span>
            </AI>
          ))}
        </AIcontainer>
      </PacmanContainer>
      <FormWrapper>
        <AcordionColapsed>
          <p>ADD TASK</p>
          <AddButton type="button" onClick={toggleAccordion}>
            {accordionOpen ? '-' : '+'}
          </AddButton>
        </AcordionColapsed>
        {accordionOpen && (
          <FormPostTodos onSubmit={onFormSubmit}>
            <FormInput
              required
              type="text"
              name="description"
              placeholder="Description"
              value={newTodo.description}
              onChange={handleInputChange} />
            {/* Category buttons */}
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
                    : { backgroundColor: '#AF8D74', transform: 'translateY(2px)' }
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
                  selectedPriority !== 1
                    ? { backgroundColor: '#f0f0f0' }
                    : { backgroundColor: '#9771B6', transform: 'translateY(2px)' }
                }>
                1
              </PriorityButton>
              <PriorityButton
                type="button"
                onClick={() => handlePriorityChange(2)}
                style={
                  selectedPriority !== 2
                    ? { backgroundColor: '#f0f0f0' }
                    : { backgroundColor: '#C281B4', transform: 'translateY(2px)' }
                }>
                2
              </PriorityButton>
              <PriorityButton
                type="button"
                onClick={() => handlePriorityChange(3)}
                style={
                  selectedPriority !== 3
                    ? { backgroundColor: '#f0f0f0' }
                    : { backgroundColor: '#D3A7CA', transform: 'translateY(2px)' }
                }>
                3
              </PriorityButton>
            </PriorityButtonContainer>
            <DateButtonsContainer>
              <CalendarContainer>
                <DatePicker
                  selected={deadlineDate}
                  customInput={<CustomInput />}
                  onChange={(date) => {
                    setDeadlineDate(date);
                    setNewTodo({ ...newTodo, deadline: date ? date.toISOString() : null }); // Update the deadline property with the selected date
                  }} />
              </CalendarContainer>
              <NoDateButton
                type="button"
                onClick={() => {
                  setDeadlineDate(null)
                  setNewTodo({ ...newTodo, deadline: null })
                }}
                style={deadlineDate === null ? { backgroundColor: '#4D724D', transform: 'translateY(2px)' } : { border: 'solid 2px #4D724D' }}>
                No deadline
              </NoDateButton>
            </DateButtonsContainer>
            <SubmitButton
              type="submit"
              disabled={newTodo.description.length < 6 || newTodo.description.length > 38}>
              Submit
            </SubmitButton>
          </FormPostTodos>
        )}
      </FormWrapper>
    </OuterWrapper>
  );
};
