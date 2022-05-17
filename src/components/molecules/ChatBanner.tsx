import { memo } from "react";
import { useRecoilValue } from "recoil";
import { chatWithFriendState } from "../../recoil/atom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import BackButton from "../atoms/BackButton";

const ChatBanner = memo(() => {
  const chatWithFriend = useRecoilValue(chatWithFriendState);

  const drawerWidth = 240;

  return (
    <AppBar position="static" sx={{ background: "#4f4c54" }}>
      <Toolbar
        variant="dense"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // minHeight: 50,
        }}
      >
        <BackButton />
        <Typography variant="subtitle2" component="div">
          {chatWithFriend}
        </Typography>
      </Toolbar>
    </AppBar>
  );
});
export default ChatBanner;
