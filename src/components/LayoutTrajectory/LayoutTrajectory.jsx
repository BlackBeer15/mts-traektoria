import { useState, useEffect } from 'react';
import './LayoutTrajectory.css';
import Stage from '../Stage/Stage';

function LayoutTrajectory() {
  const [isLoading, setIsLoading] = useState(false);
  const [trajectoryStages, setTrajectoryStages] = useState(null);

  // Загрузка сохранённой траектории из localStorage при монтировании
  useEffect(() => {
    const savedStages = localStorage.getItem('trajectoryStages');
    if (savedStages) {
      try {
        const parsed = JSON.parse(savedStages);
        if (parsed && typeof parsed === 'object') {
          setTrajectoryStages(parsed);
        }
      } catch (error) {
        console.error('Ошибка при разборе сохранённых этапов:', error);
      }
    }
  }, []);

  const handleCreateTrajectory = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('Access token не найден в localStorage');
      return;
    }

    setIsLoading(true);
    // НЕ сбрасываем trajectoryStages, чтобы во время загрузки показывать старые этапы

    try {
      const response = await fetch(
        `https://api.kapiteam.ru/api/v1/career/trajectory/?token=${accessToken}`,
        { method: 'GET' }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      if (!reader) throw new Error('ReadableStream не поддерживается');

      let buffer = '';
      let fullMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const rawChunk = decoder.decode(value, { stream: true });
        buffer += rawChunk;
        let lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6);
            try {
              const parsed = JSON.parse(jsonStr);
              if (parsed.data !== undefined) {
                fullMessage += parsed.data;
              }
            } catch (e) {
              console.warn('Не удалось распарсить строку:', jsonStr);
            }
          }
        }
      }

      const jsonResponse = JSON.parse(fullMessage);
      if (jsonResponse.stages && typeof jsonResponse.stages === 'object') {
        setTrajectoryStages(jsonResponse.stages);
        // Сохраняем новую траекторию в localStorage, заменяя старую
        localStorage.setItem('trajectoryStages', JSON.stringify(jsonResponse.stages));
      } else {
        setTrajectoryStages(null);
        // Если в ответе нет корректных этапов, очищаем localStorage
        localStorage.removeItem('trajectoryStages');
      }
    } catch (error) {
      console.error('Ошибка при запросе:', error);
      // При ошибке оставляем текущие этапы (если были) и не трогаем localStorage
    } finally {
      setIsLoading(false);
    }
  };

  const renderTrajectoryContent = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="progress-bar">
            <div className="progress-bar-indeterminate"></div>
          </div>
          <p className="loading-text">Генерация траектории...</p>
        </div>
      );
    }

    if (trajectoryStages) {
      const stagesArray = Object.values(trajectoryStages);
      if (stagesArray.length === 0) {
        return <div className="empty-message">Нет доступных этапов</div>;
      }

      return (
        <div className="stages-list">
          {stagesArray.map((stage, index) => (
            <Stage
              key={index}
              name={stage.name}
              description={stage.description}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="for-empty-traj">
        <h1>Здесь будет твоя траектория</h1>
        <img src="../../../public/images/Траектория.svg" alt="Траектория" />
      </div>
    );
  };

  return (
    <div className="layout-trajectory layout-any">
      <div className="take-traj">
        <h1>Получи свою траекторию!</h1>
        <p>
          Нажми на кнопку <span>"Создать траекторию"</span> и наш AI агент мгновенно построит твою
          персональную карьерную траекторию: от первых шагов до востребованного специалиста с
          понятным планом развития, обучением и этапами роста. Никакой неопределённости — только
          твой готовый маршрут в профессию.
        </p>
        <button onClick={handleCreateTrajectory} disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Создать траекторию'}
        </button>
      </div>
      <div className="my-traj-wrapper">
        <h1>Твоя траектория:</h1>
        {renderTrajectoryContent()}
      </div>
    </div>
  );
}

export default LayoutTrajectory;