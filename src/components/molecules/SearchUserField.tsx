import React, { memo } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import UserSearchButton from "../atoms/UserSearchButton";

interface Props {
  searchResult: string;
  setSearchResult: React.Dispatch<React.SetStateAction<string>>;
  userFetch: () => void;
}

const SearchUserField: React.VFC<Props> = memo(
  ({ searchResult, setSearchResult, userFetch }) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id="outlined-basic"
          size="small"
          placeholder="メールアドレスで友達を検索"
          sx={{ width: 280 }}
          value={searchResult}
          onChange={(e) => setSearchResult(e.target.value)}
        />
        <UserSearchButton userFetch={userFetch} />
      </Box>
    );
  }
);
export default SearchUserField;
