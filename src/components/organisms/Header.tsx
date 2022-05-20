import { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logOut } from "../../service/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, chatWithFriendState } from "../../recoil/atom";
import BackButton from "../atoms/BackButton";

const Header = memo(() => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const chatWithFriend = useRecoilValue(chatWithFriendState);
  const navigate = useNavigate();
  const location = useLocation();

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
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: "#000",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {location.pathname === "/chat" ? <BackButton /> : <></>}
            <Typography variant="h6">
              {location.pathname === "/chat"
                ? `${chatWithFriend.chatWithFriendName}`
                : "React SNS"}
            </Typography>
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
