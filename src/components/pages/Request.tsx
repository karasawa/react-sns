import { memo, useState, useEffect } from "react";
import Header from "../organisms/Header";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { friendSearch } from "../../service/api";
import LeftHomeDrawer from "../organisms/LeftHomeDrawer";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";
import RightHomeDrawer from "../organisms/RightHomeDrawer";
import Footer from "../molecules/Footer";
import UserList from "../organisms/UserList";
import SearchUserField from "../molecules/SearchUserField";

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
        <SearchUserField
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          userFetch={userFetch}
        />
        <UserList friend={friend} />
      </Box>
      <Footer />
      <RightHomeDrawer />
    </Box>
  );
});
export default Request;
