# Table of Contents:
- [About](https://github.com/Naman-1234/BuildWebOnline-Frontend/blob/main/README.md#about)
- [Getting Started](https://github.com/Naman-1234/BuildWeb/blob/main/README.md#getting-started-with-create-react-app) for Frontend

## BuildWebOnline
BuildWebOnline is a webApp on which anyone can come and start building awesome webpages.Since it will be stored online, you don't need to worry about your documents even if your device gets damaged or something.

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
- Linters: eslint
```

## Usage
Please find the following video to know how to use this

## Glimpse 
## Running Locally
- Frontend
     1. Go to Code on Github Desktop of this repository and copy its http link from there.
     2. Now Open your terminal.   <br>
     3. Navigate to any directory preferred by you through using `cd` command.<br>
     4. Clone project there by `git clone <url copied>`<br>
     5. Navigate to Frontend by` cd BuildWebOnline` and type `cd client` to move to frontend part then type `npm i` to install all packages.<br>
     6. After Following this steps go to  [Getting Started](https://github.com/Naman-1234/BuildWebOnline-Frontend/blob/main/README.md#getting-started-with-create-react-app) for further information.<br>

- Backend<br>
     1. Navigate to Backend by `cd ..` and type `npm i` to install all packages.<br>
     2. Type `cp .env.example .env` and replace value of variables there.<br>
     3. Type `node index.js` to start the server locally, Server will start on Port 7000. To Run on any other port go to index.js and change Value of Port.<br>

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

## I will continue working on this project and will add some more features:
- Improving UI.
- Testing using Jest.
- Giving Options of Logging through other Platforms like Google, Github etc if possible.
- Setting Document Visible to all if user permits, to make others see that amazing project.
     
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
