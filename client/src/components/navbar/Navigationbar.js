import {Navbar, Button, Form, Nav} from "react-bootstrap";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {ModalNewPost} from "../Modals/ModalNewPost";


export const Navigationbar = (props) => {

    const [show, setShow] = useState(false);
    let history = useHistory();

    let userExit = () => {
        localStorage.clear()
        history.push("/login")
    }
    let handleShow = () => {
        setShow(true)
    }
    let handleClose = () => {
        props.load()
        setShow(false)
    }
    return (
        <div>
            <ModalNewPost show={show} errorMessage={props.errorMessage} onHide={handleClose}/>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>NewsX</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button onClick={handleShow} variant='outline-success'>New post</Button>
                        <Button onClick={userExit} variant="outline-success">Leave</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}