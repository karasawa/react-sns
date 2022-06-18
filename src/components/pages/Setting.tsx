import { memo, useEffect, useState, useRef } from "react";
import Header from "../organisms/Header";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import LeftHomeDrawer from "../organisms/LeftHomeDrawer";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../recoil/atom";
import RightHomeDrawer from "../organisms/RightHomeDrawer";
import Footer from "../organisms/Footer";
import { updateAccountInfo } from "../../service/api";
import AccountSettingField from "../molecules/AccountSettingField";
import { storage } from "../../service/firebase";

interface State {
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  snackBarOpen: boolean;
}

const Setting = memo(() => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [name, setName] = useState(currentUser.currentUserName);
  const [profileImage, setProfileImage] = useState<any>("");
  const [imageUrl, setImageUrl] = useState("");

  const userImg: React.MutableRefObject<any> = useRef();

  const [state, setState] = useState<State>({
    vertical: "top",
    horizontal: "left",
    snackBarOpen: false,
  });

  const navigate = useNavigate();

  const drawerWidth = 240;

  useEffect(() => {
    if (!currentUser.currentUserEmail) {
      navigate("/");
    }
  }, [currentUser]);

  const updateHandle = async () => {
    const newData = await updateAccountInfo(currentUser.currentUserEmail, name);
    if (newData !== undefined) {
      setCurrentUser({ ...currentUser, currentUserName: newData });
    }
    await console.log(newData);
    await setState({ ...state, snackBarOpen: true });
    uploadImage();
  };

  const uploadImage = () => {
    if (profileImage === "") {
      console.log("no profileImage");
      return;
    }
    const storageRef = storage.ref("images/");
    const imagesRef = storageRef.child(`${currentUser.currentUserEmail}.jpeg`);

    const upLoadTask = imagesRef.put(profileImage);
    upLoadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("snapshot", snapshot);
      },
      (error) => {
        console.log("err", error);
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <LeftHomeDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <AccountSettingField
          name={name}
          setName={setName}
          updateHandle={updateHandle}
          state={state}
          setState={setState}
          setImageUrl={setImageUrl}
          setProfileImage={setProfileImage}
          userImg={userImg}
        />
      </Box>
      <Footer />
      {/* <RightHomeDrawer /> */}
    </Box>
  );
});
export default Setting;
