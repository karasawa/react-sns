import { memo, useState, useEffect } from "react";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { initGet, deletefriend } from "../../service/api";
import { getCookie } from "typescript-cookie";
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
  }, []);

  const fetch = async () => {
    const friends = await initGet(currentUser);
    setFriend(friends[0].friend);
  };

  const deleteHandle = async (friend: string) => {
    await deletefriend(currentUser, friend);
    fetch();
  };

  return (
    <Box>
      <Header />
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          padding: 0,
        }}
      >
        {friend.map((data: string, index: number) => (
          <Paper elevation={1} sx={{ textAlign: "left", p: 0.5, m: 1 }}>
            <ListItem key={index}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>
                <Link href="/chat" underline="none">
                  {data}
                </Link>
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteHandle(data)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        ))}
      </ul>
      <Footer />
    </Box>
  );
});
export default Home;
