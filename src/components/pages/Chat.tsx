import { memo, useState, useEffect } from "react";
import Header from "../organisms/Header";
import InputMessageBanner from "../molecules/InputMessageBanner";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentUserState, chatWithFriendState } from "../../recoil/atom";
import { chatGet, updateChatPageLogin } from "../../service/api";
import ChatList from "../organisms/ChatList";
import LeftHomeDrawer from "../organisms/LeftHomeDrawer";
import RightHomeDrawer from "../organisms/RightHomeDrawer";
import { useNavigate } from "react-router-dom";

const Chat = memo(() => {
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  const [chatWithFriend, setChatWithFriend] =
    useRecoilState(chatWithFriendState);

  const [chat, setChat] = useState<any[]>([]);

  const drawerWidth = 240;

  useEffect(() => {
    if (!currentUser.currentUserEmail) {
      navigate("/");
    }
  }, [currentUser]);

  useEffect(() => {
    chatFetch();
  }, []);

  const chatFetch = async () => {
    const chats = await chatGet(
      currentUser.currentUserEmail,
      chatWithFriend.chatWithFriendEmail
    );
    await setChat(chats);
    console.log(chats);
    // const user = await updateChatPageLogin(
    //   currentUser.currentUserEmail,
    //   chatWithFriend.chatWithFriendEmail
    // );
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
        <ChatList chat={chat} />
        <InputMessageBanner chatFetch={chatFetch} />
      </Box>
      {/* <RightHomeDrawer /> */}
    </Box>
  );
});
export default Chat;
