import "./Profile.css"
import LayoutProfile from "../../components/LayoutProfile/LayoutProfile";
import Navigation from "../../components/Navigation/Navigation";

function Profile() {
    return(
        <div className="layout">
            <Navigation />
            <LayoutProfile />
        </div>
    );
}

export default Profile