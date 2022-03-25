import React, {useState, useEffect} from 'react';
import { useParams } from "react-router";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const OneAuthorDetail = () => {

    const {_id} = useParams();
    const [info, setInfo] = useState({})
    const history = useHistory();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/authors/${_id}`)
            .then(res=>{
                console.log("Response->", res)
                setInfo(res.data.author);
            })
            .catch(err=>{
                console.log("ERROR OCCUR!->", err)
            })

    }, [])

    const deleteAuthor = ()=>{
        console.log("Deleting Author ID->", _id)
        axios.delete(`http://localhost:8000/api/authors/delete/${_id}`)
            .then(res=>{
                console.log(res);
                history.push("/");
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <div>
            <h2>{info.name}</h2>
            <button onClick = {deleteAuthor} className='btn btn-danger'>Delete {info.title}</button>
        </div>
    ); 
};

export default OneAuthorDetail;