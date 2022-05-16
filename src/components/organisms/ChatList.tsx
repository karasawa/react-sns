import { memo } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";

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
  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      {chat.map((chatData: ChatData, index: number) => (
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
              {chatData.message}
              {/* <Link
              to="/chat"
              onClick={() => setChatWithFriend(data)}
              style={{ textDecoration: "none", color: "#000" }}
            >
              {data}
            </Link> */}
            </ListItemText>
            <ListItemSecondaryAction></ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </ul>
  );
});
export default ChatList;
