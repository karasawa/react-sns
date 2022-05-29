import { memo } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import { deleteFriend } from "../../service/api";

interface Props {
  currentUser: string | undefined;
  fetch: () => void;
  friend: string;
}

const DeleteFriendButton: React.VFC<Props> = memo(
  ({ currentUser, fetch, friend }) => {
    const deleteHandle = async () => {
      const data = await deleteFriend(currentUser, friend);
      await fetch();
    };

    return (
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={deleteHandle}
        sx={{ p: 0.5 }}
      >
        <DeleteForeverIcon sx={{ color: "#4a453a" }} />
      </IconButton>
    );
  }
);
export default DeleteFriendButton;
