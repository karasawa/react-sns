import React, { memo } from "react";
import Button from "@mui/material/Button";

interface Props {
  updateHandle: () => void;
}

const AccountSettingButton: React.VFC<Props> = memo(({ updateHandle }) => {
  return (
    <Button
      onClick={updateHandle}
      sx={{
        marginTop: 2,
        color: "#fff",
        background: "#000",
        "&:hover": {
          color: "#fff",
          background: "#98a69c",
        },
      }}
    >
      更新
    </Button>
  );
});
export default AccountSettingButton;
