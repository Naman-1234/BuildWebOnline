import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import useToken from "../../Utilities/CustomHooks/Token";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const useCardStyle = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function DocumentCard(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { token } = useToken();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const cardClasses = useStyles();
  const document = props.document;
  const id = document._id;
  let date = new Date(document.updatedAt);
  date = date.toUTCString();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = (e) => {
    setOpen(false);
    console.log(e.target.outerText);
    if (e.target.outerText === "YES") handleDelete();
  };
  const handleDelete = () => {
    console.log("Made a request");
    axios
      .delete(`/users/documents/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(async (result) => {
        console.log("Successfully deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Grid item xs={3}>
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {document.name[0]}
              </Avatar>
            }
            action={
              <>
                <IconButton
                  aria-label="settings"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>Edit</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClickOpen(id);
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Clicking on Yes will remove this document from our
                      Database and you will not be able to recover this.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClickClose}
                      color="secondary"
                      variant="outlined"
                    >
                      No
                    </Button>
                    <Button
                      onClick={handleClickClose}
                      color="secondary"
                      autoFocus
                      variant="outlined"
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            }
            title={document.name}
            subheader={date}
          />
          <Link
            to={{
              pathname: "/",
              state: {
                srcdoc: document.content,
              },
            }}
          >
            <CardMedia
              className={cardClasses.media}
              component="img"
              src="/images/documents.png"
              title="Code"
            />
          </Link>
        </Card>
      </Grid>
    </>
  );
}

export default DocumentCard;
