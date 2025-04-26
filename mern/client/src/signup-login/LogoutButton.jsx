import { useNavigate } from "react-router-dom";
import styles from '../styles/LogoutButton.module.css';

function LogoutButton() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate("/");
  }
  return (
    <button className={styles.addButton} onClick={logout}>
      <i className="fa-solid fa-arrow-right-from-bracket"></i>
    </button>
  )
}

export default LogoutButton;