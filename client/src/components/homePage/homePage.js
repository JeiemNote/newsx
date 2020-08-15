import React, {useEffect, useState} from "react";
import "./homePage.css"
import {Button, Form, Navbar, Nav, Modal,} from "react-bootstrap"
import {PostElement} from "../postElement/PostElement";
import axios from "axios";
import { useHistory } from "react-router-dom";

export let HomePage = (props) => {

    const api_url_add_post = "http://localhost:8080/api/home/add"
    const api_url_get_posts = "http://localhost:8080/api/home/get/"
    const api_url_del_post = "http://localhost:8080/api/home/del/"
    const api_url_edit_post = "http://localhost:8080/api/home/edit/"

    const username = localStorage.getItem('username')
    let history = useHistory();

    const [show, setShow] = useState(false);
    const [postTittle, setPostTittle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [posts, setPosts] = useState([])
    const [editPost, setEditPost] = useState(false)
    const [editPostId, setEditPostId] = useState('')

    const handleClose = () => {
        setShow(false)
        setPostTittle('')
        setPostBody('')
        setEditPost(false)
    }
    const handleShow = () => setShow(true)

    let titleChange = (e) => {
        setPostTittle(e.target.value)
    }
    let bodyChange = (e) => {
        setPostBody(e.target.value)
    }
    let postDelete = async (id) => {
        setLoading(true)
        await axios.delete(`${api_url_del_post}${id}`, {headers:{'Authorization':localStorage.getItem('token')}}).then( res=> {
            loadData()
            setLoading(false)
        })
    }
    let postEdit = (check,id) => {
        setShow(check)
        setEditPost(check)
        let editPost = posts.filter(post => post.id === id)
        setPostTittle(editPost[0].postTitle)
        setPostBody(editPost[0].postBody)
        setEditPostId(id)
        setLoading(true)
    }
    let postEditSend = async () => {
        await axios.put(`${api_url_edit_post}${editPostId}`,{username, postTittle,postBody},{headers:{Authorization:localStorage.getItem('token')}}).then( res=> {
            loadData()
            setLoading(false)
            setEditPost(false)
            setShow(false)
        })
    }

    const loadData =  async () => {
        setLoading(true)
        let data = []
        await axios.get(api_url_get_posts,{headers:{Authorization:localStorage.getItem('token')}}).then( res => {
            setLoading(false)
            data = res.data
            let authorPost = data.filter( post => post.author === localStorage.getItem('username'))
            setPosts(authorPost)
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
        delete={postDelete}
        edit={postEdit}
        button={true}
    />);

    let handlerForm = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(false)
        try {
            await axios.post(api_url_add_post, {username, postTittle,postBody},{headers:{'Authorization':localStorage.getItem('token')}}).then(res => {
                setLoading(false)
                loadData()
                // Результат ответа от сервера
            });
            if (!loading) {
                history.push("/home")

            }
        }catch (e) {
            setError(true)
            setLoading(false)
            setErrorMessage("Что-то не так, проверьте данные и попробуйте ещё раз")
        }
        setShow(false);
    }

    let userExit = () => {
        localStorage.clear()
        history.push("/login")
    }

    return (
        <div className="homeForm">
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>New post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Tittle</Form.Label>
                        <Form.Control value={postTittle} onChange={titleChange} placeholder="Tittle"/>
                    </Form>
                    <Form className="post">
                        <Form.Label>Post</Form.Label>
                        <Form.Control as="textarea" value={postBody} onChange={bodyChange} className="postBody"/>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    {editPost ?
                        <Button variant="primary" onClick={postEditSend}>
                        Edit post
                    </Button>
                        :
                    <Button variant="primary" onClick={handlerForm}>
                        Send post
                    </Button>}
                </Modal.Footer>
            </Modal>

            <Navbar bg="light" expand="lg">
                <Navbar.Brand>NewsX</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button className="mr-3" onClick={handleShow} variant="outline-success">New post</Button>
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