import React, {useState} from "react";
import "./Registration.css"
import {Button, Form, Alert} from "react-bootstrap"
import { useHistory } from "react-router-dom";
import axios from "axios";

export let Registration = () => {
    const api_url_reg = "http://localhost:8080/api/reg"

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    let history = useHistory();

    let handlerForm = async (e) => {
        e.preventDefault()
        if (!(password === passwordRepeat)) {
            setError(true)
            setErrorMessage("Пароли не совпадают!")
        } else {
            setLoading(true)
            setError(false)

            console.log(username, email, password)
            try {
                await axios.post(api_url_reg, {username, email, password}).then(res => {
                    console.log(res)
                    setLoading(false)
                    // Результат ответа от сервера
                });
                if (!loading) {
                    history.push("/login")
                }
            }catch (e) {
                setError(true)
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
                {error ?<Alert variant="danger">{errorMessage}</Alert>
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