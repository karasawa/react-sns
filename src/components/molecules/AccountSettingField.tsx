import { memo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";
import Typography from "@mui/material/Typography";
import AccountSettingButton from "../atoms/AccountSettingButton";
import SnackBar from "../atoms/SnackBar";

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  updateHandle: () => void;
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

interface State {
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  snackBarOpen: boolean;
}

const AccountSettingField: React.VFC<Props> = memo(
  ({ name, setName, updateHandle, state, setState }) => {
    const currentUser = useRecoilValue(currentUserState);

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 500,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="subtitle1"
          component="div"
          sx={{
            color: "#4a453a",
            textAlign: "center",
            margin: 0,
            fontSize: 18,
          }}
        >
          メールアドレス
        </Typography>
        <TextField
          disabled
          id="outlined-basic"
          placeholder="メールアドレス"
          sx={{
            width: 350,
            background: "#fff",
            borderRadius: 1,
          }}
          value={currentUser.currentUserEmail}
        />
        <Typography
          id="modal-modal-title"
          variant="subtitle1"
          component="div"
          sx={{
            color: "#4a453a",
            textAlign: "center",
            margin: 0,
            marginTop: 2,
            fontSize: 18,
          }}
        >
          ニックネーム
        </Typography>
        <TextField
          id="outlined-basic"
          placeholder="ニックネーム"
          sx={{ width: 350, background: "#fff", borderRadius: 1 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AccountSettingButton updateHandle={updateHandle} />
        <SnackBar
          state={state}
          setState={setState}
          message="アカウント情報を更新しました"
        />
      </Box>
    );
  }
);
export default AccountSettingField;
