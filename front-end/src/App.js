import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Chat from "./components/chat/Chat.js";
import ContactInfoTable from "./components/contact-info-table/ContactInfoTable.js";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <span className="gvsu-label">WELCOME TO GVSU</span>
          {!location.pathname.includes("contact-info") && (
            <Link
              to="/contact-info"
              className="btn btn-primary get-report"
              target="_blank"
            >
              Get Report
            </Link>
          )}
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/contact-info" element={<ContactInfoTable />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
