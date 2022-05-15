import { memo } from "react";
import Link from "@mui/material/Link";
import { getCookie } from "typescript-cookie";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import DeleteFriendButton from "../atoms/DeleteFriendButton";

interface Props {
  friend: string[];
  fetch: () => void;
}

const FriendList: React.VFC<Props> = memo(({ friend, fetch }) => {
  const currentUser = getCookie("currentUser");

  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      {friend.map((data: string, index: number) => (
        <Paper elevation={1} sx={{ textAlign: "left", p: 0.5, m: 1 }}>
          <ListItem key={index}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>
              <Link href="/chat" underline="none">
                {data}
              </Link>
            </ListItemText>
            <ListItemSecondaryAction>
              <DeleteFriendButton
                currentUser={currentUser}
                fetch={fetch}
                data={data}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </ul>
  );
});
export default FriendList;
