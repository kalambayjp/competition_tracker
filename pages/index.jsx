import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleButton } from "react-google-button";
import { useRouter } from "next/router";
import { authWithGoogle, regWithEmail, loginWithEmail, auth } from "../helpers/authentication/index"

const signInPage = () => {
    const [usrName, setUsrName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [authState, setAuthState] = useState('login');
    const [err, setErr] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    const toggleAuthState = () => {
        authState === "login" ? setAuthState('register') : setAuthState('login');
    }

    useEffect(() => {
        console.log("Loading:", loading, "|", "User:", user);
        if(user) {
            router.push("/home");
        }
    }, [user])

    return (
        <div className="auth open">

            <div className={`modal ${authState === "login" ? "active" : ""}`}>

                <h2>Login with Email/Password</h2>
                <form className="login" onSubmit={(e) => loginWithEmail(e, email, pass, setErr)}>
                
                    <input type="text" value={email} placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type="password" value={pass} placeholder={"Password"} onChange={(e) => setPass(e.target.value)}></input>
                    
                    <button type="submit">Login</button>
                    <p className="error"> {err} </p>
                </form>
                
                <p>Or</p>

                <h2>Login with Google</h2>
                <GoogleButton onClick={authWithGoogle} />

                <div>
                    No account? <a className="switch" onClick={toggleAuthState}>Register instead</a>
                </div>
            </div>

            <div className={`modal ${authState === "register" ? "active" : ""}`}>
                <h2>Register with Email/Password</h2>
                <form className="register" onSubmit={(e) => regWithEmail(e, email, usrName, pass, confirmPass, setErr)}>
                
                    <input type="text" value={usrName} placeholder={"Username"} onChange={(e) => setUsrName(e.target.value)}></input>
                    <input type="text" value={email} placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}></input>
                    <input type="password" value={pass} placeholder={"Password"} onChange={(e) => setPass(e.target.value)}></input>
                    <input type="password" value={confirmPass} placeholder={"Password"} onChange={(e) => setConfirmPass(e.target.value)}></input>
                    
                    <button>Register</button>
                    <p className="error" >{err}</p>
                </form>
                
                <p>Or</p>

                <h2>Register with Google</h2>
                <GoogleButton onClick={authWithGoogle} />

                <div>
                    Got an account? <a className="switch" onClick={toggleAuthState}>Login instead</a>
                </div>

            </div>

        </div>
    )
}

export default signInPage;