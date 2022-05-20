import { memo } from "react";
import Button from "@mui/material/Button";

interface Props {
  sendHandle: () => void;
}

const SendMessageButton: React.VFC<Props> = memo(({ sendHandle }) => {
  return (
    <Button sx={{ color: "#fff" }} onClick={sendHandle}>
      送信
    </Button>
  );
});
export default SendMessageButton;
