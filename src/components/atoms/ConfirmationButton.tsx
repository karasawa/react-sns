import { memo } from "react";
import Button from "@mui/material/Button";

interface Props {
  confirmationHandle: () => void;
}

const ConfirmationButton: React.VFC<Props> = memo(({ confirmationHandle }) => {
  return (
    <Button
      onClick={confirmationHandle}
      sx={{
        color: "#fff",
        background: "#000",
        "&:hover": {
          color: "#fff",
          background: "#98a69c",
        },
      }}
    >
      OK
    </Button>
  );
});
export default ConfirmationButton;
