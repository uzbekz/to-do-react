import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <header className="app-header">
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
