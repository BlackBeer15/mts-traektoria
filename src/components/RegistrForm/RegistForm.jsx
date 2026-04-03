import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function RegistForm() {

    const navigate = useNavigate()

    const [stage, setStage] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        surname: "",
        lastName: "",
        age: "",
        email: "",
        password: "",
        countryId: "",
        regionId: "",
        cityId: "",
        eduLevelId: "",
        eduDirection: "",
        softSkills: "",
        hardSkills: ""
    });

    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [eduLevels, setEduLevels] = useState([]);

    useEffect(() => {
        fetch("http://192.168.23.17:8080/api/v1/common/country/")
            .then(res => res.json())
            .then(data => setCountries(data))
            .catch(err => console.error("Ошибка загрузки стран:", err));

        fetch("http://192.168.23.17:8080/api/v1/common/eduLevel/")
            .then(res => res.json())
            .then(data => setEduLevels(data))
            .catch(err => console.error("Ошибка загрузки образования:", err));
    }, []);


    useEffect(() => {
        if (!formData.countryId) {
            setRegions([]);
            return;
        }
        fetch(`http://192.168.23.17:8080/api/v1/common/region/${formData.countryId}`)
            .then(res => res.json())
            .then(data => setRegions(data))
            .catch(err => console.error("Ошибка загрузки регионов:", err));
        
        setFormData(prev => ({ ...prev, regionId: "", cityId: "" }));
        setCities([]);
    }, [formData.countryId]);

    
    useEffect(() => {
        if (!formData.countryId || !formData.regionId) {
            setCities([]);
            return;
        }
        fetch(`http://192.168.23.17:8080/api/v1/common/city/?CountID=${formData.countryId}&RegID=${formData.regionId}`)
            .then(res => res.json())
            .then(data => setCities(data))
            .catch(err => console.error("Ошибка загрузки городов:", err));
        
        setFormData(prev => ({ ...prev, cityId: "" }));
    }, [formData.countryId, formData.regionId]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const nextStage = () => {
        if (stage < 3) setStage(stage + 1);
        console.log(formData)
    };

    const prevStage = () => {
        if (stage > 0) setStage(stage - 1);
    };

    const handleSubmit = async () => {
        // Преобразование типов для отправки
        const payload = {
            firstName: formData.firstName,
            surname: formData.surname,
            lastName: formData.lastName,
            age: parseInt(formData.age, 10),
            email: formData.email,
            password: formData.password,
            countryId: parseInt(formData.countryId, 10),
            regionId: parseInt(formData.regionId, 10),
            cityId: parseInt(formData.cityId, 10),
            eduLevelId: formData.eduLevelId,
            eduDirection: formData.eduDirection,
            softSkills: formData.softSkills,
            hardSkills: formData.hardSkills
        };

        setIsSubmitting(true);
        try {
            const response = await fetch("http://192.168.23.17:8080/api/v1/auth/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Успех:", data);
                navigate("/");
            } else {
                const error = await response.text();
                console.error("Ошибка сервера:", error);
                alert("Ошибка регистрации. Проверьте данные.");
            }
        } catch (err) {
            console.error("Сетевая ошибка:", err);
            alert("Не удалось соединиться с сервером.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="reg-form">
            {stage === 0 && (
                <>
                    <label>
                        <span>Как к Вам обращаться?</span>
                        <input type="text" placeholder="Ваше имя" id="firstName" value={formData.firstName} onChange={handleInputChange} />
                    </label>
                    <label>
                        <input type="text" placeholder="Ваша фамилия" id="surname" value={formData.surname} onChange={handleInputChange} />
                    </label>
                    <label>
                        <input type="text" placeholder="Ваше отчество" id="lastName" value={formData.lastName} onChange={handleInputChange} />
                    </label>
                    <label>
                        <span>Сколько вам лет?</span>
                        <input type="text" placeholder="Ваш возраст" id="age" value={formData.age} onChange={handleInputChange} />
                    </label>
                    <button className="next-button" onClick={nextStage}>Далее</button>
                </>
            )}

            {stage === 1 && (
                <>
                    <label>
                        <span>Ваша электронная почта</span>
                        <input type="email" placeholder="Email" id="email" value={formData.email} onChange={handleInputChange} />
                    </label>
                    <label>
                        <span>Придумайте надёжный пароль</span>
                        <input type="password" placeholder="Придумайте пароль" id="password" value={formData.password} onChange={handleInputChange} />
                    </label>
                    <label>
                        <input type="password" placeholder="Повторите пароль" id="confirmPassword" />
                    </label>
                    <button className="next-button" onClick={nextStage}>Далее</button>
                    <button className="prev-button" onClick={prevStage}>Назад</button>
                </>
            )}

            {stage === 2 && (
                <>
                    <label>
                        <span>Страна</span>
                        <select id="countryId" value={formData.countryId} onChange={handleSelectChange}>
                            <option value="">Выбрать страну</option>
                            {countries.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>Регион</span>
                        <select id="regionId" value={formData.regionId} onChange={handleSelectChange} disabled={!formData.countryId}>
                            <option value="">Выбрать регион</option>
                            {regions.map(r => (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>Город</span>
                        <select id="cityId" value={formData.cityId} onChange={handleSelectChange} disabled={!formData.regionId}>
                            <option value="">Выбрать город</option>
                            {cities.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
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
                        <select id="eduLevelId" value={formData.eduLevelId} onChange={handleSelectChange}>
                            <option value="">Выбрать образование</option>
                            {eduLevels.map(e => (
                                <option key={e.id} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        <span>Направление подготовки</span>
                        <input type="text" placeholder="Например: 'Программист'" id="eduDirection" value={formData.eduDirection} onChange={handleInputChange} />
                    </label>

                    <label>
                        <span>Софт скиллы</span>
                        <textarea placeholder="Эмоциональный интеллект, умение работать в команде..." id="softSkills" value={formData.softSkills} onChange={handleInputChange} />
                    </label>

                    <label>
                        <span>Хард скиллы</span>
                        <textarea placeholder="Node.js, Java..." id="hardSkills" value={formData.hardSkills} onChange={handleInputChange} />
                    </label>

                    <button className="next-button" onClick={handleSubmit}>Зарегистрироваться</button>
                    <button className="prev-button" onClick={prevStage}>Назад</button>
                </>
            )}
        </div>
    );
}

export default RegistForm;