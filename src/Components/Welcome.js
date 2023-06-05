import "./Welcome.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Welcome = () => {
  const navigate = useNavigate();
  const idToken = localStorage.getItem("idToken");

  const completeProfile = () => {
    navigate("/updateProfile");
  };

  const addExpenses = () => {
    navigate("/add-expenses");
  };

  const verifyEmail = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDCmTIASTuulEriFSISbea5nwsyumajLB4",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });
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
      <button className="verify-button" onClick={verifyEmail}>
        Verify email
      </button>
      <br />
      <Button onClick={addExpenses}>ADD EXPENSES</Button>
    </div>
  );
};

export default Welcome;
