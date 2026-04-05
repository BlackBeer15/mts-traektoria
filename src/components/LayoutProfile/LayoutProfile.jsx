import { useState, useEffect } from 'react';
import './LayoutProfile.css';

function LayoutProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
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
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getFullName = () => {
    if (!userData) return '';
    const { firstName, surname, lastName } = userData;
    return [firstName, surname, lastName].filter(Boolean).join(' ');
  };

  const handleEditClick = () => {
    setFormData({ ...userData });
    setIsEditing(true);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({});
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setSaveError('Токен не найден. Войдите заново.');
      return;
    }

    if (!formData.email) {
      setSaveError('Email обязателен для заполнения');
      return;
    }

    setSaveLoading(true);
    setSaveError(null);
    setSaveSuccess(false);

    const requestBody = {
      token: { token },
      newData: {
        firstName: formData.firstName || '',
        surname: formData.surname || '',
        lastName: formData.lastName || '',
        age: formData.age ?? 0,
        email: formData.email || '',
        countryId: formData.countryId ?? 0,
        regionId: formData.regionId ?? 0,
        cityId: formData.cityId ?? 0,
        eduLevelId: formData.eduLevelId || '',
        eduDirection: formData.eduDirection || '',
        softSkills: formData.softSkills || '',
        hardSkills: formData.hardSkills || ''
      }
    };

    try {
      const response = await fetch('https://api.kapiteam.ru/api/v1/auth/updateUser/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка сохранения: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      if (result.user) {
        setUserData(result.user);
      } else {
        setUserData(prev => ({ ...prev, ...formData }));
      }
      setSaveSuccess(true);
      setIsEditing(false);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaveLoading(false);
    }
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
        <div className="profile-header">
          <h2 className="profile-title">Профиль пользователя</h2>
          {!isEditing && (
            <button className="profile-edit-button" onClick={handleEditClick}>
              Редактировать
            </button>
          )}
        </div>

        {saveSuccess && (
          <div className="profile-status success">Данные успешно обновлены!</div>
        )}
        {saveError && (
          <div className="profile-status error">{saveError}</div>
        )}

        {isEditing ? (
          <div className="profile-edit-form">
            <div className="profile-grid">
              <div className="profile-field">
                <label className="field-label">Имя:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="profile-field">
                <label className="field-label">Фамилия:</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname || ''}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="profile-field">
                <label className="field-label">Отчество:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="profile-field">
                <label className="field-label">Возраст:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age ?? ''}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="profile-field">
                <label className="field-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="profile-input"
                  required
                />
              </div>
              <div className="profile-field">
                <label className="field-label">Уровень образования:</label>
                <input
                  type="text"
                  name="eduLevelId"
                  value={formData.eduLevelId || ''}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="profile-field">
                <label className="field-label">Направление обучения:</label>
                <input
                  type="text"
                  name="eduDirection"
                  value={formData.eduDirection || ''}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="profile-field">
                <label className="field-label">Soft Skills:</label>
                <input
                  type="text"
                  name="softSkills"
                  value={formData.softSkills || ''}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="profile-field">
                <label className="field-label">Hard Skills:</label>
                <input
                  type="text"
                  name="hardSkills"
                  value={formData.hardSkills || ''}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
            </div>
            <div className="profile-buttons">
              <button
                className="profile-save-button"
                onClick={handleSave}
                disabled={saveLoading}
              >
                {saveLoading ? 'Сохранение...' : 'Сохранить'}
              </button>
              <button
                className="profile-cancel-button"
                onClick={handleCancelClick}
                disabled={saveLoading}
              >
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default LayoutProfile;