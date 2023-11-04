import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./SignUp.module.css";

const ResetPass = () => {
  const [isLoading, setLoading] = useState(false);
  const emailRef = useRef();
  const history = useHistory();
  const sumbitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCtmXHK0mY19m-5isAeHZnBkgqv-_eVeXI",
        {
          method: "POST",
          body: JSON.stringify({
            requestType:'PASSWORD_RESET',
            email: emailRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        
        alert("Check Your E-Mail Inbox, Password Reset Email has been send");
        history.replace("/Login");
      } else {
        const data = await res.json();
        alert(data.error.message);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onSign = () => {
    history.replace("/Login");
  };

  return (
    <center className={classes.center}>
      <div className={classes.SignUp}>
        <h2>Reset Password</h2>
        <form onSubmit={sumbitHandler}>
          <input ref={emailRef} type="email" placeholder="E-mail" required />
          <br />
          <button>Send Link</button>
        </form>
      </div>
      {isLoading && <p>Loading...</p>}
      <div onClick={onSign} className={classes.login}>
        <p>Back to Login</p>
      </div>
    </center>
  );
};

export default ResetPass;
