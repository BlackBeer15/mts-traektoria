import LoginForm from "../../components/LoginForm/LoginForm";
import "./StartPage.css"
import "./StartPageMedia.css"
import { useNavigate } from "react-router";

function StartPage () {

    const navigate = useNavigate()

    return (
        <div className="start-page">
            <div className="logo-info">
                <img src="../public/images/МТС.png" alt="Лого" />
                <h1>Траектория</h1>
                <p>- Твой путь от старта до цели</p>
            </div>
            <LoginForm />
            <div className="mobile-buuttons">
                <button onClick={() => navigate('/login')} >Войти</button>
                <button onClick={() => navigate('/reg')}>Создать аккаунт</button>
            </div>
        </div>
    );
}

export default StartPage