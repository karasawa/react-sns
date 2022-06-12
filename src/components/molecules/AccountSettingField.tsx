import { memo, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";
import AccountSettingButton from "../atoms/AccountSettingButton";
import SnackBar from "../atoms/SnackBar";
import ImageSettingField from "./ImageSettingField";
import { storage } from "../../service/firebase";

interface Props {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  updateHandle: () => void;
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  setImageUrl: React.Dispatch<React.SetStateAction<any>>;
  setProfileImage: React.Dispatch<React.SetStateAction<any>>;
  userImg: any;
}

interface State {
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  snackBarOpen: boolean;
}

const AccountSettingField: React.VFC<Props> = memo(
  ({
    name,
    setName,
    updateHandle,
    state,
    setState,
    setImageUrl,
    setProfileImage,
    userImg,
  }) => {
    const currentUser = useRecoilValue(currentUserState);

    useEffect(() => {
      storage
        .ref()
        .child(`images/${currentUser.currentUserEmail}.jpeg`)
        .getDownloadURL()
        .then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
          userImg.current.setAttribute("src", downloadURL);
        })
        .catch((err) => {
          storage
            .ref()
            .child(`images/defaultIcon.jpg`)
            .getDownloadURL()
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              setImageUrl(downloadURL);
              userImg.current.setAttribute("src", downloadURL);
            });
        });
    }, []);

    const imageChange = (e: any) => {
      const image = e.target.files[0];
      console.log(image);
      setProfileImage(image);
      userImg.current.title = image.name;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        userImg.current.setAttribute("src", event.target.result);
      };
      reader.readAsDataURL(image);
    };

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: 400,
          }}
        >
          <ImageSettingField imageChange={imageChange} userImg={userImg} />
          <TextField
            label="email"
            disabled
            id="outlined-basic"
            placeholder="メールアドレス"
            sx={{
              width: 270,
              background: "#fff",
              borderRadius: 1,
            }}
            value={currentUser.currentUserEmail}
          />
          <TextField
            id="outlined-basic"
            label="user"
            sx={{ width: 270, background: "#fff", borderRadius: 1 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <AccountSettingButton updateHandle={updateHandle} />
          </Box>
          <SnackBar
            state={state}
            setState={setState}
            message="アカウント情報を更新しました"
          />
        </Box>
      </Box>
    );
  }
);
export default AccountSettingField;
