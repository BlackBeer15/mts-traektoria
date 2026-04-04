// ProtectedRoute.jsx
import { Navigate } from 'react-router';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch("http://192.168.23.17:8080/api/v1/auth/checkLogin/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token })
        });

        if (response.ok) {
          setIsValid(true);
        } else {
          localStorage.removeItem('accessToken');
          setIsValid(false);
        }
      } catch (error) {
        console.error("Ошибка проверки токена:", error);
        localStorage.removeItem('accessToken');
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValid === null) {
    return <div>Проверка авторизации...</div>;
  }

  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;