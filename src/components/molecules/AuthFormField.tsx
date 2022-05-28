import { memo } from "react";
import TextField from "@mui/material/TextField";

interface Props {
  register: any;
  errors: { [x: string]: any };
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  isLogin: boolean;
}

const AuthFormField: React.VFC<Props> = memo(
  ({
    register,
    errors,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    isLogin,
  }) => {
    return (
      <>
        <TextField
          id="email"
          label="email"
          variant="outlined"
          sx={{ width: 330, m: 0.8, background: "#fff", borderRadius: 1 }}
          {...register("email")}
          error={"email" in errors}
          helperText={errors.email?.message}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="password"
          type="password"
          variant="outlined"
          sx={{ width: 330, m: 0.8, background: "#fff", borderRadius: 1 }}
          {...register("password")}
          error={"password" in errors}
          helperText={errors.password?.message}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isLogin ? (
          <></>
        ) : (
          <TextField
            id="username"
            label="username"
            variant="outlined"
            sx={{ width: 330, m: 0.8, background: "#fff", borderRadius: 1 }}
            {...register("username")}
            error={"username" in errors}
            helperText={errors.username?.message}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
      </>
    );
  }
);
export default AuthFormField;
