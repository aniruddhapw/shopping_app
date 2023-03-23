import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  var login = false;
  var email_check = false;
  var password_check = false;
  var hashedPassword;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        "https://640578aa40597b65de37f1b3.mockapi.io/userInfo",
        {
          email,
          hashedPassword,
        }
      );
      for (var i = 0; i < response.data.length; i++) {
        if (
          response.data[i].email === email &&
           bcrypt.compareSync( password,response.data[i].hashedPassword)
        ) {
          login = true;

          break;
        } else if (response.data[i].email !== email) {
          email_check = true;
          login = false;
          // console.log("not correct")
          // alert("Enter Correct Credentials");
        } else if (response.data[i].hashedPassword !== bcrypt.hashSync(password, 10)) {
          password_check = true;
          email_check=false;
        
          login = false;
        } else {
          login = false;
        }
      }
      if (login === true) {
        alert("Login Succesfull");

        console.log("succesfull");
        navigate("/home");
      } else if (email_check === true && password_check===false) {
        alert("Enter correct email");
      } else if (password_check === true) {
        alert("Enter correct password");
      } else {
        alert("Both email and password are wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="container">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>Dont have an account? </p>
        <button onClick={()=>{navigate("/signup")}}>Sign up</button>
      </form>
    </div>
  );
};

export default Login;
