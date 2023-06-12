/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Levels = () => {
  const checkedtaskstotal = useSelector((store) => store.user.checkedTasks);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentFruit, setCurrentFruit] = useState('Apple');

  const dataset = [
    { completedTasks: 0, level: 0, fruit: 'an Apple' },
    { completedTasks: 10, level: 1, fruit: 'an Orange' },
    { completedTasks: 20, level: 2, fruit: 'a Banana' },
    { completedTasks: 30, level: 3, fruit: 'a Plum' },
    { completedTasks: 40, level: 4, fruit: 'a Watermelon' },
    { completedTasks: 50, level: 5, fruit: 'a Pineapple' }
  ];

  useEffect(() => {
    for (let i = dataset.length - 1; i >= 0; i--) {
      if (checkedtaskstotal >= dataset[i].completedTasks) {
        setCurrentLevel(dataset[i].level);
        setCurrentFruit(dataset[i].fruit);
        break;
      }
    }
  }, [checkedtaskstotal]);

  return (
    <div>
      <h2>Current Level: {currentLevel}</h2>
      <h2>You get: {currentFruit}</h2>
    </div>
  );
};
