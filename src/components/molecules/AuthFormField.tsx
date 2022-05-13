import { memo } from "react";
import TextField from "@mui/material/TextField";

interface Props {
  register: any;
  errors: { [x: string]: any };
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const AuthFormField: React.VFC<Props> = memo(
  ({ register, errors, email, setEmail, password, setPassword }) => {
    return (
      <>
        <TextField
          id="email"
          label="email"
          variant="outlined"
          sx={{ width: 260, m: 0.5 }}
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
          sx={{ width: 260, m: 0.5 }}
          {...register("password")}
          error={"password" in errors}
          helperText={errors.password?.message}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </>
    );
  }
);
export default AuthFormField;
