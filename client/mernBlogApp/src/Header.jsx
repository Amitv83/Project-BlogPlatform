import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
import { useContext, useEffect, useState } from "react";

export default function Header() {
  const navigate=useNavigate();
  const { setuserinfo, userinfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userinfo) => {
        setuserinfo(userinfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });

    setuserinfo(null);
  }
  console.log(userinfo);
  const username = userinfo?.username;

  return (
    <>
      <header>
        <Link to="/" className="logo">
          MyBlog
        </Link>
        <nav className="navLinks">
          {username && (
            <>
              <button onClick={()=>navigate('/create')}> Create new post</button>
              <button onClick={logout}>Logout</button>
            </>
          )}

          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
