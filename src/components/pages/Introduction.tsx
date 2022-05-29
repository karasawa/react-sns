import { memo, useEffect } from "react";
import Header from "../organisms/Header";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import LeftHomeDrawer from "../organisms/LeftHomeDrawer";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";
import Footer from "../organisms/Footer";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Home = memo(() => {
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  const drawerWidth = 240;

  useEffect(() => {
    if (!currentUser.currentUserEmail) {
      navigate("/");
    }
  }, [currentUser]);

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
        <Box>
          <Typography sx={{ fontSize: 30 }}>「ゆるちゃ」について</Typography>
          <Box>
            <Paper elevation={1} sx={{ textAlign: "left", p: 2, m: 2 }}>
              <Typography variant="h5" component="div">
                ゆるちゃとは
              </Typography>
              <Typography variant="subtitle2" component="div">
                ポートフォリオ用に作成したwebチャットアプリです。
                <br />
                名前の意味は「ゆるっとちゃっとしていきましょう＝ゆるちゃ」です。
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ textAlign: "left", p: 2, m: 2 }}>
              <Typography variant="h5" component="div">
                構成要素
              </Typography>
              <Typography variant="subtitle2" component="div">
                本アプリでは下記技術を用いており、各サービスの仕様変更ならびに障害発生時には、本アプリの提供・公開を中断する場合もございます。予めご了承下さい。
              </Typography>
              <Typography component="div">
                <ul>
                  <li>Firebase Hosting</li>
                  <li>Firebase Cloud Firestore</li>
                  <li>React・Recoil・Material-UI</li>
                </ul>
              </Typography>
            </Paper>
            <Paper elevation={1} sx={{ textAlign: "left", p: 2, m: 2 }}>
              <Typography variant="h5" component="div">
                ソース
              </Typography>
              <Typography variant="subtitle2" component="div">
                ソース：
                <a
                  href="https://github.com/karasawa/react-sns"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
});
export default Home;
