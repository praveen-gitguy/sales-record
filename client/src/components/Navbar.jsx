import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../services/auth/auth.context";

export default function Navbar() {
  const { authState, signout } = useAuthContext();
  const { user, profileFetchRequestCompleted } = authState;

  console.log(user);

  return (
    <nav className="navbar bg-light fixed-top mb-2 shadow py-3">
      <div className="container-fluid">
        <NavLink to={"/"} className="navbar-brand">
          Home
        </NavLink>

        {user && (
          <NavLink to="/create" className="btn btn-outline-secondary">
            Create Sale
          </NavLink>
        )}

        {profileFetchRequestCompleted && !user ? (
          <div className="d-flex" style={{ gap: "20px" }}>
            <NavLink to={"/auth/signin"} className="btn btn-primary">
              Signin
            </NavLink>
            <NavLink to={"/auth/signup"} className="btn btn-info">
              Signup
            </NavLink>
          </div>
        ) : profileFetchRequestCompleted ? (
          <button className="btn btn-danger" onClick={signout}>
            {user.email}(Signout)
          </button>
        ) : null}
      </div>
    </nav>
  );
}
