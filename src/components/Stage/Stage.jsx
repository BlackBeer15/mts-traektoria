import './Stage.css'
import { Link } from 'react-router';

function Stage({name, description, arrayCourses}) {
    return(
        <div className='stage-wrapper'>
            <h1>{name}</h1>
            <p>{description}</p>
            <div className='courses-wrapper'>
                <h3>Рекомендуемые курсы этапа:</h3>
                <div className='courses'>
                    {arrayCourses.map((course) => (
                        <Link key={course.name} to={course.link} target='_blank'>
                            <h4>{course.name}</h4>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Stage;