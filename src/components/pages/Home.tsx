import { memo, useEffect } from "react";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Box from "@mui/material/Box";
import { currentUserState } from "../../recoil/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const Home = memo(() => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("");
    }
  }, [currentUser]);

  return (
    <Box>
      <Header />
      {currentUser}
      <Footer />
    </Box>
  );
});
export default Home;
