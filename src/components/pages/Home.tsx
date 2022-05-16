import { memo, useState, useEffect } from "react";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { initGet } from "../../service/api";
import { getCookie } from "typescript-cookie";
import FriendList from "../organisms/FriendList";

const Home = memo(() => {
  const [friend, setFriend] = useState<string[]>([]);
  const navigate = useNavigate();
  const currentUser = getCookie("currentUser");

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
    console.log(friend);
  };

  return (
    <Box>
      <Header />
      <FriendList friend={friend} fetch={fetch} />
      <Footer />
    </Box>
  );
});
export default Home;
