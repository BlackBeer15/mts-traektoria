import './Trajectory.css'
import Navigation from '../../components/Navigation/Navigation';
import LayoutTrajectory from '../../components/LayoutTrajectory/LayoutTrajectory';

function Trajectory() {
    return(
        <div className="layout">
            <Navigation />
            <LayoutTrajectory />
        </div>
    );
}

export default Trajectory;