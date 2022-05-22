import { memo } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import { currentUserState, chatWithFriendState } from "../../recoil/atom";

interface Props {
  chat: any;
}

interface ChatData {
  to: string;
  from: string;
  message: string;
  send_time: EpochTimeStamp;
}

const ChatList: React.VFC<Props> = memo(({ chat }) => {
  const currentUser = useRecoilValue(currentUserState);
  const chatWithFriend = useRecoilValue(chatWithFriendState);
  console.log(chat);
  return (
    <Box
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      {chat.map((chatData: ChatData, index: number) => {
        if (chatData.from === currentUser.currentUserEmail) {
          return (
            <Paper
              key={index}
              elevation={1}
              sx={{
                justifyContent: "right",
                textAlign: "right",
                m: 0.5,
                marginLeft: 10,
                background: "#32a86b",
                color: "#fff",
              }}
            >
              <ListItem sx={{ padding: 0.8 }}>
                <ListItemText sx={{ textAlign: "right" }}>
                  {chatData.message}
                </ListItemText>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "right",
                    alignItems: "center",
                    paddingLeft: 1,
                  }}
                >
                  <PersonIcon sx={{ color: "#fff" }} />
                  <Typography
                    id="modal-modal-title"
                    sx={{ color: "#fff", fontSize: 10 }}
                  >
                    {currentUser.currentUserName}
                  </Typography>
                </ListItemIcon>
              </ListItem>
            </Paper>
          );
        } else {
          return (
            <Paper
              key={index}
              elevation={1}
              sx={{ textAlign: "left", m: 0.5, marginRight: 10 }}
            >
              <ListItem sx={{ padding: 0.8 }}>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: 1,
                  }}
                >
                  <PersonIcon />
                  <Typography
                    id="modal-modal-title"
                    sx={{ color: "#000", fontSize: 10 }}
                  >
                    {chatWithFriend.chatWithFriendName}
                  </Typography>
                </ListItemIcon>
                <ListItemText>{chatData.message}</ListItemText>
              </ListItem>
            </Paper>
          );
        }
      })}
    </Box>
  );
});
export default ChatList;
