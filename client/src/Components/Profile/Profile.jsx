import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";
import history from "../History";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import useToken from "../../Utilities/CustomHooks/Token";
const { REACT_APP_URL } = process.env;

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
    const url = REACT_APP_URL;
    if (btnName === "update") {
      axios
        .patch(
          `${url}/users/me/${id}`,
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
        .delete(`${url}/users/me/${id}`, {
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

  const url = REACT_APP_URL;
  useEffect(() => {
    axios
      .get(`${url}/users/me`, {
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
        <>
          <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="filled"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Phone No."
              variant="filled"
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
              variant="filled"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Delete
            </Button>
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
        </>
      )}
    </div>
  );
}

export default Profile;