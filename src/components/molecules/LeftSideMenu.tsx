import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Divider from "@mui/material/Divider";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";

const LeftSideMenu = memo(() => {
  const currentUser = useRecoilValue(currentUserState);
  const navigate = useNavigate();

  const sideMenuContents = [
    {
      text: "ゆるちゃとは",
      path: "/introduction",
      icon: <InfoIcon />,
    },
    {
      text: "トップページ",
      path: "/home",
      icon: <HomeIcon />,
    },
    {
      text: "友達申請",
      path: "/request",
      icon: <PersonAddIcon />,
    },
    {
      text: "アカウント設定",
      path: "/setting",
      icon: <SettingsIcon />,
    },
  ];
  return (
    <Box sx={{ background: "#e4d9c0", height: "100vh" }}>
      <Toolbar />
      <Divider />
      <List sx={{ padding: 0, paddingTop: 1 }}>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              sx={{
                bgcolor: deepPurple[500],
                width: 30,
                height: 30,
              }}
            >
              K
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={currentUser.currentUserName} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {sideMenuContents.map((content) => (
          <ListItem
            button
            key={content.text}
            onClick={() => navigate(content.path)}
          >
            <ListItemIcon sx={{ color: "#4a453a" }}>
              {content.icon}
            </ListItemIcon>
            <ListItemText primary={content.text} sx={{ color: "#4a453a" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
});
export default LeftSideMenu;
