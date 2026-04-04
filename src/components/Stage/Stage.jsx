import './Stage.css'

function Stage({name, description}) {
    return(
        <div className='stage-wrapper'>
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    );
}

export default Stage;