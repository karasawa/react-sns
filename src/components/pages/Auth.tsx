import { memo, useState } from "react";
import Box from "@mui/material/Box";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../service/firebase";
import firebase from "firebase/app";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthButton from "../atoms/AuthButton";
import AuthToggleButton from "../atoms/AuthToggleButton";
import AuthFormField from "../molecules/AuthFormField";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "../../recoil/atom";
import { createUserInfo, getCurrentUserName } from "../../service/api";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("メールアドレスの形式が正しくありません")
    .required("必須項目です"),
  password: yup.string().min(8, "8文字以上で入力してください"),
  username: yup.string(),
});

const Auth = memo(() => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const setCurrentUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const authHandle = async () => {
    if (isLogin) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          const user = await getCurrentUserName(email);
          await setCurrentUser({
            currentUserEmail: user[0].email,
            currentUserName: user[0].name,
          });
          await setEmail("");
          await setPassword("");
          navigate("/home");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      await createUser(email, password);
      await createUserInfo(email, username);
      await setEmail("");
      await setPassword("");
      await setUsername("");
      setIsLogin(true);
    }
  };

  return (
    <Box sx={{ background: "#ced4d9", height: "100vh" }}>
      <Header />
      <form onSubmit={handleSubmit(authHandle)}>
        <Box
          sx={{
            height: 720,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AuthFormField
            register={register}
            errors={errors}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            username={username}
            setUsername={setUsername}
            isLogin={isLogin}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AuthButton isLogin={isLogin} />
            <AuthToggleButton isLogin={isLogin} setIsLogin={setIsLogin} />
          </Box>
        </Box>
      </form>
      <Footer />
    </Box>
  );
});
export default Auth;
