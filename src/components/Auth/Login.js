import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authAction } from "../../Context/auth-redux";
import classes from "./SignUp.module.css";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSign = () => {
    history.replace("/SignUp");
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtmXHK0mY19m-5isAeHZnBkgqv-_eVeXI",
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
        const send = {
          id: data.idToken,
          email: emailRef.current.value,
        };
        dispatch(authAction.login(send));
        history.replace("/Home");
      } else {
        const data = await res.json();
        alert(data.error.message);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const resetHandler = () => {
    history.replace("/ResetPassword");
  };

  return (
    <center className={classes.center}>
      <div className={classes.SignUp}>
        <h2>Login</h2>
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
          <button>Login</button>
          <p onClick={resetHandler}>Forgot Password</p>
        </form>
      </div>
      {isLoading && <p>Loading...</p>}
      <div onClick={onSign} className={classes.login}>
        <p>I don't have an account ? SignUp</p>
      </div>
    </center>
  );
};

export default Login;
