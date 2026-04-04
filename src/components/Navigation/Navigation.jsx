import "./Navigation.css"
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";

function Navigation() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");

    useEffect(() => {
    const token = localStorage.getItem('accessToken');
    fetch(`https://api.kapiteam.ru/api/v1/auth/userData/?token=${token}`)
        .then(res => res.json())
        .then(data => {
            setUserName(data.firstName);
            setUserLastName(data.surname);
        });
    }, []);

    return(
        <div className="side-menu">
            <div className="logo-menu">
                <img src="../../../public/images/МТС.png" alt="Logo" />
                <p><span>Траектория</span><br />- твой путь от старта до цели</p>
            </div>
            <nav>
                <Link to="/jobs" className="nav-em">
                    <img src="../../../public/images/Главная.svg" alt="Logo" />
                    <span>Мои вакансии</span>
                </Link>
                <Link to="/jobs" className="nav-em mobile-profile">
                    <img src="../../../public/images/Профиль.svg" alt="Logo" />
                </Link>
                <Link to="/trajectory"  className="nav-em">
                    <img src="../../../public/images/Траектория.svg" alt="Logo" />
                    <span>Моя траектория</span>
                </Link>
                <Link to="/assistent"  className="nav-em">
                    <img src="../../../public/images/Ассистент.svg" alt="Logo" />
                    <span>AI Ассистент</span>
                </Link>
            </nav>
            <div className="bottom-profile">
                <Link to="/profile">
                    <img src="../../../public/images/profile.png" alt="Ава" />
                    <p>{userName} <br/>{userLastName}</p>
                </Link>
                <button
                    onClick={() => {
                        localStorage.removeItem('accessToken');
                        navigate('/');
                    }}
                >
                    Выйти
                </button>
            </div>
        </div>
    );
}

export default Navigation;