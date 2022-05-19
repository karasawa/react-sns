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
  fetch: () => void;
}

interface FriendData {
  friend_email: string;
  friend_name: string;
}

const FriendList: React.VFC<Props> = memo(({ friend, fetch }) => {
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
      {friend.map((friendData: FriendData, index: number) => (
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
                onClick={() =>
                  setChatWithFriend({
                    chatWithFriendEmail: friendData.friend_email,
                    chatWithFriendName: friendData.friend_name,
                  })
                }
                style={{ textDecoration: "none", color: "#000" }}
              >
                {friendData.friend_name}
              </Link>
            </ListItemText>
            <ListItemSecondaryAction>
              <DeleteFriendButton
                currentUser={currentUser.currentUserEmail}
                fetch={fetch}
                friend={friendData.friend_email}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </ul>
  );
});
export default FriendList;
