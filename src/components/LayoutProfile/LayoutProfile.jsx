import { useState, useEffect } from 'react';
import './LayoutProfile.css';

function LayoutProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken'); // предполагаем, что токен хранится по ключу 'token'
      if (!token) {
        setError('Токен не найден в localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.kapiteam.ru/api/v1/auth/userData/?token=${encodeURIComponent(token)}`
        );
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Форматирование ФИО
  const getFullName = () => {
    if (!userData) return '';
    const { firstName, surname, lastName } = userData;
    return [firstName, surname, lastName].filter(Boolean).join(' ');
  };

  if (loading) {
    return (
      <div className="layout-profile layout-any">
        <div className="profile-status">Загрузка данных...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="layout-profile layout-any">
        <div className="profile-status error">Ошибка: {error}</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="layout-profile layout-any">
        <div className="profile-status">Нет данных</div>
      </div>
    );
  }

  return (
    <div className="layout-profile layout-any">
      <div className="profile-content">
        <h2 className="profile-title">Профиль пользователя</h2>

        <div className="profile-grid">
          <div className="profile-field">
            <span className="field-label">ФИО:</span>
            <span className="field-value">{getFullName() || '—'}</span>
          </div>

          <div className="profile-field">
            <span className="field-label">Возраст:</span>
            <span className="field-value">{userData.age ?? '—'}</span>
          </div>

          <div className="profile-field">
            <span className="field-label">Email:</span>
            <span className="field-value">{userData.email || '—'}</span>
          </div>

          <div className="profile-field">
            <span className="field-label">Уровень образования:</span>
            <span className="field-value">{userData.eduLevelId || '—'}</span>
          </div>

          <div className="profile-field">
            <span className="field-label">Направление обучения:</span>
            <span className="field-value">{userData.eduDirection || '—'}</span>
          </div>

          <div className="profile-field">
            <span className="field-label">Soft Skills:</span>
            <span className="field-value">{userData.softSkills || '—'}</span>
          </div>

          <div className="profile-field">
            <span className="field-label">Hard Skills:</span>
            <span className="field-value">{userData.hardSkills || '—'}</span>
          </div>

          {userData.ID && (
            <div className="profile-field">
              <span className="field-label">ID пользователя:</span>
              <span className="field-value">{userData.ID}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LayoutProfile;