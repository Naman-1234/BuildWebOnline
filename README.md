<p align="center">
    <img src="https://user-images.githubusercontent.com/63748249/122639234-693ca580-d116-11eb-978f-574866e06c4d.png" alt="Logo" height="200" width="300"></img>
</p>

# Table of Contents:

    - About
    - Demonstration
    - Glimpse
    - Tech Stack Used
    - Folder Structure
    - Running Locally
    - Learning
    - TODO

## About

📌 This is an web app consisting of several text Editors specifically for HTML,CSS and JavaScript.
📌 Real Time Editor and Output makes front Web Development absorbing and peaceful.
📌 Neither boilerplate code nor linking files is required. You can start coding right away. 😇

## Demonstration:

This is a demonstration of the App showing Real time changes of the page being made by the user. Here Editors are for HTML, CSS and Javascript. Then its output as a webpage is shown in the iframe used below.
![Working](https://user-images.githubusercontent.com/63748249/122638995-157d8c80-d115-11eb-82cc-565490424d10.gif)

## Glimpse

<kbd>
<img src="https://user-images.githubusercontent.com/63748249/124733015-6a9d0900-df31-11eb-85a0-f7f4a5dffdb0.png" alt="frontpage">
</kbd>
<kbd>
<img src="https://user-images.githubusercontent.com/63748249/124733020-6c66cc80-df31-11eb-947e-8820316e7666.png" alt="SignUp">
</kbd>
<kbd>
<img src="https://user-images.githubusercontent.com/63748249/124733019-6bce3600-df31-11eb-939e-23000afb53d5.png" alt="Login">
</kbd>
<kbd>
<img src="https://user-images.githubusercontent.com/63748249/124733021-6c66cc80-df31-11eb-8803-d2bf1caec1a2.png" alt="Profile">
</kbd>
<kbd>
<img src="https://user-images.githubusercontent.com/63748249/124733283-afc13b00-df31-11eb-9fc6-6a804127c54b.png" alt="Documents">
</kbd>

## Tech Stack Used

```
Frontend:

- Library: Reactjs
- Styling: Material-UI
- Hooks:   useState, useEffect, useHistory
- CustomHooks:  useToken
- Token-Storage: Used localstorage to let user login across multiple windows(Problem arises in case of SessionStorage)

Backend:
- Runtime Environment: Nodejs
- Framework: Expressjs
- Database: NOSql Database mongodb Object Document Mapper is used referred as mongoose.
- npm packages:
    1. bcryptjs- For Storing encrypted passwords instead of plane text.
    2. cors- TO allow cross origin resource sharing
    3. dotenv- To handle environment variables.
    4. express- Framework
    5. express-rate-limit- To limit the amount of api calls per minute from a single IP
    6. mongoose- Object Document Mapper for Mongodb Database.
    7. jsonwebtoken- For User Login and Authentication.
    8. morgan- Morgan is a logger which logs the request along with some details every time a request is made.
    9. validator- To make validations of email, password etc while storing documents.
    10. http-proxy-middleware- To create a proxy for Connecting frontend and Backend.
    11. concurrently- To start Frontend and Backend servers simultaneously.
- Linters: eslint

Testing
- Framework: Jest
```

## Folder Structure

```
├── client                  # Client Side
├── config                  # Configurations (example test.env)
├── db                      # Database Initialization
├── middlewares             # Functions that come between request and response cycle.
├── models                  # Schemas for Database
├── public                  # Static files (html,css,images etc)
├── routes                  # Routes
├── tests                   # Automated tests (alternatively `spec` or `tests`)
├── utils                   # Tools and utilities(alternatively as tools)
├── .env.example
├── .gitignore
├── app.js                  # Contains express Code
├── index.js                # app is listened
├── Procfile                # Specify deployment for Heroku
└── README.md
```

## Running Locally

- Frontend

  1.  Go to Code on Github Desktop of this repository and copy its http link from there.
  2.  Now Open your terminal. <br>
  3.  Navigate to any directory preferred by you through using `cd` command.<br>
  4.  Clone project there by `git clone <url copied>`<br>
  5.  Navigate to Frontend by` cd BuildWebOnline` and type `cd client` to move to frontend part then type `yarn` to install all packages.<br>
  6.  After Following this steps go to [Getting Started](https://github.com/Naman-1234/BuildWebOnline-Frontend/blob/main/README.md#getting-started-with-create-react-app) for further information.<br>

- Backend<br>

  1.  Navigate to Backend by `cd ..` and type `npm i` to install all packages.<br>
  2.  Type `cp .env.example .env` and replace value of variables there.<br>
  3.  Type `node index.js` to start the server alone, Server will start on Port 3001. To Run on any other port go to index.js and change Value of Port.<br>

- After Above Steps:
  1. After following above steps type `npm run dev` to start frontend and backend concurrently.
  2. By default frontend will run on port 3000 and Backend on the Port 3001
  3. In case you get error messages like `Port already in use` type
     - For Linux: `sudo fuser -k <port>/tcp`, this will kill all the processes associated with port specified.
     - For Windows: `netstat -o -n -a | findstr <port>` ,this will give you all the processes running on different Ports along with their PID. Then kill required one using `taskkill /F /PID <pid>` using cmd as an administrator/

## Learning

Building this project and solving the errors came along was a beautiful journey. This is a great project to anyone who wants to make his/her skills better in MERN Stack or Sole Frontend and Backend.
Through this I got to learn more about

- Frontend:
  1. More About Hooks
     I could certainly say that my knowledge of Hooks has been increased after building this, Some of the hooks used in this are useState(for State Management), useEffect(For the useCase of ComponentDidMount for API Calling), useHistory (To Keep track of all the paths User goes through) and some of the <strong>CustomHooks like useToken</strong>
  2. LocalStorage
     Token has to be stored on the client side to pass it in Authorization Header while making an api call,For that I was considering two options First one is LocalStorage and another one is SessionStorage.TO know which one would be better off in this situation I read more about them and reached to a decision of using localstorage to keep user logged in across multiple windows.
- Backend:
  1. Mongoose
     1. Functions calling on instance and statistics.
     2. Function calling Before Saving and After Saving of data in a database.
     3. Validators and Types in Mongoose.
  2. Postman
     One thing which I did in this project is I made almost all of the Backend before even starting on Frontend. Through this I was able to learn Postman to a great extend, Some of them are:<br>
     1. Made different https verbs(get,post,patch,delete).
     2. Environments in Postman.
     3. Handling authentication in Postman.
  3. Tests
     Tests are being written in Jest to ensure previous features are working fine after adding of new ones.

## I will continue working on this project and will add some more features:

- [x] Improving UI
- [x] Testing using Jest.
- [ ] Option of Login with Google using Passport
- [ ] Integrating Music Player.
