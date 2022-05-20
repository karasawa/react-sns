import { memo } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../recoil/atom";

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
                p: 0.5,
                m: 0.5,
                marginLeft: 10,
                background: "#32a86b",
                color: "#fff",
              }}
            >
              <ListItem>
                <ListItemIcon></ListItemIcon>
                <ListItemText sx={{ textAlign: "right" }}>
                  {chatData.message}
                </ListItemText>
                <ListItemIcon sx={{ justifyContent: "right" }}>
                  <PersonIcon sx={{ color: "#fff" }} />
                </ListItemIcon>
              </ListItem>
            </Paper>
          );
        } else {
          return (
            <Paper
              key={index}
              elevation={1}
              sx={{ textAlign: "left", p: 0.5, m: 0.5, marginRight: 10 }}
            >
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
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
