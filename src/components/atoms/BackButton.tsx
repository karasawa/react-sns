import { memo } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { chatWithFriendState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";

const BackButton = memo(() => {
  const setChatWithFriend = useSetRecoilState(chatWithFriendState);
  const navigate = useNavigate();

  const backHandle = () => {
    navigate("/home");
    setChatWithFriend({
      chatWithFriendEmail: "",
      chatWithFriendName: "",
      exist_flag: true,
    });
  };

  return (
    <IconButton edge="end" aria-label="back">
      <ArrowBackIosNewIcon onClick={backHandle} sx={{ color: "#fff" }} />
    </IconButton>
  );
});
export default BackButton;
