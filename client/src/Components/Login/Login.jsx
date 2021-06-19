import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import history from '../History';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useToken from '../../Utilities/CustomHooks/Token';
import MakeStyle from "./Styles";
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Login() {
  const classes = MakeStyle();
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('testtest');
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const { setToken } = useToken();
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/users/login`, {
        email: email,
        password: password,
      })
      .then((result) => {
        const data = result.data;
        const token = data?.token;
        setOpen(true);
        setToken(token);
        setTimeout(() => {
          history.push('/');
        }, 1500);
      })
      .catch((err) => {
        setOpenError(true);
      });
  };
  return (
    <>
      <Grid container>
        <Grid item xs={6} className='leftImage'>
          <img
            src='images/login.png'
            alt='Profile'
            className='leftImage__img'
          />
        </Grid>
        <Grid item xs={6} className='right'>
          <h1>Login now!!</h1>
          <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
              label='Enter email'
              variant='outlined'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label='Enter Password'
              variant='outlined'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' variant='outlined' color='secondary'>
              Login
            </Button>
          </form>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>
              Login Successful!!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={handleCloseError}
          >
            <Alert onClose={handleCloseError} severity='error'>
              No One found!!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
