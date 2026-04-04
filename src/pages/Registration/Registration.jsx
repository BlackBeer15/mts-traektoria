import './Registration.css'
import './RegistrationMedia.css'
import RegistForm from '../../components/RegistrForm/RegistForm';
import { useNavigate } from 'react-router';

function Registration() {

    const navigate = useNavigate()

    return(
        <div className='registr-wrapper'>
            <button className="go-home" onClick={() => {navigate("/")}}> {"<"} </button>
            <div>
                <h1>РЕГИСТРАЦИЯ</h1>
                <p>Давайте создадим<br />профиль</p> 
            </div>
            <RegistForm />         
        </div>
    );
}

export default Registration;