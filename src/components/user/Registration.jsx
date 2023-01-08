import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import "../user/Registration.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import user from "../service/User";
import Header from "../../Header"

function Registraton() {
    let history = useHistory();
    const [formValue, setForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        dateOfBirth: "",
        email: "",
        password: "",
        isUpdate: false,
        submitButton: false,
    });

    const params = useParams();
    useEffect(() => {
        if (params.userId) {
            getUserId(params.userId);
        }
    }, [params.userId]);


    const getUserId = (userId) => {
        user.findPerson(userId).then((data) => {
            let obj = data.data.addressBook;
            setData(obj);
        })
    }

    const setData = (obj) => {
        setForm({
            ...formValue,
            ...obj,
            id: obj.id,
            firstName: obj.firstName,
            lastName: obj.lastName,
            address: obj.address,
            dateOfBirth: obj.dateOfBirth,
            email: obj.email,
            password: obj.password,
            isUpdate: true,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("Save");
        let person = {
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            address: formValue.address,
            dateOfBirth: formValue.dateOfBirth,
            email: formValue.email,
            password: formValue.password,
        };
        if (formValue.isUpdate) {
            user.updatePerson(params.id, person)
                .then((data) => {
                    var value = window.confirm(data);
                    if (value === true) {
                        alert("update successfull!");
                    } else {
                        window.location.reload();
                    }
                });
        } else {
            user.createPerson(person).then((data) => {
                alert(data.data.message)
                let severity = data.data.message
                console.log(severity);
                if (severity == "Successfully registration is complete ") {
                    history.push('/login')
                }
                console.log(data.data.data);
            })
        }
    }

    const reset = () => {
        setForm({
            firstName: "",
            lastName: "",
            address: "",
            dateOfBirth: "",
            email: "",
            password: "",
        });
    };

    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
        console.log('value for', event.target.name, event.target.value);
    }
    function validateForm() {
        return formValue.firstName.length > 3;
    }


    return (

        <div>
            <Header />
            <div class="form-content">
                <form class="form" action="#">
                    <div class="form-head">
                        <span class="form-head-text">User Registration Form</span>
                        <span1 class="cross-icon">
                            <Link to="/login">
                                <CloseIcon color="error"></CloseIcon>
                            </Link>
                        </span1>
                    </div>
                    <div class="body">
                        <div class="Name">
                            <TextField fullWidth label="First Name" id="fullWidth" margin="normal" value={formValue.firstName} name="firstName" onChange={onNameChange} />
                            <TextField fullWidth label="Last Name" id="fullWidth" margin="normal" value={formValue.lastName} name="lastName" onChange={onNameChange} />
                        </div>
                        <TextField fullWidth label="Address" id="fullWidth" margin="normal" multiline Rows={4} value={formValue.address} name="address" onChange={onNameChange} />
                        <div class="Name">
                            <TextField fullWidth label="email" id="fullWidth" margin="normal" value={formValue.email} name="email" onChange={onNameChange} />
                            <TextField fullWidth label="Date Of Birth" margin="normal" value={formValue.dateOfBirth} name="dateOfBirth" onChange={onNameChange} />
                        </div>
                        <TextField type="password" fullWidth label="password" margin="normal" value={formValue.password} name="password" onChange={onNameChange} />
                        <div class="add-reset">

                            <Button type="submit" disabled={!validateForm()} variant="contained" class="addButton" onClick={onSubmit} id="addButton" color="success" >{formValue.isUpdate ? 'Update' : 'Submit'}</Button>

                            <Button type="reset" variant="outlined" class="resetButton" id="resetButton" color="error" onClick={reset}>Reset</Button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Registraton;