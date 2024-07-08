import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { AuthContext } from "./AuthenProvider";
import { loginUser } from "../utils/ApiFunction";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const handleInputChange = (e) => {
    setLogin({...login, [e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    if(success) {
      const token = success.token;
      auth.handleLogin(token);
      console.log(auth.user);
      // const decodedToken = jwtDecode(token);
      // localStorage.setItem("userId", decodedToken.sub);
      // localStorage.setItem("userRole", decodedToken.roles);
      // localStorage.setItem("token", token);
      // setUser(decodedToken);
      navigate("/");
      window.location.reload();
    } else {
      setErrorMessage("Invalid username or password. Please try again.")
    }
    setTimeout(() => {
      setErrorMessage("")
    }, 4000)
  }
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="display-4">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  value={login.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={login.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-3">
                <p>New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link> </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
