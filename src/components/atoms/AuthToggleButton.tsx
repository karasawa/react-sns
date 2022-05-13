import { memo } from "react";
import Button from "@mui/material/Button";

interface Props {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthToggleButton: React.VFC<Props> = memo(({ isLogin, setIsLogin }) => {
  return (
    <Button onClick={() => setIsLogin(!isLogin)} sx={{ p: 0.5 }}>
      {isLogin ? "新規登録はこちら" : "ログイン画面へ戻る"}
    </Button>
  );
});
export default AuthToggleButton;
