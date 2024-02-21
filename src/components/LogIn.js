import { AccountCircle } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { createNewCustomer } from "../utils/page1";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
    const [user, setUser] = useState({ IdCustomer: "", Firstname: "", Lastname: "", city: "", Email: "", Creditcard: 0, });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newCustomer = async () => {
        dispatch(setCurrentUser(user.id, user.name))
        await createNewCustomer(user)
        navigate('/');
    }
    

    return (<>
        <div className='App'>
            <div className="a"><AccountCircle color="success" sx={{ fontSize: '120px' }}></AccountCircle></div>
            <div className="a"><TextField label="IdCustomer" variant="outlined" type="password" color="success" onChange={(e) => setUser({ ...user, IdCustomer: e.target.value })} /></div>
            <div className="a"><TextField label="Firstname" variant="outlined" color="success" onChange={(e) => setUser({ ...user, Firstname: e.target.value })} /></div>
            <div className="a"><TextField label="Lastname" variant="outlined" color="success" onChange={(e) => setUser({ ...user, Lastname: e.target.value })} /></div>
            <div className="a"><TextField type="Email" label="Email" variant="outlined" color="success" onChange={(e) => setUser({ ...user, Email: e.target.value })} /></div>
            <div className="a"><TextField label="Creditcard" variant="outlined" color="success" onChange={(e) => setUser({ ...user, Creditcard: e.target.value })} /></div>
            <div className="a"><Button variant="contained" color="success" onClick={() => { newCustomer() }}>Confirm</Button></div>
        </div>
    </>)

    // endIcon={<LoginOutlined></LoginOutlined>}
}