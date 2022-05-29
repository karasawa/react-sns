import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState, chatWithFriendState } from "../../recoil/atom";
import FriendRequestDialog from "../molecules/FriendRequestDialog";

interface Props {
  friend: any;
}

interface FriendData {
  friend: {
    friend: any;
    email: string;
    name: string;
  };
}

const UserList: React.VFC<Props> = memo(({ friend }) => {
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
        padding: 0,
      }}
    >
      {friend.map((friendData: FriendData, index: number) => (
        <Paper
          key={index}
          elevation={1}
          sx={{
            textAlign: "left",
            p: 0.6,
            m: 0.5,
            marginLeft: 2,
            marginRight: 2,
          }}
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
                {friendData.friend.name}
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
