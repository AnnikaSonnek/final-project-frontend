/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //
// Lets go!

import React, { useState, useEffect, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
// import 'dotenv/config'
import { BsCalendarDateFill } from 'react-icons/bs';
import { user } from '../reducers/user';
import { API_URL } from '../utils/urls';
import { FormPostTodos, AI, AIcontainer, IconButton, CategoryButton, PriorityButton, FormWrapper } from './PostTodosStyles';
import 'react-datepicker/dist/react-datepicker.css';
import { ProgressBar } from './ProgressBar';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

// This codesnippet adds the the Icon and make it into a button and brins out the calendar
const CustomInput = forwardRef(({ onClick }, ref) => (
  <IconButton onClick={onClick} ref={ref} type="button">
    <BsCalendarDateFill fill="black" />
  </IconButton>
));

// //////////////////////////////////////////////////////////////////////// //
// //////////////////////////// POST TODOS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //
// Here we go!

export const PostTodos = () => {
  const dispatch = useDispatch(); // Here we use the dispatch function to dispatch actions.
  // const maxCharacters = 29; // Max amount of characters allowed in the input field.
  const accessToken = useSelector((store) => store.user.accessToken);
  const [deadlineDate, setDeadlineDate] = useState(null);
  // get the Deadline date using the useState hook.
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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
  };

  // //////HANDLE PRIORITIES////////////
  const handlePriorityChange = (priority) => {
    setNewTodo({ ...newTodo, priority });
  };

  // //////CLEARS THE SUGGESTIONS AFTER SUBMIT////////////
  const clearSuggestions = () => {
    setSuggestions([]);
  };

  // ////////////////FORM SUBMIT//////////////////
  const onFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log('New Todo:', newTodo);

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
          console.log(responsedata);
          dispatch(user.actions.setError(null));
        } else {
          dispatch(user.actions.setError(responsedata.response)); // Dispatch an action to set the error message in the store
        }
      })
      .finally(() => {
        setNewTodo({
          description: '',
          deadline: null,
          category: '',
          priority: ''
        }) // Dispatch an action to clear any previous error in the store
        setDeadlineDate(null);
        setAccordionOpen(!accordionOpen);
        clearSuggestions()
      })
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTodo({ ...newTodo, [name]: value });
    setInputValue(event.target.value)
  };

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// AI /////////////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  const fetchSuggestions = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'text-babbage-001',
          prompt: `To-do: ${inputValue}`,
          echo: true,
          max_tokens: 2,
          temperature: 0.3
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

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  return (
    <>
      <ProgressBar />
      <FormWrapper>
        <p>skriv din todo här!</p>
        <button type="button" onClick={toggleAccordion}>
          {accordionOpen ? '-' : '+'}
        </button>
        {accordionOpen && (
          <FormPostTodos onSubmit={onFormSubmit}>
            <input
              required
              type="text"
              name="description"
              placeholder="Description"
              value={newTodo.description}
              onChange={handleInputChange} />
            <AIcontainer>
              {suggestions.map((suggestion, index) => (
                <AI key={index}>
                  {suggestion}
                  <span className="word-spacing">&nbsp;</span>
                </AI>
              ))}
            </AIcontainer>
            {/* Category buttons */}
            <div>
              <CategoryButton
                type="button"
                onClick={() => handleCategoryChange('Job')}
                active={newTodo.category === 'Job'}>
                Job
              </CategoryButton>
              <CategoryButton
                type="button"
                onClick={() => handleCategoryChange('School')}
                active={newTodo.category === 'School'}>
                School
              </CategoryButton>
              <CategoryButton
                type="button"
                onClick={() => handleCategoryChange('Family')}
                active={newTodo.category === 'Family'}>
                Family
              </CategoryButton>
              <CategoryButton
                type="button"
                onClick={() => handleCategoryChange('Hobbies')}
                active={newTodo.category === 'Hobbies'}>
                Hobbies
              </CategoryButton>
            </div>
            <div>
              <PriorityButton
                type="button"
                onClick={() => handlePriorityChange(1)}
                active={newTodo.priority === 1}>
                1
              </PriorityButton>
              <PriorityButton
                type="button"
                onClick={() => handlePriorityChange(2)}
                active={newTodo.priority === 2}>
                2
              </PriorityButton>
              <PriorityButton
                type="button"
                onClick={() => handlePriorityChange(3)}
                active={newTodo.priority === 3}>
                3
              </PriorityButton>
            </div>
            <DatePicker
              selected={deadlineDate}
              customInput={<CustomInput />}
              onChange={(date) => {
                console.log('Date selected:', date);
                setDeadlineDate(date);
                setNewTodo({ ...newTodo, deadline: date ? date.toISOString() : null }); // Update the deadline property with the selected date
                console.log(deadlineDate);
              }} />
            <PriorityButton
              type="button"
              onClick={() => setNewTodo({ ...newTodo, deadline: null })}
              active={newTodo.deadline === null}>
              No deadline
            </PriorityButton>
            <button type="submit">
              Submit
            </button>
          </FormPostTodos>
        )}
      </FormWrapper>
    </>
  )
}
