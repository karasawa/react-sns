import { memo, useState, useEffect } from "react";
import Header from "../organisms/Header";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { friendSearch, initGet } from "../../service/api";
import LeftHomeDrawer from "../organisms/LeftHomeDrawer";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";
import RightHomeDrawer from "../organisms/RightHomeDrawer";
import Footer from "../molecules/Footer";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import UserList from "../organisms/UserList";

const Request = memo(() => {
  const [friend, setFriend] = useState<any[]>([]);
  const [searchResult, setSearchResult] = useState("");
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  const drawerWidth = 240;

  useEffect(() => {
    if (!currentUser.currentUserEmail) {
      navigate("/");
    }
  }, [currentUser]);

  const userFetch = async () => {
    const friends = await friendSearch(searchResult);
    await setFriend(friends);
    console.log(friend);
    console.log(searchResult);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            size="small"
            placeholder="メールアドレスで友達を検索"
            sx={{ width: 280 }}
            value={searchResult}
            onChange={(e) => setSearchResult(e.target.value)}
          />
          <IconButton
            edge="end"
            aria-label="search"
            sx={{
              m: 1,
              color: "#000",
            }}
            onClick={userFetch}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <UserList friend={friend} />
      </Box>
      <Footer />
      <RightHomeDrawer />
    </Box>
  );
});
export default Request;
