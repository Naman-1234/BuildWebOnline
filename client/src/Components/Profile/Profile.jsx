import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import history from '../History';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useToken from '../../Utilities/CustomHooks/Token';
import FileBase from 'react-file-base64';
import useUsers from '../../api/Users';
import './Profile.scss';
import MakeStyle from './Styles';
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useContainerStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '100vh',
  },
}));
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
function Profile() {
  const [showProfile, setShowProfile] = useState(false);
  const { token, removeToken } = useToken();
  const classes = MakeStyle();
  const containerClasses = useContainerStyles();
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [open, setOpen] = useState(false);
  const [openUpdate, setUpdateOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [id, setId] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const { updateProfile } = useUsers();
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
  const handleUpdateClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setUpdateOpen(false);
  };
  const handleDeleteClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenDelete(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const btnName = e.nativeEvent.submitter.innerText.toLowerCase();
    if (btnName === 'update') {
      const { result, msg } = await updateProfile(
        id,
        name,
        phoneNo,
        gender,
        email,
        imageSrc
      );
      if (msg === 'err') {
        setErrorMessage(result);
        setOpenError(true);
        setTimeout(() => {}, 1500);
      } else setUpdateOpen(true);
    } else {
      axios
        .delete(`/users/me/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          removeToken();
          setOpenDelete(true);
          setTimeout(() => {
            history.length = 0;
            history.push('/');
          }, 1500);
        })
        .catch((err) => {
          setOpenError(true);
          setTimeout(() => {}, 1500);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`/users/me`, {
        headers: {
          Authorization: token,
        },
      })
      .then(async (result) => {
        const profile = result.data;
        setName(profile.name);
        setPhoneNo(profile.phoneNo);
        setGender(profile.gender);
        setEmail(profile.email);
        setId(profile._id);
        setShowProfile(true);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {showProfile && (
        <Grid container className={containerClasses.root}>
          <Grid item xs={6} className='left'>
            <img src='images/profile.png' alt='Profile' className='left__img' />
          </Grid>
          <Grid item xs={6} className='right'>
            <h1>Profile</h1>
            <form onSubmit={handleSubmit} className={classes.root}>
              <TextField
                label='Name'
                variant='outlined'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                    setImageSrc(base64.base64);
                  }}
                />
              </div>
              <Grid
                container
                style={{
                  textAlign: 'center',
                }}
              >
                <Grid item xs={6}>
                  <Button type='submit' variant='outlined' color='secondary'>
                    Update
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button type='submit' variant='outlined' color='secondary'>
                    Delete
                  </Button>
                </Grid>
              </Grid>
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
                Error While Signup!!
              </Alert>
            </Snackbar>
          </Grid>
          <Snackbar
            open={openUpdate}
            autoHideDuration={6000}
            onClose={handleUpdateClose}
          >
            <Alert severity='success' onClose={handleUpdateClose}>
              Successfully Updated Profile
            </Alert>
          </Snackbar>
          ;
          <Snackbar
            open={openDelete}
            autoHideDuration={6000}
            onClose={handleDeleteClose}
          >
            <Alert severity='success' onClose={handleDeleteClose}>
              Successfully Deleted Profile
            </Alert>
          </Snackbar>
          ;
          <Snackbar
            open={openError}
            autoHideDuration={6000}
            onClose={handleCloseError}
          >
            <Alert severity='error' onClose={handleCloseError}>
              {errorMessage !== [] &&
                errorMessage.map((msg) => {
                  return (
                    <>
                      <span>{msg}</span>
                      <br></br>
                    </>
                  );
                })}
            </Alert>
          </Snackbar>
          ;
        </Grid>
      )}
    </div>
  );
}

export default Profile;
