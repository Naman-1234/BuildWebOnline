import React,{useState} from "react";
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
import axios from "axios";
import useToken from "../../Utilities/CustomHooks/Token"
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
  const {token} = useToken();
  const classes = useStyles();
  const cardClasses = useStyles();
  const document = props.document;
  const id= document._id;
  let date = new Date(document.updatedAt);
  date = date.toUTCString();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = (id)=>{
    console.log('Made a request');
    axios.delete(`/users/documents/delete/${id}`,{
      headers: {
        Authorization: token,
      },
    })
    .then(async (result) => {
    console.log('Successfully deleted')
    })
    .catch((err) => {
      console.log(err);
    });
  
  }
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
              <IconButton aria-label="settings"  aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
               <Menu
               id="simple-menu"
               anchorEl={anchorEl}
               keepMounted
               open={Boolean(anchorEl)}
               onClose={handleClose}
             >
               <MenuItem >
               Edit
               </MenuItem>
               <MenuItem
               onClick={()=>{
                 handleDelete(id)
               }
               }
               >
               Delete
               </MenuItem>
               </ Menu>
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
