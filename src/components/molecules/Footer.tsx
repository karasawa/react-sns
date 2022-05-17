import { memo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import { sendMessage } from "../../service/api";
import { useRecoilValue } from "recoil";
import { chatWithFriendState } from "../../recoil/atom";
import { getCookie } from "typescript-cookie";

interface Props {
  chatFetch: () => void;
}

const Footer: React.VFC<Props> = memo(({ chatFetch }) => {
  const drawerWidth = 240;

  const [message, setMessage] = useState<string>("");

  const currentUser = getCookie("currentUser");
  const chatWithFriend = useRecoilValue(chatWithFriendState);

  const sendHandle = async () => {
    await sendMessage(currentUser, chatWithFriend, message);
    chatFetch();
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: 65,
          ml: 0,
          background: "#000",
          top: "auto",
          bottom: 0,
          // display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar
          sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
        >
          <TextField
            id="outlined-basic"
            size="small"
            placeholder="メッセージを入力"
            sx={{
              background: "#fff",
              borderRadius: 1,
              width: "60%",
            }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button sx={{ color: "#fff" }} onClick={sendHandle}>
            送信
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
});
export default Footer;
