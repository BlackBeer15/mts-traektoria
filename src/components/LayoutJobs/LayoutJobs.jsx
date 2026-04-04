import './LayoutJobs.css';
import CardJob from '../CardJob/CardJob';
import { useState, useEffect } from 'react';

function LayoutJobs() {
    const [vacancies, setVacancies] = useState([]);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                
                if (!accessToken) {
                    return;
                }

                const response = await fetch(`http://192.168.23.17:8080/api/v1/career/showVacancies/?token=${accessToken}`);
                const data = await response.json();
                setVacancies(data);
            } catch (err) {
                console.error('Ошибка при загрузке вакансий:', err);
            }
        };

        fetchVacancies();
    }, []);

    return (
        <div className='layout-jobs layout-any'>
            <div className='filter-row'>
                <label className='search'>
                    <img src="../../../public/images/lupa.svg" alt="lupa" />
                    <input type="text" />
                </label>
            </div>
            <h1>Вакансии для тебя:</h1>
            <div className='jobs-wrapper'>
                {vacancies.map(vacancy => (
                    <CardJob 
                        key={vacancy.id}
                        name={vacancy.name}
                        fromPay={vacancy.salary?.from ?? 'Не указана'}
                        toPay={vacancy.salary?.to ?? 'Не указана'}
                        employer={vacancy.employer?.name ?? 'Не указан'}
                        city={vacancy.area?.name ?? 'Не указан'}
                        timeWork={vacancy.schedule?.name ?? 'Не указан'}
                        url={vacancy.alternate_url}
                    />
                ))}
            </div>
        </div>
    );
}

export default LayoutJobs;