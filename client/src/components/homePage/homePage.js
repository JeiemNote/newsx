import React, {useEffect, useState} from "react";
import "./homePage.css"
import {PostElement} from "../postElement/PostElement";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {Navigationbar} from "../navbar/Navigationbar";
import {loadData} from "../service/LoadData";
import {UrlDelPost} from "../constants";
import {ModalNewPost} from "../Modals/ModalNewPost";
import {Alert} from "react-bootstrap";

export let HomePage = () => {

    let history = useHistory()
    const [postTittle, setPostTittle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [posts, setPosts] = useState([])
    const [editPost, setEditPost] = useState(false)
    const [editPostId, setEditPostId] = useState('')

    let load = () => {
        if (localStorage.getItem('token')) {
            try {
                loadData().then(res => {
                    let authorPost = res.filter(post => post.author === localStorage.getItem('username'))
                    setPosts(authorPost)
                    setErrorMessage('')
                })
            } catch (e) {
                setErrorMessage('Призошла ошибка загрузки данных')
            }
        } else {
            history.push("/login")
        }
    }
    useEffect(() => {
        load()
    }, [load])

    let postDelete = async (id) => {
        try {
            await axios.delete(`${UrlDelPost}${id}`, {headers: {'Authorization': localStorage.getItem('token')}}).then(res => {
                load()
                setErrorMessage('')
            })
        } catch (e) {
            setErrorMessage('Произошла ошибка при удалении поста!')
        }
    }
    let postEdit = (check, id) => {
        let Post = posts.filter(post => post.id === id)
        setPostTittle(Post[0].postTitle)
        setPostBody(Post[0].postBody)
        setEditPostId(id)
        setEditPost(true)
    }
    let handleClose = () => {
        setEditPost(false)
    }
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
    />)

    return (
        <div className="homeForm">
            <Navigationbar errorMessage={setErrorMessage} load={load}/>
            {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : <div/>}
            {editPost ?
                <ModalNewPost
                    show={editPost}
                    onHide={handleClose}
                    postTittle={postTittle}
                    postBody={postBody}
                    postId={editPostId}
                    errorMessage={setErrorMessage}
                    edit={true}
                />
                : <div/>}
            <div className="contents">
                {postElements}
            </div>
        </div>
    )
}