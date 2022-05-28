import { memo, useState, useEffect } from "react";
import Header from "../organisms/Header";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { initGet, initGets } from "../../service/api";
import FriendList from "../organisms/FriendList";
import LeftHomeDrawer from "../organisms/LeftHomeDrawer";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";
import RightHomeDrawer from "../organisms/RightHomeDrawer";
import Footer from "../organisms/Footer";

const Home = memo(() => {
  const [friend, setFriend] = useState<any[]>([]);
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
    if (friends) {
      await setFriend(friends[0].friend);
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
