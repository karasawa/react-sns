import { memo, useState, useEffect } from "react";
import Header from "../organisms/Header";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { initGet, compare } from "../../service/api";
import FriendList from "../organisms/FriendList";
import LeftHomeDrawer from "../organisms/LeftHomeDrawer";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";
import RightHomeDrawer from "../organisms/RightHomeDrawer";
import Footer from "../organisms/Footer";

const Home = memo(() => {
  const [friend, setFriend] = useState<any>([]);
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  const drawerWidth = 240;

  useEffect(() => {
    if (!currentUser.currentUserEmail) {
      navigate("/");
    }
  }, [currentUser]);

  useEffect(() => {
    fetch();
  }, [currentUser]);

  const fetch = async () => {
    const friends = await initGet(currentUser.currentUserEmail);
    friends.forEach(async (friend: any) => {
      await friend.chat.sort(compare);
      const chat_length = await friend.chat.length;
      friend.most_new_mes = await friend.chat[chat_length - 1];
      const login_time = await friend.chat_page_login.seconds;
      const unRead_message = friend.chat.filter(
        (data: any) =>
          data.from !== currentUser.currentUserEmail &&
          data.send_time.seconds > login_time
      );
      friend.unRead_message = await unRead_message.length;
    });
    if (friends) {
      await setFriend(friends);
    }
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
        <FriendList friend={friend} fetch={fetch} />
      </Box>
      <Footer />
      {/* <RightHomeDrawer /> */}
    </Box>
  );
});
export default Home;
