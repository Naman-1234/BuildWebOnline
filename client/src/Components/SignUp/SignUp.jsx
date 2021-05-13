import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import axios from "axios";
import history from "../History";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
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

function SignUp() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
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
    console.log("URL IS ", REACT_APP_URL);
    axios
      .post(`/users/signup`, {
        name: name,
        phoneNo: phoneNo,
        gender: gender,
        email: email,
        password: password,
      })
      .then((result) => {
        setOpen(true);
        setTimeout(() => {
          history.push("/");
        }, 2500);
      })
      .catch((err) => {
        console.trace(err);
        setOpenError(true);
      });
  };

  return (
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
        <TextField
          label="Enter Password"
          variant="filled"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          SignUp
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
  );
}
export default SignUp;
