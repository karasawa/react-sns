import { memo, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logOut } from "../../service/firebase";
import { useNavigate } from "react-router-dom";
import { currentUserState } from "../../recoil/atom";
import { useRecoilState } from "recoil";

const Header = memo(() => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const navigate = useNavigate();

  const logoutHandle = async () => {
    await logOut();
    await setCurrentUser("");
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">React SNS</Typography>
        {currentUser ? (
          <Button sx={{ color: "#fff" }} onClick={logoutHandle}>
            ログアウト
          </Button>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
});
export default Header;
