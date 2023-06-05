import { useRef, useState } from "react";
import "./ForgotPassword.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ForgotPassword = () => {
  const email = useRef();
  const [loader, setLoader] = useState("");

  const submitHandler = (event) => {
    setLoader("Loading...");
    const enteredEmail = email.current.value;
    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDCmTIASTuulEriFSISbea5nwsyumajLB4",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => console.log(data));
        setLoader("");
      } else {
        res.json().then((data) => console.log(data));
      }
    });
  };

  return (
    <div className="forgot-form-div">
      {loader}
      {!loader && (
        <Form onSubmit={submitHandler}>
          <h1 className="header">MyWebLink</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Enter the email with which you have registered
            </Form.Label>
            <Form.Control ref={email} type="email" required />
          </Form.Group>

          <br />
          <Button type="submit" variant="primary">
            Send link
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ForgotPassword;
