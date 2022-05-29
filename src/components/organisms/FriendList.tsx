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
import Typography from "@mui/material/Typography";

interface Props {
  friend: any | undefined;
  fetch: () => void;
}

interface FriendData {
  email: string;
  name: string;
  chat_page_login: EpochTimeStamp;
  exist_flag: boolean;
  chat: any;
  most_new_mes: any;
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
        justifyContent: "center",
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
              sx={{
                textAlign: "left",
                p: 0,
                m: 0.5,
                marginLeft: 2,
                marginRight: 2,
              }}
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
                        chatWithFriendEmail: friendData.email,
                        chatWithFriendName: friendData.name,
                        exist_flag: friendData.exist_flag,
                        chat_page_login: friendData.chat_page_login,
                        chat: friendData.chat,
                      })
                    }
                    style={{ textDecoration: "none", color: "#4a453a" }}
                  >
                    {friendData.name}
                    {friendData.most_new_mes ? (
                      <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                        {friendData.most_new_mes.message}
                      </Typography>
                    ) : (
                      <></>
                    )}
                  </Link>
                </ListItemText>
                <ListItemSecondaryAction
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {friendData.most_new_mes ? (
                    <Typography variant="subtitle2" sx={{ color: "#999999" }}>
                      {friendData.most_new_mes.send_time.toDate().getHours()}:
                      {friendData.most_new_mes.send_time.toDate().getMinutes()}
                    </Typography>
                  ) : (
                    <></>
                  )}
                  <DeleteFriendButton
                    currentUser={currentUser.currentUserEmail}
                    fetch={fetch}
                    friend={friendData.email}
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
