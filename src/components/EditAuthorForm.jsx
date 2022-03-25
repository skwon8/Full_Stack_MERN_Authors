import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import {
    Link
} from "react-router-dom";


const EditAuthorForm = () => {

    let [authorInfo, setAuthorInfo] = useState({
        name: "",
    })

    let { _id } = useParams();

    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${_id}`)
            .then(res => {
                console.log("Response->", res);
                setAuthorInfo(res.data.author)
            })
            .catch(err => {
                console.log("ERROR OCCUR!->", err);
            })
    }, [])

    const changeHandler = (e) => {
        setAuthorInfo({
            ...authorInfo,
            [e.target.name]: e.target.value
        })
    }



    const updateAuthor = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/authors/update/${_id}`, authorInfo)
            .then(res => {
                console.log("Updated ->", res)
                history.push('/')
            })
            .catch(err => {
                console.log("ERROR OCCUR IN UPDATE!", err)
            })
    }

    return (
        <div>
            <p>Edit This Author: {authorInfo.name}</p>
            <form onSubmit={updateAuthor}>
                <div className="form-group">
                    <label htmlFor="">Name:</label>
                    <input type="text" name="name" id="" className="form-control" onChange = {changeHandler} value={authorInfo.name}/>
                </div>
                <Link to="/" className="btn btn-info m-3">Cancel</Link>
                <input className="btn btn-info m-3" type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default EditAuthorForm;