import "./service/firebase";
import Home from "./components/pages/Home";
import Auth from "./components/pages/Auth";
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
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}
export default App;
