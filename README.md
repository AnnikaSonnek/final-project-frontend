# Final Project: TodoQuest

## Table of Contents

- Project Description
- Technilogies Used
- Features
- API Documentation
- Deployed Back & Frontend


## Project Description:

This todo-app was created by Annika Sonnek and Andreas Axelsson during the Technigo Web Developer bootcamp 2023. The app has featurs such as gamification and AI to help the user to complete their tasks.

## Technilogies Used:

- React
- Redux
- React Router
- Styled Components
- Node.js
- Express
- MongoDB

## Features:

This todo-app has features like AI-complation and gamification. The AI generates suggestions on potential tasks based on what the user starts writing and the gamification part contains levels based on how many compleated tasks you have. The personal-page in the app contains you stats that also should motivate you to level-up and get things done.

## API Documentation:

The backend for this app has the following endpoints:
{
"/": "Api Info"
},
{
"/register": "POST. Post Mail, Username, Password"
},
{
"/login": "POST. Post Mail, Password"
},
{
"/todos": "GET. See to-dos in descending order"
},
{
"/todos": "POST. Post one new to-do"
},
{
"/todos/:id": "GET. GET one to-do"
},
{
"/todos/:id": "PATCH. Edit one to-do"
},
{
"/todos/:id": "DELETE. Delete one to-do"
},
{
"/todos/:id/completed": "PATCH. Update completed status of one todo"
}

The AI uses this endpoint:

https://api.openai.com/v1/completions

## - Deployed Back & Frontend:

Backend: https://final-project-backend-cf4kdfwtfa-no.a.run.app/
Frontend: https://todoquest.netlify.app/







