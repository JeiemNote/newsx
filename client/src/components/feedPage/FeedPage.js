import React, {useEffect, useState} from "react";
import "./FeedPage.css"
import {PostElement} from "../postElement/PostElement";
import { useHistory } from "react-router-dom";
import {Navigationbar} from "../navbar/Navigationbar";
import {loadData} from "../service/LoadData";

export let FeedPage = () => {

    const [posts, setPosts] = useState([])
    let history = useHistory();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            loadData().then(res =>{
                setPosts(res)
            })
        }else{
            history.push("/login")
        }
    },[history])

    let postElements = posts.map(post => <PostElement
        key={post.id}
        id={post.id}
        postTitle={post.postTitle}
        postBody={post.postBody}
        date={post.date}
        author={post.author}
        button={false}
    />);

    return (
        <div className="homeForm">
            <Navigationbar />
            <div className="contents">
                {postElements}
            </div>
        </div>

    )
}