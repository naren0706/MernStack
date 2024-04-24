import "./Styles/App.scss";
import Quiz from "./Component/Quiz";
import "./Styles/index.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./Component/User";

function App() {
  return (
    <div className="container">
      {/* <Quiz /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<User/>} />
          <Route exact path="Quiz" element={<Quiz/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
