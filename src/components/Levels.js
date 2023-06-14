/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DescriptionWrapper, LevelsWrapper } from './LevelsStyles';

export const Levels = () => {
  const checkedtaskstotal = useSelector((store) => store.user.checkedTasks);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentFruit, setCurrentFruit] = useState('Apple');
  const [currentDescription, setCurrentDescription] = useState('');

  const dataset = [
    {
      completedTasks: 0,
      level: 0,
      fruit: 'Apple',
      description:
        'Congrats! You’re on your way to becoming more organized. As a first reward, you get an apple for deciding to start the journey!'
    },
    {
      completedTasks: 10,
      level: 1,
      fruit: 'Orange',
      description:
        'Be proud! You have over 10 completed to-dos and, therefore, you have earned an orange. Great work!'
    },
    {
      completedTasks: 20,
      level: 2,
      fruit: 'Banana',
      description:
        'Wow! You have completed 20 tasks and have earned a banana for your efforts. Keep up the good work!'
    },
    {
      completedTasks: 30,
      level: 3,
      fruit: 'Blueberries',
      description:
        'Be proud! You have completed 30 tasks. That is totally awesome! You’ve earned blueberries!'
    },
    {
      completedTasks: 40,
      level: 4,
      fruit: 'Watermelon',
      description:
        'Over 40 tasks completed? That’s truly amazing, great work! Your reward is watermelon!'
    },
    {
      completedTasks: 50,
      level: 5,
      fruit: 'Pineapple',
      description:
        'You are truly a todo-master as you’ve completed 50 tasks! Your reward is… PINEAPPLE!'
    }
  ];

  useEffect(() => {
    for (let i = dataset.length - 1; i >= 0; i--) {
      if (checkedtaskstotal >= dataset[i].completedTasks) {
        setCurrentLevel(dataset[i].level);
        setCurrentFruit(dataset[i].fruit);
        setCurrentDescription(dataset[i].description);
        break;
      }
    }
  }, [checkedtaskstotal]);

  return (
    <LevelsWrapper>
      <DescriptionWrapper>
        <p>{currentDescription}</p>
        <h2>Current Level: {currentLevel}</h2>
        <h2>You get: {currentFruit}</h2>
      </DescriptionWrapper>
    </LevelsWrapper>
  );
};
