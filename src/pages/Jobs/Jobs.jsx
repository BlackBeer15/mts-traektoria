import "./Jobs.css"
import Navigation from "../../components/Navigation/Navigation"
import LayoutJobs from "../../components/LayoutJobs/LayoutJobs";

function Jobs() {
    return(
        <div className="layout">
            <Navigation />
            <LayoutJobs />
        </div>
    );
}

export default Jobs