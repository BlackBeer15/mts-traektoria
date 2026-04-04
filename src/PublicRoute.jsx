// PublicRoute.jsx
import { Navigate } from 'react-router';
import { useState, useEffect } from 'react';

const PublicRoute = ({ element: Element, ...rest }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      setIsChecking(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const response = await fetch("http://192.168.23.17:8080/api/v1/auth/checkLogin/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token })
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('accessToken');
        }
      } catch (error) {
        console.error("Ошибка проверки токена:", error);
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [token]);

  if (isChecking) {
    return <div>Проверка авторизации...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/jobs" replace />;
  }

  return <Element {...rest} />;
};

export default PublicRoute;