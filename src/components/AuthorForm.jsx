import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {
    Link
} from "react-router-dom";

const AuthorForm = (props) => {

    let [name, setName] = useState("");
    let [formErrors, setFormErrors] = useState({})

    const history = useHistory();

    const createAuthor = (e) => {
        e.preventDefault();

        let formInfo = {name};

        axios.post("http://localhost:8000/api/authors", formInfo)
            .then(res => {
                console.log("Posting Author-->", res);
                if (res.data.error) {
                    setFormErrors(res.data.error.errors);
                } else {
                    props.setFormSubmitted(!props.formSubmitted)

                    setName("");
                    setFormErrors({});

                    history.push("/")
                }
            })
            .catch(err => {
                console.log("ERROR OCCUR! Author FORM->", err);
            })
    }

    return (
        <div>
            <form onSubmit={createAuthor}>

                <div className="form-group">
                    <label htmlFor="">Name:</label>
                    <input type="text" name="" id="" className="form-control" onChange={(e) => { setName(e.target.value) }} value={name} />
                    <p className="text-danger">{formErrors.name?.message}</p>
                </div>
                <Link to="/" className="btn btn-success m-3">Cancel</Link>
                <input className="btn btn-info m-3" type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AuthorForm;