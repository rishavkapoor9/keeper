import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";


function Login(props) {
    const [login,setLogin] = useState(false);
    const [data, setData] = useState({
        username: String,
        password: String
    })
    function changeData(event) {
        const changedValue = event.target.name;
        const newValue = event.target.value;
        setData((prevValue) => {
            return {
                ...prevValue,
                [changedValue]: newValue
            }
        })
    }
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers = {
        'X-Requested-With': 'XMLHttpRequest',
    };
    Axios.defaults.credentials = 'include';

    function submit(event) {
        Axios.post("http://localhost:4000/login", { username: data.username, password: data.password }).then(() => {
            Axios.get("http://localhost:4000/login")
                .then(response => {
                    if (response.data.isAuthenticated) {
                        setLogin(true)
                        props.updateUser(response.data.user);

                    } else {
                        console.log("bye")
                    }
                })
                .catch(error => {
                    console.error("Error occurred:", error);
                });
        })
            .catch(error => {
                console.error("Error occurred:", error);
            });

        event.preventDefault();

    }
    useEffect(()=>{
        Axios.get("http://localhost:4000/login").then((response) => {
          if (response.data.isAuthenticated) {
            setLogin(true)
          } else {
            console.log("bye")
          }
        })
      },[])



    return (
        login===true ? <Navigate to="/main" /> :
        <div>
            <main className="form-signin w-100 m-auto text-center" >
                <form>
                    <img alt="bulb" className="signup-heading signup-heading-img" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"></img>
                    <h1 className="h3 mb-3 fw-normal signup-heading">Login to <strong>Keeper</strong></h1>
                    <div className="form-floating">
                        <input type="email" className="form-control top-signin" id="top" name="username" placeholder="Email id" required onChange={changeData} />
                        <label for="top">Email id</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control bottom-signin" id="bottom" name="password" placeholder="password" required onChange={changeData} />
                        <label for="bottom">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" onClick={submit}>Submit</button>
                    <p className="login-statement">Don't have an account yet? <a className="login-link" href="/signup">Signup</a> instead.</p>
                </form>
                {/* <button onClick={checkAuthentication}>Check Authentication</button> */}

            </main>
        </div>
    )
}

export default Login;