import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const confRef = useRef();
  const history=useHistory();
  const [isLoading, setLoading] = useState(false);

    const onLogin=()=>{
        history.replace('/Login');
    }


  const sumbitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (passRef.current.value === confRef.current.value) {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtmXHK0mY19m-5isAeHZnBkgqv-_eVeXI",
          {
            method: "POST",
            body: JSON.stringify({
              email: emailRef.current.value,
              password: passRef.current.value,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          console.log("Successfully Acreated Account");
          history.replace('/Login');
        } else {
          const data = await res.json();
          alert(data.error.message);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Incorrect Password");
    }
    setLoading(false);
  };

  return (
    <center className={classes.center}>
      <div className={classes.SignUp}>
        <h2>Sign Up</h2>
        <form onSubmit={sumbitHandler}>
          <input ref={emailRef} type="email" placeholder="E-mail" required />
          <br />
          <input
            ref={passRef}
            type="password"
            placeholder="Password"
            required
          />
          <br />
          <input
            ref={confRef}
            type="password"
            placeholder="Confirm Password"
            required
          />
          <br />
          <button>Sign Up</button>
          {isLoading && <p>Loading...</p>}
        </form>
      </div>
      <div className={classes.login}>
        <p onClick={onLogin}>Already Have an account ? Login</p>
      </div>
    </center>
  );
};

export default SignUp;
