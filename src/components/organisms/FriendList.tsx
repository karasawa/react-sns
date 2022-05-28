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
import useMedia from "use-media";

interface Props {
  friend: any[] | undefined;
  fetch: () => void;
}

interface FriendData {
  friend_email: string;
  friend_name: string;
  chat_page_login: EpochTimeStamp;
  exist_flag: boolean;
}

const FriendList: React.VFC<Props> = memo(({ friend, fetch }) => {
  const currentUser = useRecoilValue(currentUserState);
  const setChatWithFriend = useSetRecoilState(chatWithFriendState);
  const isWide = useMedia({ minWidth: "1000px" });

  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
      }}
    >
      {friend === undefined ? (
        <></>
      ) : (
        <>
          {friend.map((friendData: FriendData, index: number) => (
            <Paper
              key={index}
              elevation={1}
              sx={{ textAlign: "left", width: 500, p: 0.5, m: 1 }}
            >
              <ListItem>
                <ListItemIcon>
                  <PersonIcon sx={{ color: "#4a453a" }} />
                </ListItemIcon>
                <ListItemText>
                  <Link
                    to="/chat"
                    onClick={() =>
                      setChatWithFriend({
                        chatWithFriendEmail: friendData.friend_email,
                        chatWithFriendName: friendData.friend_name,
                        exist_flag: friendData.exist_flag,
                      })
                    }
                    style={{ textDecoration: "none", color: "#4a453a" }}
                  >
                    {friendData.friend_name}
                  </Link>
                </ListItemText>
                <ListItemSecondaryAction>
                  <DeleteFriendButton
                    currentUser={currentUser.currentUserEmail}
                    fetch={fetch}
                    friend={friendData}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </>
      )}
    </ul>
  );
});
export default FriendList;
