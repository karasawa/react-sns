import "./service/firebase";
import Home from "./components/pages/Home";
import Auth from "./components/pages/Auth";
import Chat from "./components/pages/Chat";
import Request from "./components/pages/Request";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/request" element={<Request />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}
export default App;
