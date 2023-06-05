import { BsGithub } from "react-icons/bs";
import { SlGlobe } from "react-icons/sl";
import "./UpdateProfile.css";
import { useEffect, useRef } from "react";

const UpdateProfilePage = () => {
  const name = useRef();
  const photo = useRef();
  const idToken = localStorage.getItem("idToken");

  useEffect(() => {
    const getData = async () => {
      await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDCmTIASTuulEriFSISbea5nwsyumajLB4",
        {
          method: "POST",
          body: JSON.stringify({
            idToken,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            name.current.value = data.users[0].displayName;
            photo.current.value = data.users[0].photoUrl;
          });
        }
      });
    };
    getData();
  }, [idToken]);

  const updateProfile = (event) => {
    event.preventDefault();
    const enteredName = name.current.value;
    const enteredPhoto = photo.current.value;
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
    );
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
