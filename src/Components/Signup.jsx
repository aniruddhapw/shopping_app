import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
const Signup = () => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  var hashedPassword ;

  // Compare the password with the hash
  // const isMatch = bcrypt.compareSync(password, hashedPassword);
// console.log(isMatch); // true
var success=false;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("https://640578aa40597b65de37f1b3.mockapi.io/userInfo", {
        email,
      
      });
      
      for (var i = 0; i < response.data.length; i++) {
        if (
          response.data[i].email === email
        ) {
         
        success=false;
         
          break;
        }
        else {
          success=true;
         
         
      }
    }
    hashedPassword = bcrypt.hashSync(password, 10);
    
      if(success===true){
        alert("succesfull regirstration")
          console.log("correct")
          const response = await axios.post("https://640578aa40597b65de37f1b3.mockapi.io/userInfo", {
        name,
        hashedPassword,
        email,
      });
      navigate("/login");
      }else{
        alert("email already regestered")
         console.log("unsuccesful")
      }
      // navigate("/login");
      // handle successful signup
    } catch (error) {
      // handle error response
      console.error(error);
    }
  };

  return (
    <div >
         <form onSubmit={handleSubmit} className='container'>
         <h2>Sign up</h2>
      <input
        type="text"
        placeholder="Username"
        value={name}
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
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <button type="submit">Signup</button>
    </form>
    </div>
    
  );
};

export default Signup;