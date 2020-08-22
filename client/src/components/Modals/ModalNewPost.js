import React, {useEffect, useState} from "react";
import {Button, Form, Modal,} from "react-bootstrap"
import {UrlAddPost, UrlEditPost} from "../constants";
import axios from "axios";

export const ModalNewPost = (props) => {

    const [postTittle, setPostTittle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [edit, setEdit] = useState(false)

    let titleChange = (e) => {
        setPostTittle(e.target.value)
    }
    let bodyChange = (e) => {
        setPostBody(e.target.value)
    }
    let handlerFor = async () => {
        try {
            let username = localStorage.getItem('username')
            await axios.post(UrlAddPost,
                {username, postTittle,postBody},
                {headers:{'Authorization':localStorage.getItem('token')}}).then(res => {
                props.errorMessage('')
                props.onHide()
            })
        }catch (e) {
            props.errorMessage('Произошла ошибка при добавлении поста!')
            props.onHide()
        }
    }

    let postEditSend = async () => {
        let username = localStorage.getItem('username')
        try {
            await axios.put(
                `${UrlEditPost}${props.postId}`,
                {username, postTittle,postBody},
                {headers:{Authorization:localStorage.getItem('token')}}).then( res=> {
                props.errorMessage('')
                props.onHide()
            })
        }catch (e) {
            props.errorMessage('Произошла ошибка при изменении поста!')
            props.onHide()
        }
    }

    useEffect(()=>{
        if(props.edit === !edit){
            setEdit(true)
            setPostTittle(props.postTittle)
            setPostBody(props.postBody)
        }else{setEdit(false)}}
    ,[props.postBody,props.postTittle,edit,props.edit])

    return (
        <div>
            <Modal show={props.show} onHide={props.onHide} size="lg">
                <Modal.Header  closeButton>
                    <Modal.Title>Post</Modal.Title>
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
                    { edit ?
                    <Button variant="primary" onClick={postEditSend}>
                        Edit post
                    </Button> :
                        <Button variant="primary" onClick={handlerFor}>
                            Send post
                        </Button>}
                </Modal.Footer>
            </Modal>
        </div>
    )
}