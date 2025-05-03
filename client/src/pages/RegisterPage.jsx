import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration succesfull. Now you can log in!");
    } catch {
      alert("Registration failed. Please try again!");
    }
  }

  return (
    <div className="mt-19 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4"><i>Register</i></h1>
        <form className="max-w-md mx-auto" action="" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            name=""
            id=""
            value={email}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            name=""
            id=""
            value={password}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            onChange={(ev) => setPassword(ev.target.value)}
          /> <br /><br />
          <button className="prim">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
