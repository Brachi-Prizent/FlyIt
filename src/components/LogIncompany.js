import { AccountCircle } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { createNewCompany, createNewCustomer } from "../utils/page1";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setCurrentUser } from "../redux/userSlice";

export const LogInCompany = () => {
    const [user, setUser] = useState({IdCompany: "", NameCompany: ""});
    const [id, setId] = useState();
    const [name, setName] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newCompany = async () => {
        //await createNewCompany(user)
        dispatch(setCurrentUser({id, name}))
        navigate('/Flights');
    }

    return (<>
        <div className='App'>
            <div className="a"><AccountCircle color="success" sx={{ fontSize: '120px' }}></AccountCircle></div>
            <div className="a"><TextField label="IdCompany" variant="outlined" type="password" color="success" onChange={(e) => setUser({ ...user, IdCompany: e.target.value }) && setId(e.target.value)} /></div>
            <div className="a"><TextField label="NameCompany" variant="outlined" color="success" onChange={(e) => setUser({ ...user, NameCompany: e.target.value }) && setName(e.target.value)} /></div>
            <div className="a"><Button variant="contained" color="success" onClick={() => { newCompany() }}>Confirm</Button></div>
        </div>   
    </>)
}