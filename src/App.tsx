import "./service/firebase";
import Home from "./components/pages/Home";
import Auth from "./components/pages/Auth";
import Chat from "./components/pages/Chat";
import Request from "./components/pages/Request";
import Setting from "./components/pages/Setting";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyle from "./globalStyles";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#706856",
    },
    background: { default: "#ced4d9" },
    text: { primary: "#4a453a" },
  },
  typography: {
    fontFamily: '"M PLUS 1p"',
  },
});

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <ThemeProvider theme={defaultTheme}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/home" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/request" element={<Request />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
      <CssBaseline />
    </RecoilRoot>
  );
}
export default App;
