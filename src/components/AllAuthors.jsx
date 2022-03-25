import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Link
} from "react-router-dom";


const AllAuthors = (props) => {

    const [authorList, setAuthorList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            .then(res => {
                console.log("Response-->", res)
                setAuthorList(res.data.author);
            })
            .catch(err => {
                console.log("ERROR OCCUR!", err)
            })
    }, [props.formSubmitted])

    const deleteAuthor = (authorId) => {
        axios.delete(`http://localhost:8000/api/authors/delete/${authorId}`)
            .then(res => {
                console.log("Deleting!->", res)
                let filteredList = authorList.filter((authorObj) => {
                    return authorObj._id !== authorId
                })
                setAuthorList(filteredList)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h3>We have Quotes By:</h3>
            {
                authorList.map((authorObj) => {
                    return (
                        <div className="card" key={authorObj._id}>
                            <div className="card-body">
                                <h4 className="card-title"><Link to={`/${authorObj._id}`}>{authorObj.name}</Link></h4>
                                <br />
                                <Link to={`/edit/${authorObj._id}`} className='btn btn-secondary m-3'>Edit {authorObj.name}</Link>
                                <button onClick={() => { deleteAuthor(authorObj._id) }} className="btn btn-danger m-3">Delete</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default AllAuthors;