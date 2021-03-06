import React, {useState} from "react";
import "./Registration.css"
import {Alert, Button, Form,} from "react-bootstrap"
import {NavLink} from "react-router-dom";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {UrlLogin} from "./constants";

export let Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    let history = useHistory();
    let handlerForm = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post(UrlLogin, {username, password}).then(res => {
                localStorage.setItem('token', res.data.accessToken)
                setErrorMessage('')
                setLoading(false)
            });
            if (!loading) {
                localStorage.setItem('username', username)
                history.push("/home")
            }
        } catch (e) {
            setLoading(false)
            setErrorMessage("Что-то не так, проверьте данные и попробуйте ещё раз")
        }
    }

    let UsernameChange = (event) => {
        setUsername(event.target.value)
    }
    let PasswordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div className="wrapper">
            <div className="loginForm">
                <div className="titlePage">Login</div>
                {errorMessage ? <Alert variant="danger">{errorMessage}</Alert>
                    : <div></div>}
                {loading ?
                    <div className="loadingTittle">
                        <div className="lds-circle">
                            <div></div>
                        </div>
                        <div className="textTittle">Loading</div>
                    </div> :
                    <Form onSubmit={handlerForm}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username address</Form.Label>
                            <Form.Control className="noBorder formControl" value={username} onChange={UsernameChange}
                                          type="username" placeholder="Enter username"/>
                            <Form.Text className="text-muted">
                                Username specified during registration
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="noBorder formControl" type="password" value={password}
                                          onChange={PasswordChange} placeholder="Password"/>
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Login
                        </Button>
                        <Form.Text className="text-muted">
                            <NavLink to="/registration">Ещё не зарегестрированы?</NavLink>
                        </Form.Text>
                    </Form>}
            </div>
        </div>
    )
}