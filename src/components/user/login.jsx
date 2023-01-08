import "../user/login.css"
import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import user from "../service/User";
import Header from "../../Header"

function Login() {
    let history = useHistory();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const login = (event) => {
        event.preventDefault();
        let object = {
            password: password,
            email: email
        };
        console.log(object)
        window.localStorage.clear();
        if (email === "" && password === "") {
            alert("Enter input all Fileds")
        }else {
            user.login(object).then((response) => {
                console.log(response.data.data);
                let severity = response.data.message === "Successfully Login User Information " ? "success" : "error";
                console.log(severity);
                severity === "success" ? localStorage.setItem('Authorization', response.data.data.userId) : localStorage.setItem('Authorization', "null")
                severity === "success" ? localStorage.setItem('Name', response.data.data.firstName) : localStorage.setItem('Name', "null")
                console.log(severity);
                console.log(response.data.data.userId)
                console.log(response.data.data.firstName)
                console.log(response.headers)
                history.push("/home");
            })}
        }
    return (
        <div>
            <Header/>
            <div class="form-content">
                <form class="form1">
                    <div class="form-head">
                        <span class="form-head-text">User Login</span>
                        <span1 class="cross-icon">
                            <Link to="">
                                <CloseIcon color="error"></CloseIcon>
                            </Link>
                        </span1>
                    </div>
                    <div class="body">
                        <TextField fullWidth label="Email" id="fullWidth" margin="normal" onChange={(e) => setEmail(e.target.value)} />
                        <TextField type="password" fullWidth label="Password" id="fullWidth" margin="normal" onChange={(e) => setPassword(e.target.value)} />
                        <Link to="/">
                            <Button className="Login" disabled={!validateForm()} variant="contained" color="success" onClick={login}>Login</Button>
                        </Link>
                        <div class="button">
                            <Link class="createAccount" to="/createAccout">Create New Account</Link>
                            <Link class="createAccount" to="">Forgot Password</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;