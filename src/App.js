// import here all required components , hooks 
import { Navbar } from "./Navbar/navbar";
import { MyOrders } from "./Pages/orders";
import SignIn from "./Authentication/signIn";
import { SignUp } from "./Authentication/signUp";
import Home from "./Pages/home";
import { Cart } from "./Pages/cart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth } from "./firebaseStore/firebase";
import { useEffect, useState } from "react";
import CustomContext from "./Context";


// this is parent function of all components  
function App() {
  // define a state that's control userAuth.  
  const [isAuth, setUserAuth] = useState("");

  // using useEffect hook that display user name if is present
  useEffect(() => {
    // onAuthStateChanged function is provide by firebase
    auth.onAuthStateChanged((user) => {
   
      // check user is present or not , if present then display user name else not
      if (user) {
        setUserAuth(user.displayName);
      } else {
        setUserAuth("");
      }
    });
  }, []);

  // here create routes with help of createBrowserRouter , it's help us to create routes , this is third party library 
  const value = createBrowserRouter([
    {
      // we make Navbar parent of all routes 
      path: "/",
      element: <Navbar auth={isAuth} />,
      children: [
        // it's children's of Navbar
        { index: true, element: <Home isAuth={isAuth}/> },
        { path: "cart", element: <Cart /> },
        { path: "products", element: <MyOrders /> },
        { path: "signIn", element: <SignIn /> },
        { path: "signUp", element: <SignUp /> },
      ],
    },
  ]);

  return (
    <>
    {/* using customContext which is handle many actions */}
      <CustomContext>
        {/* this is routerprovider */}
        <RouterProvider router={value} />
      </CustomContext>
    </>
  );
}

export default App;
