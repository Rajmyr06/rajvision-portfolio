import { Link } from "react-router-dom";
import { config } from "../config";
import "./styles/CallToAction.css";

const CallToAction = () => {
  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <Link to="/myworks" className="cta-btn cta-btn-play" data-cursor="disable">
          Explore All Projects →
        </Link>
        
        <a 
          href={config.contact.resume}
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          View Resume →
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
