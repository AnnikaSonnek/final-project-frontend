// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////////// IMPORTS //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //
import React from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  ProgressbarWrapper,
  ChartContainer,
  LabelContainer,
  StatsWrapper,
  Span
} from './ProgressBarStyles';

ChartJS.register(ArcElement, Tooltip, Legend);

// //////////////////////////////////////////////////////////////////////// //
// /////////////////////////// PROGRESSBAR //////////////////////////////// //
// //////////////////////////////////////////////////////////////////////// //
export const ProgressBar = () => {
  const todolist = useSelector((store) => store.todos.items);
  const checkedtodostotal = useSelector((store) => store.user.checkedTasks);

  // Filtering out the completed and uncompleted items
  const completedTodos = todolist.filter((todo) => todo.completed);
  const uncompletedTodos = todolist.filter((todo) => !todo.completed);

  const totalTasks = todolist.length;

  const completedPercentage = (completedTodos.length / totalTasks) * 100;
  const uncompletedPercentage = (uncompletedTodos.length / totalTasks) * 100;

  const completedPercentageString = completedPercentage.toFixed(0);
  // Filter tasks by category
  const jobTodos = todolist.filter((todo) => todo.category === 'Job');
  const schoolTodos = todolist.filter((todo) => todo.category === 'School');
  const familyTodos = todolist.filter((todo) => todo.category === 'Family');
  const hobbiesTodos = todolist.filter((todo) => todo.category === 'Hobbies');

  // Get the task counts for each category
  const jobTodosCount = jobTodos.length;
  const schoolTodosCount = schoolTodos.length;
  const familyTodosCount = familyTodos.length;
  const hobbiesTodosCount = hobbiesTodos.length;

  const isWithinCurrentWeek = (date) => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7));
    return date >= startOfWeek && date <= endOfWeek;
  };

  const tasksWithDeadlineThisWeek = todolist.filter((task) => {
    const deadline = new Date(task.deadline);
    return isWithinCurrentWeek(deadline);
  });

  const tasksCountThisWeek = tasksWithDeadlineThisWeek.length;

  // //////////////DATA AND OPTIONS FOR DOUGHNUT CHART//////////////////////////
  const data = {
    // labels: ['Job', 'School', 'Family', 'Hobbies'],
    datasets: [
      {
        data: [jobTodosCount, schoolTodosCount, familyTodosCount, hobbiesTodosCount],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  const progressdata = {
    // labels: ['Completed', 'Uncompleted'],
    datasets: [
      {
        data: [completedPercentage, uncompletedPercentage],
        backgroundColor: ['#4BC0C0', '#FF6384'],
        hoverBackgroundColor: ['#4BC0C0', '#FF6384']
      }
    ]
  };

  const options = {
    cutout: '80%' // Adjust the cutout percentage as needed
  };

  // //////////////////////////////////////////////////////////////////////// //
  // ///////////////////////////// RETURN JSX /////////////////////////////// //
  // //////////////////////////////////////////////////////////////////////// //
  return (
    <ProgressbarWrapper>
      <StatsWrapper>
        <ChartContainer>
          <Doughnut data={data} options={options} />
          <LabelContainer>
            <p>
              <Span style={{ color: 'black', backgroundColor: '#FF6384' }}>Job</Span>
            </p>
            <p>
              <Span style={{ color: 'white', backgroundColor: '#36A2EB' }}>School</Span>
            </p>
            <p>
              <Span style={{ color: 'black', backgroundColor: '#FFCE56' }}>Family</Span>
            </p>
            <p>
              <Span style={{ color: 'black', backgroundColor: '#4BC0C0' }}>Hobbies</Span>
            </p>
          </LabelContainer>
        </ChartContainer>
        <ChartContainer>
          <Doughnut data={progressdata} options={options} />
          <LabelContainer>
            <p style={{ fontSize: '1.2rem' }}>{`${completedPercentageString}% completed`}</p>
          </LabelContainer>
        </ChartContainer>
      </StatsWrapper>
      <StatsWrapper>
        <div>
          <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>{`${tasksCountThisWeek}`}</p>
          <p style={{ fontSize: '1.2rem' }}>Deadlines this week</p>
          <p style={{ textAlign: 'center', fontSize: '2rem' }}>⌛</p>
        </div>
        <div>
          <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>{`${checkedtodostotal}`}</p>
          <p style={{ fontSize: '1.2rem' }}>Total finished todos</p>
          <p style={{ textAlign: 'center', fontSize: '2rem' }}>✅</p>
        </div>
      </StatsWrapper>
    </ProgressbarWrapper>
  );
};
