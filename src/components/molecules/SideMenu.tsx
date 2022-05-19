import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import Divider from "@mui/material/Divider";

const SideMenu = memo(() => {
  const navigate = useNavigate();

  const sideMenuContents = [
    {
      text: "React SNSとは",
      path: "/introduction",
      icon: <InfoIcon />,
    },
    {
      text: "トップページ",
      path: "/home",
      icon: <HomeIcon />,
    },
    {
      text: "設定",
      path: "/setting",
      icon: <SettingsIcon />,
    },
  ];
  return (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {sideMenuContents.map((content) => (
          <ListItem
            button
            key={content.text}
            onClick={() => navigate(content.path)}
          >
            <ListItemIcon>{content.icon}</ListItemIcon>
            <ListItemText primary={content.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
});
export default SideMenu;
