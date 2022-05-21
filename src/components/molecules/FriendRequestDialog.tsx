import { memo, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";
import { addFriend } from "../../service/api";
import SnackBar from "../atoms/SnackBar";
import ConfirmationButton from "../atoms/ConfirmationButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 180,
  width: 250,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  requestFriend: any;
}

interface State {
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  snackBarOpen: boolean;
}

const FriendRequestDialog: React.VFC<Props> = memo(
  ({ open, setOpen, requestFriend }) => {
    const currentUser = useRecoilValue(currentUserState);

    const [state, setState] = useState<State>({
      vertical: "top",
      horizontal: "left",
      snackBarOpen: false,
    });

    const confirmationHandle = async () => {
      await addFriend(
        currentUser.currentUserEmail,
        currentUser.currentUserName,
        requestFriend.email,
        requestFriend.name
      );
      await setOpen(false);
      setState({ ...state, snackBarOpen: true });
    };

    return (
      <div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              paragraph
              id="modal-modal-title"
              variant="subtitle1"
              component="div"
              sx={{ color: "#000", textAlign: "center" }}
            >
              {requestFriend.email}さん を友達追加しますか？
            </Typography>
            <Box
              sx={{
                marginTop: 3,
                marginBottom: 3,
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <ConfirmationButton confirmationHandle={confirmationHandle} />
            </Box>
          </Box>
        </Modal>
        <SnackBar
          state={state}
          setState={setState}
          message="友達申請が完了しました"
        />
      </div>
    );
  }
);
export default FriendRequestDialog;
