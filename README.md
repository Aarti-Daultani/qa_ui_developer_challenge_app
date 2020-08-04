This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started
To get the frontend running locally:

* Clone this repo using command `git clone https://github.com/Aarti-Daultani/qa_ui_developer_challenge_app.git`
* `cd qa_ui_developer_challenge_app`
* `npm install` to install all req'd dependencies
* `npm start` to run the app in the development mode
* Open [http://localhost:3000](http://localhost:3000) to view it in the browser

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

**NOTE**: You may run into CORS issues while using this application. You can solve this by disabling cross domain web security in your browser of choice.

## Functionality overview

The example application is a Job Search Application. It uses Github’s free job search json api.

**General functionality:**
- User can search for available job position using following query parameters:
    - description
    - location
    - full_time
- User can even take a look at the complete job description by clicking on the resulted job.
- User can even toggle the resulted jobs in Ascending, Descending, and Default order.

## Technologies used
- React (create-react-app)
- Redux

## Demo
[Demo](Demo.gif)