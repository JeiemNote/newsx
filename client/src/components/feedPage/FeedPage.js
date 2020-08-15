import React, {useEffect, useState} from "react";
import "./FeedPage.css"
import {Button, Form, Navbar, Nav} from "react-bootstrap"
import {PostElement} from "../postElement/PostElement";
import axios from "axios";
import { useHistory } from "react-router-dom";

export let FeedPage = () => {

    const api_url_get_posts = "http://localhost:8080/api/home/get/"

    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    let history = useHistory();

    const loadData =  async () => {
        setLoading(true)
        let data = []
        await axios.get(api_url_get_posts,{headers:{Authorization:localStorage.getItem('token')}}).then( res => {
            setLoading(false)
            data = res.data
            setPosts(data)
            // Результат ответа от сервера
        });
    }

    useEffect(()=>{
        if(localStorage.getItem('username')){
            loadData()
        }else{
            history.push("/login")
        }
    },[])

    let postElements = posts.map(post => <PostElement
        key={post.id}
        id={post.id}
        postTitle={post.postTitle}
        postBody={post.postBody}
        date={post.date}
        author={post.author}
        button={false}
    />);

    let userExit = () => {
        localStorage.clear()
        history.push("/login")
    }

    return (
        <div className="homeForm">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>NewsX</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button onClick={userExit} variant="outline-success">Leave</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <div className="contents">
                {postElements}
            </div>
        </div>

    )
}