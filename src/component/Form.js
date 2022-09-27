import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { app } from "../Fire";
import { Link } from "react-router-dom";
import "./form.css";

const Form = (props) => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (event) => {

        event.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                alert(error.message);
            });
    };

    const createUser = (event) => {
        event.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <form className="form">
            <div className="form-page">
                <h1 className="form-title">{props.pageTitle}</h1>
                <input
                    className="form-input"
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    required
                    placeholder="Email"
                />
                <input
                    className="form-input"
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    placeholder="Password"
                />
                {props.pageTitle === "LOGIN" ? (
                    <section className="form-button-layout">
                        <button className="form-button" onClick={(event) => login(event)} >
                            Login
                        </button>
                        <br></br>
                        <small>
                            Dont have an account?{" "}
                            <Link to="/register">
                                <b>Register</b>
                            </Link>{" "}
                        </small>
                    </section>
                ) : (
                    <section className="form-button-layout">
                        <button className="form-button" onClick={(event) => createUser(event)} >
                            Register
                        </button>
                        <br></br>
                        <small>
                            Already an user{" "}
                            <Link to="/">
                                <b>Login</b>
                            </Link>
                        </small>

                    </section>
                )}
            </div>
        </form>
    );
};

export default Form;