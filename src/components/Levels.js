/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DescriptionWrapper, LevelsWrapper, Paragraph, ImgContainer, PrizeImg, ImgBackgroundContainer } from './LevelsStyles';
import { TextStatsDesc } from './ProgressBarStyles';
import apple from '../img/apple-black.png'
import orange from '../img/orange-black.png'
import banana from '../img/banana-black.png'
import blueberries from '../img/blueberry-white.png'
import watermelon from '../img/watermelon-white.png'
import pineapple from '../img/pineapple-black.png'

export const Levels = () => {
  const checkedtaskstotal = useSelector((store) => store.user.checkedTasks);
  const username = useSelector((store) => store.user.username)
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentFruit, setCurrentFruit] = useState('apple');
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
        <h2>{`Hello ${username}!`}</h2>
        <Paragraph center>{currentDescription}</Paragraph>
        <ImgContainer>
          {currentFruit === 'Apple' ? (
            <ImgBackgroundContainer style={{ backgroundColor: '#CD8484' }}>
              <PrizeImg alt="Apple" src={apple} />
            </ImgBackgroundContainer>
          ) : null}
          {currentFruit === 'Orange' ? (
            <ImgBackgroundContainer style={{ backgroundColor: '#CDA384' }}>
              <PrizeImg alt="Orange" src={orange} />
            </ImgBackgroundContainer>
          ) : null}
          {currentFruit === 'Banana' ? (
            <ImgBackgroundContainer style={{ backgroundColor: '#DFD78E' }}>
              <PrizeImg alt="Banana" src={banana} />
            </ImgBackgroundContainer>
          ) : null}
          {currentFruit === 'Blueberries' ? (
            <ImgBackgroundContainer style={{ backgroundColor: '#76A1D3' }}>
              <PrizeImg alt="Blueberries" src={blueberries} />
            </ImgBackgroundContainer>
          ) : null}
          {currentFruit === 'Watermelon' ? (
            <ImgBackgroundContainer style={{ backgroundColor: '#4D724D' }}>
              <PrizeImg alt="Watermelon" src={watermelon} />
            </ImgBackgroundContainer>
          ) : null}
          {currentFruit === 'Pinapple' ? (
            <ImgBackgroundContainer style={{ backgroundColor: '#CDA384' }}>
              <PrizeImg alt="Pineapple" src={pineapple} />
            </ImgBackgroundContainer>
          ) : null}
        </ImgContainer>
        <TextStatsDesc>Level {currentLevel}</TextStatsDesc>
      </DescriptionWrapper>
    </LevelsWrapper>
  );
};