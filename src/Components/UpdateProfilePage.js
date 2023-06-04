import { BsGithub } from "react-icons/bs";
import { SlGlobe } from "react-icons/sl";
import "./UpdateProfile.css";
import { useRef } from "react";

const UpdateProfilePage = () => {
  const name = useRef();
  const photo = useRef();

  const updateProfile = (event) => {
    event.preventDefault();
    const enteredName = name.current.value;
    const enteredPhoto = photo.current.value;
    const idToken = localStorage.getItem("idToken");
    console.log(idToken);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDCmTIASTuulEriFSISbea5nwsyumajLB4",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          displayName: enteredName,
          photoUrl: enteredPhoto,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      res.json().then((data) => console.log(data));
    });
  };

  return (
    <form className="update-form" onSubmit={updateProfile}>
      <button className="cancel">Cancel</button>
      <h2>Contact Details</h2>
      <BsGithub /> <label htmlFor="name">Full Name: </label>
      <input ref={name} type="text" id="name" />
      <SlGlobe /> <label htmlFor="photo">Profile Photo URL</label>
      <input ref={photo} type="url" id="photo" />
      <br />
      <button type="submit" className="update">
        Update
      </button>
    </form>
  );
};

export default UpdateProfilePage;
