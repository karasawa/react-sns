import { memo } from "react";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import DeleteFriendButton from "../atoms/DeleteFriendButton";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState, chatWithFriendState } from "../../recoil/atom";

interface Props {
  friend: any[];
}

// interface FriendData {
//   friend_email: string;
//   friend_name: string;
// }

const UserList: React.VFC<Props> = memo(({ friend }) => {
  const currentUser = useRecoilValue(currentUserState);
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
      {friend.map((friendData: any, index: number) => (
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
                to="/request"
                onClick={() => console.log("aa")}
                style={{ textDecoration: "none", color: "#000" }}
              >
                {friendData.friend.email}
              </Link>
            </ListItemText>
          </ListItem>
        </Paper>
      ))}
    </ul>
  );
});
export default UserList;
