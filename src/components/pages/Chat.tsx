import { memo, useState, useEffect } from "react";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useRecoilState } from "recoil";
import { chatWithFriendState } from "../../recoil/atom";
import { chatGet } from "../../service/api";
import { getCookie } from "typescript-cookie";
import ChatList from "../organisms/ChatList";
import ChatBanner from "../molecules/ChatBanner";
import HomeDrawer from "../organisms/HomeDrawer";

const Chat = memo(() => {
  const currentUser = getCookie("currentUser");

  const [chatWithFriend, setChatWithFriend] =
    useRecoilState(chatWithFriendState);

  const [chat, setChat] = useState<any>([]);

  const drawerWidth = 240;

  useEffect(() => {
    chatFetch();
  }, []);

  const chatFetch = async () => {
    const chats = await chatGet(currentUser, chatWithFriend);
    await setChat(chats);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <HomeDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <ChatBanner />
        <ChatList chat={chat} />
        <Footer chatFetch={chatFetch} />
      </Box>
    </Box>
  );
});
export default Chat;
