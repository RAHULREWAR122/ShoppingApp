import style from "./nav.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { useContexValues } from "../Context";
import SignOut from "../Authentication/logOut";

export function Navbar({ auth }) {
  const { cartNo, countBuy } = useContexValues();

  return (
    <>
      <div className={style.nav}>
        {auth ? (
          <>
            <div className={style.user}>
              <h2 className={style.logo}>Welcome {auth}</h2>
            </div>
            <div className={style.icons}>
              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? {
                          borderRadius: "10px",
                          background: "#6da17b",
                        }
                      : undefined
                  }
                  className={style.list}
                  to="/"
                >
                  <img
                    className={style.imgIcon}
                    src="https://cdn-icons-png.flaticon.com/128/609/609803.png"
                    alt="Home"
                  />
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? {
                          borderRadius: "10px",
                          background: "#6da17b",
                        }
                      : undefined
                  }
                  className={style.list}
                  to="/cart"
                >
                  <img
                    className={style.imgIcon}
                    src="https://cdn-icons-png.flaticon.com/128/5165/5165792.png"
                    alt="Cart"
                  />
                  Cart{" "}
                  {cartNo === 0 ? null : (
                    <span className={style.cartShow}>{cartNo}</span>
                  )}
                </NavLink>
              </li>

              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? {
                          borderRadius: "10px",
                          background: "#6da17b",
                        }
                      : undefined
                  }
                  className={style.list}
                  to="/products"
                >
                  <img
                    className={style.imgIcon}
                    src="https://cdn-icons-png.flaticon.com/128/3098/3098215.png"
                    alt="Orders"
                  />
                  Orders {countBuy}
                </NavLink>
              </li>

              <li className={style.logOut}>
                <SignOut />
              </li>
            </div>
          </>
        ) : (
          <>
            <div className={style.user}>
              <h2 className={style.logo}>Welcome Dear</h2>
            </div>
            <div className={style.icons}>
              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? {
                          borderRadius: "10px",
                          background: "#6da17b",
                        }
                      : undefined
                  }
                  className={style.list}
                  to="/"
                >
                  <img
                    className={style.imgIcon}
                    src="https://cdn-icons-png.flaticon.com/128/609/609803.png"
                    alt="Home"
                  />
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? {
                          borderRadius: "10px",
                          background: "#6da17b",
                        }
                      : undefined
                  }
                  className={style.list}
                  to="/signIn"
                >
                  <img
                    className={style.imgIcon}
                    src="https://cdn-icons-png.flaticon.com/128/40/40358.png"
                    alt=""
                  />
                  Sign In
                </NavLink>
              </li>
            </div>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
}
