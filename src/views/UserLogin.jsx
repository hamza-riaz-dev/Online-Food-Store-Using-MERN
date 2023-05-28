import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UserLogin() {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const submitToBackend = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      console.log(localStorage.getItem("userEmail"));
      navigate("/");
    }
  }
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <Navbar />
      <div className='container'>
        <form onSubmit={submitToBackend}>
          <div className="form-group mt-5">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" value={credentials.email} className="form-control" id="exampleInputEmail1" placeholder="Enter email" onChange={onChange} />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name="password" value={credentials.password} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={onChange} />
          </div>

          <button type="submit" className="btn btn-dark mt-3">Sign in</button>
          <Link to="/createuser" className='btn btn-outline-dark mt-3 ms-3'>Create a new account</Link>
        </form>
      </div>
      <Footer />
    </>
  )
}
