import { memo, useState, useEffect } from "react";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { chatWithFriendState } from "../../recoil/atom";
import { chatGet } from "../../service/api";
import { getCookie } from "typescript-cookie";
import ChatList from "../organisms/ChatList";

const Chat = memo(() => {
  const currentUser = getCookie("currentUser");
  const [chatWithFriend, setChatWithFriend] =
    useRecoilState(chatWithFriendState);
  const [chat, setChat] = useState<any>([]);

  useEffect(() => {
    chatFetch();
  }, []);

  const chatFetch = async () => {
    const chats = await chatGet(currentUser, chatWithFriend);
    await setChat(chats);
    console.log(chat);
  };
  return (
    <Box>
      <Header />
      {/* {chat.map((chatData: ChatData, index: number) => (
        <li key={index}>{chatData.message}</li>
      ))} */}
      <ChatList chat={chat} />
      <Footer />
    </Box>
  );
});
export default Chat;
