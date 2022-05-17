import { memo } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton } from "@mui/material";
import { deleteFriend } from "../../service/api";

interface Props {
  currentUser: string | undefined;
  fetch: () => void;
  data: string;
}

const DeleteFriendButton: React.VFC<Props> = memo(
  ({ currentUser, fetch, data }) => {
    const deleteHandle = async () => {
      await deleteFriend(currentUser, data);
      fetch();
    };

    return (
      <IconButton edge="end" aria-label="delete" onClick={deleteHandle}>
        <DeleteForeverIcon />
      </IconButton>
    );
  }
);
export default DeleteFriendButton;
