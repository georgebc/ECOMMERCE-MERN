import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { AuthPage } from "./pages/auth";


function App() {
  return (
    <div className="App">
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={''} />
            <Route path="/user" element={<AuthPage />} />
            <Route path="/checkout" element={''} />
            <Route path="/purchased-items" element={''} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;