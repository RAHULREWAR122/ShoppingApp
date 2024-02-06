import { auth } from "../firebaseStore/firebase";
import { NavLink, useNavigate } from "react-router-dom";

// this is SignOut component
function SignOut() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div>
      <NavLink
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleSignOut}
      >
        <img
          style={{ height: "50px", width: "50px" }}
          src="https://cdn-icons-png.flaticon.com/128/2115/2115284.png"
          alt="signOut"
        />
        <p
          style={{ marginLeft: "-10px", color: "#1a657a", fontSize: "1.5rem" }}
        >
          LogOut
        </p>
      </NavLink>
    </div>
  );
}

export default SignOut;
