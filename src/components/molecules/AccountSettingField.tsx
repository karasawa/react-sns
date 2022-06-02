import { memo, useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";
import Typography from "@mui/material/Typography";
import AccountSettingButton from "../atoms/AccountSettingButton";
import SnackBar from "../atoms/SnackBar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { storage } from "../../service/firebase";

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
    const [profileImage, setProfileImage] = useState<any>("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(100);

    const userImg: any = useRef();

    const onChange = (e: any) => {
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

    const uploadImage = () => {
      if (profileImage === "") {
        console.log("no profileImage");
        return;
      }
      const storageRef = storage.ref("images/test/"); //どのフォルダの配下に入れるかを設定
      const imagesRef = storageRef.child(profileImage.name); //ファイル名

      console.log("ファイルをアップする行為");
      const upLoadTask = imagesRef.put(profileImage);
      console.log("タスク実行前");

      upLoadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("snapshot", snapshot);
          const percent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(percent + "% done");
          setProgress(percent);
        },
        (error) => {
          console.log("err", error);
          setError("ファイルアップに失敗しました。" + error);
          setProgress(100); //実行中のバーを消す
        },
        () => {
          upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImageUrl(downloadURL);
          });
        }
      );
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              height="110"
              width="110"
              style={{ borderRadius: 100 }}
              ref={userImg}
            />
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                marginTop: 9,
                marginLeft: 9,
                background: "#fff",
                opacity: 0.5,
              }}
            >
              <CameraAltIcon />
              <input type="file" accept="image/*" hidden onChange={onChange} />
            </IconButton>
          </Box>
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
        <Button onClick={uploadImage}>upload</Button>
      </Box>
    );
  }
);
export default AccountSettingField;
