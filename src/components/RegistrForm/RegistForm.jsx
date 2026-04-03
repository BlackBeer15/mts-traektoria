import { useState, useEffect } from "react";

function RegistForm() {

    const [stage, setStage] = useState(0);

    
    function nextStage() {
        if (stage < 5) {
            setStage(stage+1)
        }
    }

    function prevStage() {
        if (stage > 0) {
            setStage(stage-1)
        }
    }

    return(
        <>
            <div className="reg-form">
                {stage === 0 && (
                    <>
                        <label>
                            <span>Как к Вам обращаться?</span>
                            <input type="text" placeholder="Ваше имя" id="name"/>
                        </label>
                        <label>
                            <input type="text" placeholder="Ваша фамилия" id="surname"/>
                        </label>
                        <label>
                            <input type="text" placeholder="Ваше отчество" id="lastname"/>
                        </label>
                        <label>
                            <span>Сколько вам лет?</span>
                            <input type="text" placeholder="Ваш возраст" id="age"/>
                        </label>
                        <button className="next-button" onClick={nextStage}>Далее</button>
                    </>
                )}

                {stage === 1 && (
                    <>
                        <label>
                            <span>Ваша электронная почта</span>
                            <input type="text" placeholder="Email" id="lastname"/>
                        </label>
                        <label>
                            <span>Придумайте надёжный пароль</span>
                            <input type="text" placeholder="Придумайте пароль" id="lastname"/>
                        </label>
                        <label>
                            <input type="text" placeholder="Повторите пароль" id="lastname"/>
                        </label>
                        <button className="next-button" onClick={nextStage}>Далее</button>
                        <button className="prev-button" onClick={prevStage}>Назад</button>
                    </>
                )}

                 {stage === 2 && (
                    <>
                        <label>
                            <span>Страна</span>
                            <select>
                                <option value="">Выбрать страну</option>
                            </select>
                        </label>
                        <label>
                            <span>Регион</span>
                            <select>
                                <option value="">Выбрать регион</option>
                            </select>
                        </label>
                        <label>
                            <span>Город</span>
                            <select>
                                <option value="">Выбрать город</option>
                            </select>
                        </label>
                        <button className="next-button" onClick={nextStage}>Далее</button>
                        <button className="prev-button" onClick={prevStage}>Назад</button>
                    </>
                 )}

                 {stage === 3 && (
                    <>
                        <label>
                            <span>Ваше образование</span>
                            <select>
                                <option value="">Выбрать образоваие</option>
                            </select>
                        </label>
                        
                        <label>
                            <span>Направление подготовки</span>
                            <input type="text" placeholder="Например: 'Программист'" id="age"/>
                        </label>

                        <label>
                            <span>Софт скиллы</span>
                            <textarea type="text" placeholder="Эмоцианальный интеллект, умение работать в команде..." id="age"/>
                        </label>

                        <label>
                            <span>Хард скиллы</span>
                            <textarea type="text" placeholder="Node.js, Java..." id="age"/>
                        </label>

                        <button className="next-button">Зарегистрироваться</button>
                        <button className="prev-button" onClick={prevStage}>Назад</button>
                    </>
                )}
                
            </div>
        </>
    );
}

export default RegistForm