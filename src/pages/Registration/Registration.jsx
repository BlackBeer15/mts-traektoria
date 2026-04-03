import './Registration.css'
import RegistForm from '../../components/RegistrForm/RegistForm';

function Registration() {
    return(
        <div className='registr-wrapper'>
            <div>
                <h1>РЕГИСТРАЦИЯ</h1>
                <p>Давайте создадим<br />профиль</p> 
            </div>
            <RegistForm />
            
                     
        </div>
    );
}

export default Registration;