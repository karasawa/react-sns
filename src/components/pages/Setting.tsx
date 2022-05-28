import { memo, useEffect, useState } from "react";
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

interface State {
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  snackBarOpen: boolean;
}

const Setting = memo(() => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [name, setName] = useState(currentUser.currentUserName);

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
    setState({ ...state, snackBarOpen: true });
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
        />
      </Box>
      <Footer />
      {/* <RightHomeDrawer /> */}
    </Box>
  );
});
export default Setting;
