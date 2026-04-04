import './CardJob.css';
import { Link } from 'react-router';

function CardJob({name, fromPay, toPay, employer, city, timeWork, url}) {
    return (
        <Link className='card-job' to={url} target='_blank'>
            <h1>{name}</h1>
            <h2>Работодатель: {employer}</h2>
            <h3>Заятость: {timeWork}</h3>
            <h4>Город: {city}</h4>
            <h2>Зарплата: {fromPay} {toPay !== null ? ' - '+toPay : ''}</h2>
        </Link>
    );
}

export default CardJob;