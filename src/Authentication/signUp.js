import { useState } from "react";
import style from "./signUp.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseStore/firebase";

export function SignUp() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    pass: "",
    conformPass:""
  });
  const [errMsg, setErrMsg] = useState("");
  const [stateChange, setStateChange] = useState(false);

  const navigate = useNavigate();
  const handleSingUp = () => {
    if (!value.name || !value.email || !value.pass) {
      setErrMsg("Please fill all fields");
       return;
    
    } else {
      if(value.pass !== value.conformPass){
        setErrMsg("password does not match");
        return;
      }
      setErrMsg("");
      setStateChange(true);
      createUserWithEmailAndPassword(auth, value.email, value.pass)
        .then((res) => {
          const user = res.user;
          updateProfile(user, {
            displayName: value.name,
          });
          navigate("/signIn");
          setStateChange(false);
   })
        .catch((err) => {
          setErrMsg(err.message);
          setStateChange(false);
        });
    }
  };

  return (
    <>
      <div className={style.signUpPage}>
        <div className={style.signUpForm}>
          <h1> Register</h1>
          <form className={style.form}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setValue((prev) => ({ ...prev, name: e.target.value }))
              }
            />
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
                setValue((prev) => ({ ...prev, conformPass: e.target.value }))
              }
            />
            <input
              type="password"
              placeholder="conform assword"
              onChange={(e) =>
                setValue((prev) => ({ ...prev, pass: e.target.value }))
              }
            />
          </form>
          <span>{errMsg}</span>
          <button disabled={stateChange} onClick={handleSingUp}>
            {stateChange ? "wait..." : "Sign Up"}
          </button>

          <strong>
            Already have an account? <NavLink to="/signIn">Login </NavLink>
          </strong>
        </div>
      </div>
    </>
  );
}
