import { memo, useEffect } from "react";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Box from "@mui/material/Box";
import { useRecoilState } from "recoil";
import { chatWithFriendState } from "../../recoil/atom";
import { chatGet } from "../../service/api";
import { getCookie } from "typescript-cookie";

const Chat = memo(() => {
  const currentUser = getCookie("currentUser");
  const [chatWithFriend, setChatWithFriend] =
    useRecoilState(chatWithFriendState);

  useEffect(() => {
    chatFetch();
  }, []);

  const chatFetch = async () => {
    const data = await chatGet(currentUser, chatWithFriend);
    console.log(data);
  };
  return (
    <Box>
      <Header />
      {chatWithFriend}
      <Footer />
    </Box>
  );
});
export default Chat;
