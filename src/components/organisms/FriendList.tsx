import { memo } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import DeleteFriendButton from "../atoms/DeleteFriendButton";
import { useSetRecoilState } from "recoil";
import { chatWithFriendState } from "../../recoil/atom";

interface Props {
  friend: string[];
  fetch: () => void;
}

const FriendList: React.VFC<Props> = memo(({ friend, fetch }) => {
  const currentUser = getCookie("currentUser");
  const setChatWithFriend = useSetRecoilState(chatWithFriendState);

  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      {friend.map((data: string, index: number) => (
        <Paper
          key={index}
          elevation={1}
          sx={{ textAlign: "left", p: 0.5, m: 1 }}
        >
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>
              <Link
                to="/chat"
                onClick={() => setChatWithFriend(data)}
                style={{ textDecoration: "none", color: "#000" }}
              >
                {data}
              </Link>
            </ListItemText>
            <ListItemSecondaryAction>
              <DeleteFriendButton
                currentUser={currentUser}
                fetch={fetch}
                data={data}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </ul>
  );
});
export default FriendList;
