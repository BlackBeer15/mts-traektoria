import { useState } from "react";
import { useNavigate } from "react-router";

function LoginForm() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://192.168.23.17:8080/api/v1/auth/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.token);
                navigate("/jobs");
            } else {
                alert("Ошибка входа");
            }
        } catch {
            alert("Ошибка соединения");
        }
    };

    return(
        <>
            <div className="login-form">
                <form className="login-wrapper" onSubmit={handleSubmit}>
                    <h1>Авторизация</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Войти</button>
                </form>
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