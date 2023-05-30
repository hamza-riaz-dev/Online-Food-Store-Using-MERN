import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", address: "" })

    let navigate = useNavigate();

    const submitToBackend = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, address: credentials.address })
        });
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials");
        }
        if (json.success) {
            navigate("/userlogin");
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
                        <label htmlFor="formGroupExampleInput">Name</label>
                        <input type="text" name="name" value={credentials.name} className="form-control" id="formGroupExampleInput" placeholder="Enter your name" onChange={onChange} />
                        <div id="emailHelp" class="form-text">Please enter a name of minimum 5 characters.</div>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" name="email" value={credentials.email} className="form-control" id="exampleInputEmail1" placeholder="Enter email" onChange={onChange} />
                        <div id="emailHelp" class="form-text">Please enter a valid email address.</div>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" name="password" value={credentials.password} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={onChange} />
                        <div id="emailHelp" class="form-text">Please enter a password of minimum 5 characters.</div>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="inputAddress">Address</label>
                        <input type="text" name="address" value={credentials.address} className="form-control" id="inputAddress" placeholder="1234 Main St, Area, City, Province." onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-dark mt-3">Create account</button>
                    <Link to="/userlogin" className='btn btn-outline-dark mt-3 ms-3'>Already have an account?</Link>

                </form>
            </div>
            <Footer />
        </>
    )
}
