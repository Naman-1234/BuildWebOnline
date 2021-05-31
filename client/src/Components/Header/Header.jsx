import React, { useState, useEffect } from 'react';
import './Header.scss';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import history from '../History';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import useDocument from '../../Utilities/CustomHooks/Document';
import useToken from '../../Utilities/CustomHooks/Token';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
function Header() {
  const [isAuthorized, setAuthorized] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState('Untitled');
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [openError, setErrorOpen] = useState(false);
  const [openLogOut, setLogOut] = useState(false);
  const { token, removeToken } = useToken();
  const [errorMessage, setErrorMessage] = useState([]);
  const [documentSaved, setDocumentSaved] = useState(false);
  const { getsrc } = useDocument();
  useEffect(() => {
    setTimeout(() => {
      if (token) setAuthorized(true);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseLogOut = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setLogOut(false);
  };
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
  };
  const handleCloseDocumentSave = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDocumentSaved(false);
  };

  const classes = useStyles();
  return (
    <div className='header'>
      <div className='header__left'>
        <img
          src='images/logo.png'
          alt='code'
          className='img'
          role='button'
          type='button'
          onClick={() => {
            history.push('/');
          }}
        ></img>
        {isAuthorized && (
          <div className='Save'>
            <input
              type='textarea'
              name='textarea'
              className='inputName'
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={name}
              readOnly={isReadOnly}
            />
            <p>
              <IconButton
                aria-label='edit'
                size='small'
                onClick={() => {
                  setIsReadOnly(!isReadOnly);
                }}
              >
                <EditIcon size='small' className='white' />
              </IconButton>
            </p>
          </div>
        )}
      </div>
      <div className='header__right'>
        {isAuthorized && (
          <>
            <Button
              variant='contained'
              color='primary'
              size='small'
              className={[classes.button, 'button'].join(' ')}
              startIcon={<SaveIcon />}
              onClick={() => {
                const src = getsrc();
                axios
                  .post(
                    `/users/documents/add`,
                    {
                      name: name,
                      content: src,
                    },
                    {
                      headers: {
                        Authorization: token,
                      },
                    }
                  )
                  .then((result) => {
                    console.log('Success in Adding document');
                    setDocumentSaved(true);
                  })
                  .catch((err) => {
                    setErrorMessage(err.response.data);
                    setErrorOpen(true);
                    setTimeout(() => {}, 1500);
                  });
              }}
            >
              Save
            </Button>
            <Button
              aria-controls='simple-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              <Avatar
                src='images/avatar.png'
                alt='Avatar'
                className='avatarImage'
              />
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  history.push('/Profile');
                }}
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push('/Documents');
                }}
              >
                My Documents
              </MenuItem>
              <MenuItem
                onClick={() => {
                  removeToken();
                  axios
                    .get(`/users/logout`, {
                      headers: {
                        Authorization: token,
                      },
                    })
                    .then((result) => {
                      setLogOut(true);
                      setTimeout(() => {
                        history.push('/');
                      }, 1500);
                    })
                    .catch((err) => {
                      setErrorMessage('Logout unsuccessful');
                      setErrorOpen(true);
                    });
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}

        {!isAuthorized && (
          <>
            <Button
              variant='contained'
              color='primary'
              size='small'
              className={[classes.button, 'button'].join(' ')}
              onClick={() => {
                history.push('/Login');
              }}
            >
              Login
            </Button>
            <Button
              variant='contained'
              color='primary'
              size='small'
              className={[classes.button, 'button'].join(' ')}
              onClick={() => {
                history.push('/SignUp');
              }}
            >
              Signup
            </Button>
          </>
        )}
        <Snackbar
          open={openLogOut}
          autoHideDuration={6000}
          onClose={handleCloseLogOut}
        >
          <Alert onClose={handleCloseLogOut} severity='success'>
            Logged Out Successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity='error'>
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
        <Snackbar
          open={documentSaved}
          autoHideDuration={6000}
          onClose={handleCloseDocumentSave}
        >
          <Alert onClose={handleCloseDocumentSave} severity='success'>
            Document Saved Successfully
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Header;
