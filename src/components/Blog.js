import { MenuItem, TextField } from "@mui/material";
import { FormControl, InputLabel, Select } from "@mui/material";
import { useState } from "react";
import '../App.css'
import './Blog.css'
import { Link } from "react-router-dom";

function Blog() {

    const [myErrors, setMyErrors] = useState({ nameError: "", ageError: "", emaiError: "", PasswordError: "" })

    const validatePass = (event) => {
        event.preventDefault();
        var val = /^[0-9]\w{3,6}$/;
        if (!event.target.value)
            setMyErrors({ ...myErrors, PasswordError: "Required!!!" })
        else if (event.target.value.match(val)) {
            setMyErrors({ ...myErrors, PasswordError: 'Correct!!!' })
            //setUserData({ ...userData, passUser: event.target.value })
        }
        else
            setMyErrors({ ...myErrors, PasswordError: 'Wrong...!! password must be between 7 to 16 characters which contain only characters, numeric digits, underscore. and first character must be a letter' })
    }

    const validateName = (event) => {
        var val = /^[A-Za-z]\w{2,14}$/;
        if (!event.target.value)
            setMyErrors({ ...myErrors, nameError: "Required!!!" })
        else if (event.target.value.match(val)) {
            setMyErrors({ ...myErrors, nameError: 'Correct!!!' })
        }
        else {
            setMyErrors({ ...myErrors, nameError: 'Wrong...!! password password between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter' });
        }
        //setMyUser({ ...myUser, Myname: inputtxt.target.value })
    }

    const validateEmail = (event) => {
        if (!event.target.value)
            setMyErrors({ ...myErrors, emailError: "Required!!!" })
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(event.target.value))
            setMyErrors({ ...myErrors, emailError: "Wrong...!!" })
        else {
            //setUserData({ ...userData, email: event.target.value })
            setMyErrors({ ...myErrors, emailError: 'Correct!!!' })
        }
    }

    return <>
    
        <div className="App">
            
            <TextField onChange={(e) => validatePass(e)} id="passWord" label="passWord" variant="outlined" />
            <h3 className="error">{myErrors?.PasswordError}</h3>
            <TextField onChange={(e) => validateName(e)} id="fullName" label="fullName" variant="outlined" />
            <h3 className="error">{myErrors?.nameError}</h3>
            <TextField onChange={(e) => validateEmail(e)} id="email" label="email" variant="outlined" />
            <h3 className="error">{myErrors?.emailError}</h3>
            {myErrors && myErrors.PasswordError == 'Correct!!!' && myErrors.nameError == 'Correct!!!' && myErrors.emailError == 'Correct!!!' && <button><Link to={"/"}>confirm</Link></button>}
      {/* Email */}
        </div>
    </>
        
}

export default Blog;