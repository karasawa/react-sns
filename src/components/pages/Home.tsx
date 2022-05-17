import { memo, useState, useEffect } from "react";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { initGet } from "../../service/api";
import { getCookie } from "typescript-cookie";
import FriendList from "../organisms/FriendList";
import HomeDrawer from "../organisms/HomeDrawer";

const Home = memo(() => {
  const [friend, setFriend] = useState<string[]>([]);
  const navigate = useNavigate();
  const currentUser = getCookie("currentUser");

  const drawerWidth = 240;

  useEffect(() => {
    if (!getCookie("currentUser")) {
      navigate("/");
    }
  }, [getCookie("currentUser")]);

  useEffect(() => {
    fetch();
  }, [currentUser]);

  const fetch = async () => {
    const friends = await initGet(currentUser);
    await setFriend(friends[0].friend);
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
        <FriendList friend={friend} fetch={fetch} />
      </Box>
    </Box>
  );
});
export default Home;
