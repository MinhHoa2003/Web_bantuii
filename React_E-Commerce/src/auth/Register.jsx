import React, { useState } from 'react'
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/ApiFunction';
const Register = () => {
    const[registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      });
      const navigate = useNavigate();
      const[errorMessage, setErrorMessage] = useState("");
      const[successMessage, setSuccessMessage] = useState("");
    
      const handleInputChange = (e) => {
        setRegistration({...registration, [e.target.name] : e.target.value});
      }
    
      const handleRegistration = async (e) => {
        e.preventDefault();
        try {
          const result = await registerUser(registration);
          setSuccessMessage(result);
          setErrorMessage("");
          setRegistration({
            firstName : "", 
            lastName : "", 
            email : "", 
            password : "" 
          });
          navigate("/login")
        } catch (error) {
          setSuccessMessage("");
          setErrorMessage(`Registration error : ${error.message}`);
        }
        setTimeout(() => {
          setErrorMessage("");
          setSuccessMessage("");
        }, 5000);
      }
    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                {successMessage && <p className="alert alert-success">{successMessage}</p>}
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleRegistration}>
                            <div class="form my-3">
                                <label for="Name">First Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    name='firstName'
                                    id="firstName"
                                    placeholder="Enter Your First Name"
                                    onChange={handleInputChange}
                                    value={registration.firstName}
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Name">Last Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="lastName"
                                    name='lastName'
                                    placeholder="Enter Your Last Name"
                                    onChange={handleInputChange}
                                    value={registration.lastName}
                                />
                            </div>
                            <div class="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    name='email'
                                    placeholder="name@example.com"
                                    onChange={handleInputChange}
                                    value={registration.email}
                                />
                            </div>
                            <div class="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    name='password'
                                    id="password"
                                    placeholder="Password"
                                    onChange={handleInputChange}
                                    value={registration.password}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                                <button class="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register