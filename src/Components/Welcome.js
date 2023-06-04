import "./Welcome.css";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const completeProfile = () => {
    navigate("/updateProfile");
  };

  return (
    <div>
      <h5>Welcome to expense tracker!!!</h5>
      <div className="incomplete-profile">
        <p>
          your profile is incomplete.
          <button onClick={completeProfile} className="complete-button">
            Complete now
          </button>
        </p>
      </div>
      <hr />
    </div>
  );
};

export default Welcome;
