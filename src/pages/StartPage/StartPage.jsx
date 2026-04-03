import "./StartPage.css"
import "./StartPageMedia.css"
import LoginForm from "../../components/LoginForm/LoginForm";

function StartPage () {
    return (
        <div className="start-page">
            <div className="logo-info">
                <img src="../public/images/МТС.png" alt="Лого" />
                <h1>Траектория</h1>
                <p>- Твой путь от старта до цели</p>
            </div>
            <LoginForm />
        </div>
    );
}

export default StartPage