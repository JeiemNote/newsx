import React, {useState} from "react";
import "./Registration.css"
import {Button, Form, Alert} from "react-bootstrap"
import { useHistory } from "react-router-dom";
import axios from "axios";
import {UrlReg} from "./constants";

export let Registration = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    let history = useHistory();

    let handlerForm = async (e) => {
        e.preventDefault()
        if (!(password === passwordRepeat)) {
            setErrorMessage("Пароли не совпадают!")
        } else {
            setLoading(true)
            try {
                await axios.post(UrlReg, {username, email, password}).then(res => {
                    console.log(res)
                    setLoading(false)
                    setErrorMessage('')
                });
                if (!loading) {
                    history.push("/login")
                }
            }catch (e) {

                setLoading(false)
                setErrorMessage("Произошла непредвиденная ошибка, попробуйте позже")
            }
        }
    }
    let UsernameChange = (event) =>{
        setUsername(event.target.value)
    }
    let EmailChange = (event) =>{
        setEmail(event.target.value)
    }
    let PasswordChange = (event) =>{
        setPassword(event.target.value)
    }
    let PasswordRepeatChange = (event) =>{
        setPasswordRepeat(event.target.value)
    }
    return (
        <div className="wrapper">
            <div className="registrationForm">
                <div className="titlePage">Registration</div>
                {errorMessage ?<Alert variant="danger">{errorMessage}</Alert>
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
                        <Form.Label>Username</Form.Label>
                        <Form.Control className="noBorder formControl" type="username" volume={username} onChange={UsernameChange} placeholder="Enter your username" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className="noBorder formControl" type="email" volume={email} onChange={EmailChange} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="noBorder formControl" type="password" volume={password} onChange={PasswordChange} placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPasswordRepeat">
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control className="noBorder formControl" type="password" volume={passwordRepeat} onChange={PasswordRepeatChange} placeholder="Password" />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Sign up
                    </Button>
                </Form>}
            </div>
        </div>
    )
}