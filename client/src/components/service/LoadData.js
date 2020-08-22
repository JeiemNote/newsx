import axios from "axios";
import {UrlGetPosts} from "../constants";

export const loadData = async () => {
    let data = []
    await axios.get(
        UrlGetPosts,
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(res => {
            data = res.data
        });
    return data
}

