import React, { useState, useEffect } from "react";
import "./Header.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import SettingIcon from "@material-ui/icons/Settings";
import EditIcon from "@material-ui/icons/Edit";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import history from "../History";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import useToken from "../../Utilities/CustomHooks/Token";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Header(props) {
  const [isAuthorized, setAuthorized] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("Untitled");
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [openLogOut, setLogOut] = useState(false);
  const { token, setToken, removeToken } = useToken();

  useEffect(() => {
    setTimeout(() => {
      if (token) setAuthorized(true);
    }, 100);
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseLogOut = () => {
    setLogOut(false);
  };

  const classes = useStyles();
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="images/logo.png"
          alt="code"
          className="img"
          role="button"
          type="button"
          onClick={() => {
            history.push("/");
          }}
        ></img>
        {isAuthorized && (
          <div className="Save">
            <input
              type="textarea"
              name="textarea"
              className="inputName"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder={name}
              readOnly={isReadOnly}
            />
            <p>
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => {
                  setIsReadOnly(!isReadOnly);
                }}
              >
                <EditIcon size="small" className="white" />
              </IconButton>
            </p>
          </div>
        )}
      </div>
      <div className="header__right">
        {isAuthorized && (
          <>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={[classes.button, "button"].join(" ")}
              startIcon={<SaveIcon />}
              onClick={() => {
                const srcdoc = props.srcdoc;
                axios
                  .post(
                    `/users/documents/add`,
                    {
                      name: name,
                      content: srcdoc,
                    },
                    {
                      headers: {
                        Authorization: token,
                      },
                    }
                  )
                  .then((result) => {
                    console.log("Success in Adding document");
                  })
                  .catch((err) => {
                    throw new Error(err);
                  });
              }}
            >
              Save
            </Button>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar
                src="images/avatar.png"
                alt="Avatar"
                className="avatarImage"
              />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  history.push("/Profile");
                }}
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push("/users/Documents");
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
                        history.length = 0;
                        history.push("/");
                      }, 1500);
                    })
                    .catch((err) => {
                      console.log(err);
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
              variant="contained"
              color="primary"
              size="small"
              className={[classes.button, "button"].join(" ")}
              onClick={() => {
                history.push("/Login");
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={[classes.button, "button"].join(" ")}
              onClick={() => {
                history.push("/SignUp");
              }}
            >
              Signup
            </Button>
            <Snackbar
              open={openLogOut}
              autoHideDuration={6000}
              onClose={handleCloseLogOut}
            >
              <Alert onClose={handleCloseLogOut} severity="success">
                Logged Out Successfully
              </Alert>
            </Snackbar>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
