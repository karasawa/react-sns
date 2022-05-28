import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState, chatWithFriendState } from "../../recoil/atom";
import FriendRequestDialog from "../molecules/FriendRequestDialog";

interface Props {
  friend: any[];
}

const UserList: React.VFC<Props> = memo(({ friend }) => {
  const currentUser = useRecoilValue(currentUserState);
  const setChatWithFriend = useSetRecoilState(chatWithFriendState);
  const [open, setOpen] = useState(false);
  const [requestFriend, setRequestFriend] = useState("");

  const friendRequestHandle = (requestFriend: any) => {
    setRequestFriend(requestFriend);
    setOpen(true);
  };

  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
      }}
    >
      {friend.map((friendData: any, index: number) => (
        <Paper
          key={index}
          elevation={1}
          sx={{ textAlign: "left", p: 0.5, m: 1, width: 500 }}
        >
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>
              <Link
                to="/request"
                onClick={() => friendRequestHandle(friendData.friend)}
                style={{ textDecoration: "none", color: "#000" }}
              >
                {friendData.friend.email}
              </Link>
            </ListItemText>
          </ListItem>
        </Paper>
      ))}
      <FriendRequestDialog
        open={open}
        setOpen={setOpen}
        requestFriend={requestFriend}
      />
    </ul>
  );
});
export default UserList;
