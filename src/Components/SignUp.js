import Form from "react-bootstrap/Form";
import "./SignUp.css";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const checkLogin = () => {
    setIsLogin((prevState) => !prevState);
  };

  const forgotPassword = () => {
    navigate("/forgot-password");
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDCmTIASTuulEriFSISbea5nwsyumajLB4",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          res
            .json()
            .then((data) => localStorage.setItem("idToken", data.idToken));
          navigate("/welcome");
        } else {
          res.json().then((data) => {
            alert(data.error.message);
          });
        }
      });
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCmTIASTuulEriFSISbea5nwsyumajLB4",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          console.log("user has successfully signed up");
        } else {
          res.json().then((data) => {
            alert(data.error.message);
          });
        }
      });
    }
  };

  return (
    <div>
      <div className="form-div">
        <h2 className="signUp-header">{isLogin ? "Login" : "Sign Up"}</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control ref={email} type="email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control ref={password} type="password" required />
          </Form.Group>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control ref={confirmPassword} type="password" required />
            </Form.Group>
          )}
          <button onClick={forgotPassword} className="forgot-password">
            Forgot password?
          </button>
          <br />
          <Button type="submit" variant="primary">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </Form>
      </div>

      <Button onClick={checkLogin} variant="secondary" className="login-button">
        {isLogin ? "Dont't have an account? SignUp" : "Have an account? Login"}
      </Button>
    </div>
  );
};

export default SignUp;
