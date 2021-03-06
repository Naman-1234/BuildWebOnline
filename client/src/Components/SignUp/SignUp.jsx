import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import history from '../History';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FileBase from 'react-file-base64';
import './Signup.scss';
import MakeStyle from './Styles';
import useUsers from '../../api/Users';
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const genderItems = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
];

function SignUp() {
  const classes = MakeStyle();
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setavatar] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const { signUpUser } = useUsers();
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { result, msg } = await signUpUser(
      name,
      phoneNo,
      gender,
      email,
      password,
      avatar
    );
    if (msg === 'success') {
      setOpen(true);
      setTimeout(() => {
        history.push('/');
      }, 2500);
    } else {
      setErrorMessage(result);
      setOpenError(true);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={6} className='left'>
          <img src='images/signup.png' alt='Profile' className='left__img' />
        </Grid>
        <Grid item xs={6} className='right'>
          <h1>Signup Now</h1>
          <form onSubmit={handleSubmit} className={classes.root}>
            <TextField
              label='Name'
              variant='outlined'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label='Enter Password'
              variant='outlined'
              required
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label='Phone No.'
              variant='outlined'
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            <TextField
              id='standard-select-currency'
              select
              label='Select'
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              helperText='Please select your Gender'
            >
              {genderItems.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label='Email'
              variant='outlined'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <FileBase
                type='file'
                multiple={false}
                onDone={(base64) => {
                  // setavatar(base64[0].base64);
                  // console.log(base64.base64);
                  setavatar(base64.base64);
                }}
              />
            </div>
            <Button type='submit' variant='outlined' color='secondary'>
              SignUp
            </Button>
          </form>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>
              SignUp Successful!!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={handleCloseError}
          >
            <Alert onClose={handleCloseError} severity='error'>
              {errorMessage !== [] &&
                errorMessage.map((message) => {
                  return (
                    <>
                      <span>{message}</span>
                      <br></br>
                    </>
                  );
                })}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </>
  );
}
export default SignUp;
