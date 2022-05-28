import { memo } from "react";
import Button from "@mui/material/Button";

interface Props {
  isLogin: boolean;
}

const AuthButton: React.VFC<Props> = memo(({ isLogin }) => {
  return (
    <Button type="submit" sx={{ p: 0.5, color: "#4a453a", fontSize: 16 }}>
      {isLogin ? "ログイン" : "新規登録"}
    </Button>
  );
});
export default AuthButton;
