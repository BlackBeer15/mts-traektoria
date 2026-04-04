import './Chat.css'
import Navigation from '../../components/Navigation/Navigation';
import LayoutChat from '../../components/LayoutChat/LayoutChat';

function Chat() {
    return(
        <div className="layout">
            <Navigation />
            <LayoutChat />
        </div>
    );
}

export default Chat;