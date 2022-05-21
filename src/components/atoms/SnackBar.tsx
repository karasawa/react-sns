import { memo } from "react";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";

interface State {
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  snackBarOpen: boolean;
}

interface Props {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  message: string;
}

const SnackBar: React.VFC<Props> = memo(({ state, setState, message }) => {
  const { vertical, horizontal, snackBarOpen } = state;

  const handleClose = () => {
    setState({ ...state, snackBarOpen: false });
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackBarOpen}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </Box>
  );
});
export default SnackBar;
