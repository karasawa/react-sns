import { memo } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import { currentUserState, chatWithFriendState } from "../../recoil/atom";

interface Props {
  chat: any | undefined;
}

interface ChatData {
  data: {
    from: string;
    message: string;
    send_time: any;
  };
}

const ChatList: React.VFC<Props> = memo(({ chat }) => {
  const currentUser = useRecoilValue(currentUserState);
  const chatWithFriend = useRecoilValue(chatWithFriendState);
  return (
    <Box
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      {chat === undefined ? (
        <></>
      ) : (
        <>
          {chat.map((chatData: any, index: number) => {
            if (chatData.data.from === currentUser.currentUserEmail) {
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
                    marginRight: 2,
                    background: "#a2ccff",
                    color: "#fff",
                  }}
                >
                  <ListItem sx={{ padding: 0.8 }}>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          textAlign: "right",
                          color: "#EEEEEE",
                        }}
                      >
                        {chatData.data.send_time.toDate().getHours()}:
                        {chatData.data.send_time.toDate().getMinutes()}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          textAlign: "center",
                          color: "#EEEEEE",
                        }}
                      >
                        {chatData.data.read_flag ? "既読" : "未読"}
                      </Typography>
                    </Box>
                    <ListItemText sx={{ textAlign: "right" }}>
                      {chatData.data.message}
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
                  sx={{
                    textAlign: "left",
                    p: 0.5,
                    m: 0.5,
                    marginLeft: 2,
                    marginRight: 10,
                  }}
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
                    <ListItemText>{chatData.data.message} </ListItemText>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#999999", textAlign: "left" }}
                    >
                      {chatData.data.send_time.toDate().getHours()}:
                      {chatData.data.send_time.toDate().getMinutes()}
                    </Typography>
                  </ListItem>
                </Paper>
              );
            }
          })}
        </>
      )}
      {chatWithFriend.exist_flag ? (
        ""
      ) : (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 0,
          }}
        >
          <Paper
            elevation={1}
            sx={{
              justifyContent: "center",
              textAlign: "center",
              p: 0,
              m: 0.5,
              marginLeft: 2,
              marginRight: 2,
              background: "#98a69c",
              opacity: 0.5,
              color: "#fff",
            }}
          >
            {chatWithFriend.chatWithFriendName}が退出しました
          </Paper>
        </Box>
      )}
      <Box sx={{ height: 50 }}></Box>
    </Box>
  );
});
export default ChatList;
