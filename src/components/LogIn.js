import { AccountCircle } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { createNewCustomer, createOrder, getCustomerById } from "../utils/page1";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentOrder, setCurrentUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
    const [user, setUser] = useState({ IdCustomer: "", Firstname: "", Lastname: "", city: "", Email: "", Creditcard: 0, });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderData = useSelector((state) => state.order.CurrentOrder)
    const [myOrder, setMyOrder] = useState({ IdOrder: orderData.IdCustomer, IdCustomer: "", IdFlight: orderData.IdFlight, NumOfPlace: orderData.NumOfPlace });

    const newCustomer = async () => {
        await createNewCustomer(user)
        dispatch(setCurrentUser(await getCustomerById(user.IdCustomer)))
        if (JSON.stringify(orderData) == "{}")
            navigate('/');
        else {
            setMyOrder({ ...myOrder, IdCustomer: orderData.IdCustomer })
            dispatch(setCurrentOrder(myOrder))
            await createOrder(myOrder)
        }
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