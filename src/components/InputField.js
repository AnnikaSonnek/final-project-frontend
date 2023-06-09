/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';

export const InputField = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          Authorization: 'Bearer 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' },
        body: JSON.stringify({
          model: 'text-babbage-001',
          prompt: inputValue,
          echo: true,
          max_tokens: 2,
          temperature: 0.8
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
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange} />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};
