/* eslint-disable max-len */

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

import React from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import {
  ProgressbarWrapper,
  ChartContainer,
  LabelContainer,
  StatsWrapper,
  Span,
  TextStatsContainer,
  TextStatsNumber,
  TextStatsDesc,
  ImgWrapper,
  Img
} from './ProgressBarStyles';
import notasks from '../img/notasks.png';

ChartJS.register(ArcElement, Legend);

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////// PROGRESSBAR //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //

export const ProgressBar = () => {
  const todolist = useSelector((store) => store.todos.items);
  const checkedtodostotal = useSelector((store) => store.user.checkedTasks);

  // Filtering out the completed and uncompleted items
  const completedTodos = todolist.filter((todo) => todo.completed);
  const uncompletedTodos = todolist.filter((todo) => !todo.completed);

  // Calculate the total number of tasks in the todolist
  const totalTasks = todolist.length;

  // Calculate the percentage of completed tasks, show 0 of the completed tasks is Nan.
  const completedPercentage = totalTasks !== 0 ? (completedTodos.length / totalTasks) * 100 : 0;

  // Calculate the percentage of uncompleted tasks
  const uncompletedPercentage = (uncompletedTodos.length / totalTasks) * 100;

  const completedPercentageString = completedPercentage.toFixed(0);
  // Filter tasks by category
  const jobTodos = todolist.filter((todo) => todo.category === 'Job');
  const schoolTodos = todolist.filter((todo) => todo.category === 'School');
  const familyTodos = todolist.filter((todo) => todo.category === 'Family');
  const hobbiesTodos = todolist.filter((todo) => todo.category === 'Hobbies');

  // Get the length from each of the category arrays that we created above
  const jobTodosCount = jobTodos.length;
  const schoolTodosCount = schoolTodos.length;
  const familyTodosCount = familyTodos.length;
  const hobbiesTodosCount = hobbiesTodos.length;

  // Function that checks if a given date falls within the current week
  const isWithinCurrentWeek = (date) => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
    return date >= startOfWeek && date <= endOfWeek;
  };

  // Filter tasks that have a deadline within the current week
  const tasksWithDeadlineThisWeek = todolist.filter((task) => {
    const deadline = new Date(task.deadline);
    return isWithinCurrentWeek(deadline);
  });

  // Count the number of tasks with a deadline within the current week
  const tasksCountThisWeek = tasksWithDeadlineThisWeek.length;

  // //////////////DATA AND OPTIONS FOR DOUGHNUT CHART//////////////////////////
  const data = {
    // labels: ['Job', 'School', 'Family', 'Hobbies'], //removed the labels included in the chart
    datasets: [
      {
        data: [jobTodosCount, schoolTodosCount, familyTodosCount, hobbiesTodosCount], // use the number of tasks in each category
        backgroundColor: ['#CD8484', '#76A1D3', '#DFD78E', '#CDA384'],
        hoverBackgroundColor: ['#CD8484', '#76A1D3', '#DFD78E', '#CDA384']
      }
    ]
  };

  const progressdata = {
    // labels: ['Completed', 'Uncompleted'], //removed the labels included in the chart
    datasets: [
      {
        data: [completedPercentage, uncompletedPercentage], // compares the completed and uncompleted percentage
        backgroundColor: ['#CD8484', '#F5F5F5'],
        hoverBackgroundColor: ['#CD8484', '#F5F5F5']
      }
    ]
  };

  const options = {
    cutout: '80%' // makes the chart a little thinner
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //

  return (
    <ProgressbarWrapper>
      {totalTasks === 0 || totalTasks === null ? (
        <ImgWrapper>
          <Img alt="tasklist" src={notasks} />
          <p>You haven&apos;t added any todos yet.</p>
        </ImgWrapper>
      ) : (
        <>
          <StatsWrapper>
            <ChartContainer>
              <Doughnut data={data} options={options} />
              <LabelContainer>
                <p>
                  <Span style={{ color: 'black', backgroundColor: '#CD8484' }}>Job</Span>
                </p>
                <p>
                  <Span style={{ color: 'black', backgroundColor: '#CDA384' }}>Hobbies</Span>
                </p>
                <p>
                  <Span style={{ color: 'black', backgroundColor: '#DFD78E' }}>Family</Span>
                </p>
                <p>
                  <Span style={{ color: 'white', backgroundColor: '#76A1D3' }}>School</Span>
                </p>
              </LabelContainer>
            </ChartContainer>
            <ChartContainer>
              <Doughnut data={progressdata} options={options} />
              <LabelContainer>
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '1rem',
                    fontWeight: 600
                  }}>
                  {`${completedPercentageString}% completed`}
                </p>
              </LabelContainer>
            </ChartContainer>
          </StatsWrapper>
          <StatsWrapper>
            <TextStatsContainer>
              <TextStatsNumber>{`${tasksCountThisWeek}`}</TextStatsNumber>
              <TextStatsDesc>Deadlines this week</TextStatsDesc>
              <p style={{ fontSize: '2rem' }}>⌛</p>
            </TextStatsContainer>
            <TextStatsContainer>
              <TextStatsNumber>{`${checkedtodostotal}`}</TextStatsNumber>
              <TextStatsDesc>Total completed todos</TextStatsDesc>
              <p style={{ fontSize: '2rem' }}>✅</p>
            </TextStatsContainer>
          </StatsWrapper>
        </>
      )}
    </ProgressbarWrapper>
  );
};
