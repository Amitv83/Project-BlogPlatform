import { useState } from "react";

export default function RegisterPage() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),

      headers: { "content-type": "application/json" },
    });
    console.log(response)

    if (response.status === 200) {
      alert("registration successfull");
    } else {
      alert("registration failed");
    }
  }

  return (
    <>
      <form className="register" onSubmit={register}>
        <h1>Register </h1>
        <input
          value={username}
          onChange={(ev) => setusername(ev.target.value)}
          type="text"
          placeholder="username"
        />

        <input
          value={password}
          onChange={(ev) => setpassword(ev.target.value)}
          type="password"
          placeholder="password"
        />
        <button> register</button>
      </form>
    </>
  );
}
