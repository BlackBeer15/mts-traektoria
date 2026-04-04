import './LayoutTrajectory.css'

function LayoutTrajectory() {
    return(
        <div className='layout-trajectory layout-any'>
            <div className='take-traj'>
                <h1>Получи свою траекторию!</h1>
                <p>Нажми на копку <span>"Создать траекторию"</span> и наш AI агент мгновенно построит твою персональную карьерную траекторию: от первых шагов до востребованного специалиста с понятным планом развития, обучением и этапами роста. Никакой неопределённости — только твой готовый маршрут в профессию.</p>
                <button>Создать траекторию</button>
            </div>
            <div className='my-traj-wrapper'>

            </div>
        </div>
    );
}

export default LayoutTrajectory;