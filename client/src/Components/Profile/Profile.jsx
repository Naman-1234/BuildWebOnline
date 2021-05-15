import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";
import history from "../History";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import useToken from "../../Utilities/CustomHooks/Token";
import "./Profile.scss";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));
const useContainerStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "100vh",
  },
}));
const genderItems = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];
function Profile() {
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState({});
  const { token, setToken, removeToken } = useToken();
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [id, setId] = useState("");
  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const btnName = e.nativeEvent.submitter.innerText.toLowerCase();
    if (btnName === "update") {
      axios
        .patch(
          `/users/me/${id}`,
          {
            name: name,
            phoneNo: phoneNo,
            gender: gender,
            email: email,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((result) => {
          <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="success">Successfully Updated Profile</Alert>
          </Snackbar>;
        })
        .catch((err) => {
          <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="error">Enter correct Credentials Please!!</Alert>
          </Snackbar>;
        });
    } else {
      axios
        .delete(`/users/me/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((result) => {
          removeToken();
          <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="success">Successfully Updated Profile</Alert>
          </Snackbar>;
          history.length = 0;
          history.push("/");
        })
        .catch((err) => {
          <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="error">Enter correct Credentials Please!!</Alert>
          </Snackbar>;
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
  }, []);

  return (
    <div>
      {showProfile && (
        <Grid container className={containerClasses.root}>
          <Grid item xs={6} className="left">
            <img src="images/profile.png" alt="Profile" className="left__img" />
          </Grid>
          <Grid item xs={6} className="right">
            <h1>Profile</h1>
            <form onSubmit={handleSubmit} className={classes.root}>
              <TextField
                label="Name"
                variant="outlined"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Phone No."
                variant="outlined"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <TextField
                id="standard-select-currency"
                select
                label="Select"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                helperText="Please select your Gender"
              >
                {genderItems.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Email"
                variant="outlined"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Grid
                container
                style={{
                  textAlign: "center",
                }}
              >
                <Grid item xs={6}>
                  <Button type="submit" variant="outlined" color="secondary">
                    Update
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button type="submit" variant="outlined" color="secondary">
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                SignUp Successful!!
              </Alert>
            </Snackbar>
            <Snackbar
              open={openError}
              autoHideDuration={6000}
              onClose={handleCloseError}
            >
              <Alert onClose={handleCloseError} severity="error">
                Error While Signup!!
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default Profile;
