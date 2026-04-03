import { useNavigate } from "react-router";

function LoginForm() {

    const navigate = useNavigate()

    return(
        <>
            <div className="login-form">
                <div className="login-wrapper">
                    <h1>Авторизация</h1>
                    <input type="text" placeholder="Email"/>
                    <input type="password" placeholder="Пароль"/>
                    <button>Войти</button>
                </div>
                <button onClick={() => navigate('/reg')}>Зарегистрироваться</button>
            </div>
            <div className="mobile-buuttons">
                <button>Войти</button>
                <button onClick={() => navigate('/reg')}>Создать аккаунт</button>
            </div>
        </>
    );
}

export default LoginForm;