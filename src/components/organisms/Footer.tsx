import { memo } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMedia from "use-media";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InfoIcon from "@mui/icons-material/Info";

const Footer = memo(() => {
  const isWide = useMedia({ minWidth: "1000px" });

  const location = useLocation();

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          {location.pathname === "/" ? (
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "#fff" }}
            >
              &copy; 2022 - 2023 ゆるちゃ
            </Typography>
          ) : (
            <>
              {isWide ? (
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, color: "#fff" }}
                >
                  &copy; 2022 - 2023 ゆるちゃ
                </Typography>
              ) : (
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      color: "#fff",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Link to="/introduction" style={{ color: "#fff" }}>
                        <InfoIcon sx={{ height: "100%" }} />
                      </Link>
                      <Typography variant="subtitle2" component="div">
                        ゆるちゃとは
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Link to="/home" style={{ color: "#fff" }}>
                        <HomeIcon sx={{ height: "100%" }} />
                      </Link>
                      <Typography variant="subtitle2" component="div">
                        ホーム
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Link to="/request" style={{ color: "#fff" }}>
                        <PersonAddIcon sx={{ height: "100%" }} />
                      </Link>
                      <Typography variant="subtitle2" component="div">
                        友達申請
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Link to="/setting" style={{ color: "#fff" }}>
                        <SettingsIcon sx={{ height: "100%" }} />
                      </Link>
                      <Typography variant="subtitle2" component="div">
                        アカウント
                      </Typography>
                    </Box>
                  </Box>
                </Typography>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
});
export default Footer;
