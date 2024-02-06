import style from "./signIn.module.css";
import { NavLink } from "react-router-dom";
import { auth } from "../firebaseStore/firebase";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [value, setValue] = useState({
    email: "",
    pass: "",
  });
  const [errmsg, setErrMsg] = useState("");
  const [stateChange, setStateChange] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = () => {
    if (!value.email || !value.pass) {
      setErrMsg("All fields are required");
      return;
    } else {
      setErrMsg("");
      setStateChange(true);

      signInWithEmailAndPassword(auth, value.email, value.pass)
        .then((res) => {
          setStateChange(false);
          navigate("/");
        })
        .catch((err) => {
          setErrMsg(err.message);
          setStateChange(false);
        });
    }

    console.log(value);
  };

  return (
    <>
      <div className={style.signInPage}>
        <div className={style.signInForm}>
          <h1> Sign In</h1>
          <form className={style.form}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setValue((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setValue((prev) => ({ ...prev, pass: e.target.value }))
              }
            />
          </form>
           <span className={style.errMsg}>{errmsg}</span>
          <button disabled={stateChange} onClick={handleSignIn}>
            {stateChange ? "wait..." : "Login"}
          </button>

          <strong>
            Already have an account? <NavLink to="/signUp">SignUp </NavLink>
          </strong>
        </div>
      </div>
    </>
  );
}

export default SignIn;
