import { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logOut } from "../../service/firebase";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../recoil/atom";

const Header = memo(() => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const navigate = useNavigate();

  const drawerWidth = 240;

  const logoutHandle = async () => {
    await logOut();
    await setCurrentUser({
      currentUserEmail: "",
      currentUserName: "",
    });
    navigate("/");
  };

  return (
    <>
      {currentUser.currentUserEmail ? (
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            background: "#000",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">React SNS</Typography>
            <Button sx={{ color: "#fff" }} onClick={logoutHandle}>
              ログアウト
            </Button>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="fixed" sx={{ background: "#000" }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">React SNS</Typography>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
});
export default Header;
