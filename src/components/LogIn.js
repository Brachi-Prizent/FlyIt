import { AccountCircle } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import './Home.css';
import './Login.css';
import { createNewCustomer } from "../utils/postService";
import { updateCustomer } from "../utils/putService";

export const LogIn = (props) => {

    const userFromAbout = props.userData;
    const setIsSohwUpdateDetiles = props.setIsSohwUpdateDetiles;
    const orderData = useSelector((state) => state.order.CurrentOrder);
    const userData = useSelector((state) => state.user.CurrentUser);

    const [user, setUser] = useState({ idCustomer: userData?.idCustomer, firstname: userData?.firstname, lastname: userData?.lastname, email: userData?.email, creditcard: userData?.creditcard });
    const [myErrors, setMyErrors] = useState(userData?.idCustomer ?
        {
            idCustomerError: "Correct!!!",
            firstnameError: "Correct!!!",
            lastnameError: "Correct!!!",
            emailError: "Correct!!!",
            creditcardError: "Correct!!!"
        }
        : {
            idCustomerError: 'Required!!!',
            firstnameError: 'Required!!!',
            lastnameError: 'Required!!!',
            emailError: 'Required!!!',
            creditcardError: 'Required!!!'
        })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newCustomer = async () => {
        debugger
        await createNewCustomer(user);
        dispatch(setCurrentUser([user]));
        if (JSON.stringify(orderData) == "{}" && userFromAbout == undefined)
            navigate('/');
    }

    const startedId = async () => {
        debugger
        setUser({ ...user, idCustomer: userFromAbout.idCustomer });
    }

    const updateTheCustomer = async () => {
        debugger
        await updateCustomer(user);
        dispatch(setCurrentUser([user]));
        setIsSohwUpdateDetiles(false);
    }
    const validateIdCustomer = (e) => {
        var val = /^[0-9]{9}$/;
        setUser({ ...user, idCustomer: e })
        if (!e) {
            setMyErrors({ ...myErrors, idCustomerError: "Required!!!" })
        }
        else if (e.match(val)) {
            setMyErrors({ ...myErrors, idCustomerError: 'Correct!!!' })
        }
        else {
            setMyErrors({ ...myErrors, idCustomerError: 'Wrong...!! password must be 9 digits' })
        }
    }

    const validatefirstname = (e) => {
        var val = /^[A-Z][a-z]{2,}$/;
        setUser({ ...user, firstname: e })
        if (!e) {
            setMyErrors({ ...myErrors, firstnameError: "Required!!!" })
        }
        else if (e.match(val)) {
            setMyErrors({ ...myErrors, firstnameError: 'Correct!!!' })
        }
        else {
            setMyErrors({ ...myErrors, firstnameError: 'Wrong...!! firstname must started with letter' });
        }

    }

    const validatelastname = (e) => {
        var val = /^[A-Z][a-z]{2,}$/;
        setUser({ ...user, lastname: e })
        if (!e) {
            setMyErrors({ ...myErrors, lastnameError: "Required!!!" })
        }
        else if (e.match(val)) {
            setMyErrors({ ...myErrors, lastnameError: 'Correct!!!' })
        }
        else {
            setMyErrors({ ...myErrors, lastnameError: 'Wrong...!! lastname must started with letter' });
        }
    }

    const validateEmail = (e) => {
        setUser({ ...user, email: e })
        if (!e) {
            setMyErrors({ ...myErrors, emailError: "Required!!!" })
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)) {
            setMyErrors({ ...myErrors, emailError: "Wrong...!!" })
        }
        else {
            setMyErrors({ ...myErrors, emailError: 'Correct!!!' })
        }
    }

    const validateCreditcard = (e) => {
        var val = /^[0-9]{16}$/;
        setUser({ ...user, creditcard: e })
        if (!e) {
            setMyErrors({ ...myErrors, creditcardError: "Required!!!" })
        }
        else if (e.match(val)) {
            setMyErrors({ ...myErrors, creditcardError: 'Correct!!!' })
        }
        else {
            setMyErrors({ ...myErrors, creditcardError: 'Wrong...!! creditcard must be 16 digits' });
        }

    }

    useEffect(() => {
        debugger
        if (userFromAbout != undefined) {
            startedId();
            validateIdCustomer(userFromAbout.idCustomer);
            validatefirstname(userFromAbout.firstname);
            validatelastname(userFromAbout.lastname);
            validateEmail(userFromAbout.email);
            validateCreditcard(userFromAbout.creditcard);
        }

    }, [])

    return (<>
        <div className='home'>
        {JSON.stringify(orderData) != "{}" && <div style={{width: "17vw", fontSize: "40px", color: "#00559b"}}>to continue insert your ditailes</div>}
            <div className={!orderData.idFlight && "border"}>
                <div className="a"><AccountCircle sx={{ fontSize: '120px', color: "#67c6b8" }}></AccountCircle></div>
                {userData.idCustomer == undefined && <div className="a"><TextField label="IdCustomer" value={user.idCustomer} variant="outlined" color="success" onChange={(e) => validateIdCustomer(e.target.value)} /><div className="error">{myErrors.idCustomerError}</div></div>}<br />

                <div className="a"><TextField label="Firstname" variant="outlined" color="success" value={user.firstname} onChange={(e) => validatefirstname(e.target.value)} /></div><div className="error">{myErrors.firstnameError}</div><br />

                <div className="a"><TextField label="Lastname" value={user.lastname} variant="outlined" color="success" onChange={(e) => validatelastname(e.target.value)} /></div><div className="error">{myErrors.lastnameError}</div><br />
                <div className="a"><TextField label="Email" value={user.email} variant="outlined" color="success" type="Email" onChange={(e) => validateEmail(e.target.value)} /></div><div className="error">{myErrors.emailError}</div><br />
                <div className="a"><TextField label="Creditcard" value={user.creditcard} variant="outlined" sx={{ color: "gray" }} onChange={(e) => validateCreditcard(e.target.value)} /></div><div className="error">{myErrors.creditcardError}</div><br />
                {userData.idCustomer == undefined && <div className="a"><Button disabled={(myErrors.idCustomerError != 'Correct!!!' || myErrors.firstnameError != 'Correct!!!' || myErrors.lastnameError != 'Correct!!!' || myErrors.emailError != 'Correct!!!' || myErrors.creditcardError != 'Correct!!!') && userFromAbout == undefined} variant="contained" sx={{ backgroundColor: "#67c6b8" }} onClick={() => { newCustomer() }}>Confirm</Button></div>}<br />
                {userData.idCustomer != undefined && <div className="a"><Button disabled={(myErrors.idCustomerError != 'Correct!!!' || myErrors.firstnameError != 'Correct!!!' || myErrors.lastnameError != 'Correct!!!' || myErrors.emailError != 'Correct!!!' || myErrors.creditcardError != 'Correct!!!') && userFromAbout == undefined} variant="contained" sx={{ backgroundColor: "#67c6b8" }} onClick={() => { updateTheCustomer() }}>Update</Button></div>}
            </div>
            
        </div>
    </>)
}