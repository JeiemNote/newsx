import React from "react";
import "./PostElement.css"
import {Button} from "react-bootstrap";

export let PostElement = (props) => {


    let deleteFun = () =>{
        props.delete(props.id)
    }
    let editFun = () =>{
        let check = true
        props.edit(check,props.id)
    }
    let test = new Date(Date.parse(props.date))
    let day = (test.getDate() < 10) ? '0' + test.getDate() : test.getDate();
    let month = (test.getMonth() < 10) ? '0' + test.getMonth() : test.getMonth();
    let hour = (test.getHours() < 10) ? '0' + test.getHours() : test.getHours();
    let minute = (test.getMinutes() < 10) ? '0' + test.getMinutes() : test.getMinutes();
    let second = (test.getSeconds() < 10) ? '0' + test.getSeconds() : test.getSeconds();
    let test2 = `${day}.${month}.${test.getFullYear()} ${hour}:${minute}:${second}`

    return (
        <div className="news">

            <div className="newsTittle">{props.postTitle}</div>
            <div className="newsContent">
                {props.postBody}
            </div>
            <div className="newsInfo">
                <div className="newsAuthor">Author: {props.author}</div>
                <div className="newsDate">Date: {test2}</div>

                {props.button ?
                    <div>
                        <Button className="newsButton" onClick={deleteFun} variant="outline-danger">Delete</Button>
                        <Button className="newsButton" onClick={editFun} variant="outline-danger">Edit</Button>
                    </div>
                    :<div/>}

            </div>
        </div>
    )
}