import React, { memo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

interface Props {
  userFetch: () => void;
}

const UserSearchButton: React.VFC<Props> = memo(({ userFetch }) => {
  return (
    <IconButton
      edge="end"
      aria-label="search"
      sx={{
        m: 1,
        color: "#000",
      }}
      onClick={userFetch}
    >
      <SearchIcon />
    </IconButton>
  );
});
export default UserSearchButton;
