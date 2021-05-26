import { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function useAlert(props) {
  const [open, setOpen] = useState(props.open || false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const { severity, text } = props.severity;
  // return {
  //   component: (
  //     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  //       <Alert onClose={handleClose} severity={severity}>
  //         {text}
  //       </Alert>
  //     </Snackbar>
  //   ),
  //   setOpen: setOpen,
  //   handleClose: handleClose,
  // };
  return {
    component: (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {text}
        </Alert>
      </Snackbar>
    ),
  };
}
export default useAlert;
