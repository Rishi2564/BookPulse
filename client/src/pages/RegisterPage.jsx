import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
//BIGRjafO5bPhOTmm
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

function registerUser(ev){
    ev.preventDefault();
    axios.post('/register',{
        name,
        email,
        password,
    })
}

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" action=""onSubmit={registerUser} >
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            name=""
            id=""
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            name=""
            id=""
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
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
