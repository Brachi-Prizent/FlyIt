import { AccountCircle } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { createNewCustomer, createOrder, getCustomerById } from "../utils/page1";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentOrder, setCurrentUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
    const orderData = useSelector((state) => state.order.CurrentOrder);
    const userData = useSelector((state) => state.user.CurrentUser);

    const [user, setUser] = useState({ idCustomer: "", firstname: "", lastname: "", city: "", email: "", creditcard: 0, });
    const [myOrder, setMyOrder] = useState({ idOrder: orderData.idCustomer, idCustomer: "", idFlight: orderData.idFlight, numOfPlace: orderData.numOfPlace });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newCustomer = async () => {
        debugger
        await createNewCustomer(user);
        const customer = await getCustomerById(user.idCustomer);
        dispatch(setCurrentUser(customer));
        if (JSON.stringify(orderData) != "{}") {
            await createOrder(myOrder)
        }
        navigate('/');
    }
    const newOrder = async () => {
        setMyOrder({ ...myOrder, idCustomer: orderData.idCustomer })
        dispatch(setCurrentOrder(myOrder))
        await createOrder(myOrder)
    }

return (<>

    <div className='App'>
        <div className="a"><AccountCircle color="success" sx={{ fontSize: '120px' }}></AccountCircle></div>
        <div className="a"><TextField label="IdCustomer" variant="outlined" type="password" color="success" onChange={(e) => setUser({ ...user, idCustomer: e.target.value })} /></div>
        <div className="a"><TextField label="Firstname" variant="outlined" color="success" onChange={(e) => setUser({ ...user, firstname: e.target.value })} /></div>
        <div className="a"><TextField label="Lastname" variant="outlined" color="success" onChange={(e) => setUser({ ...user, lastname: e.target.value })} /></div>
        <div className="a"><TextField type="Email" label="Email" variant="outlined" color="success" onChange={(e) => setUser({ ...user, email: e.target.value })} /></div>
        <div className="a"><TextField label="Creditcard" variant="outlined" color="success" onChange={(e) => setUser({ ...user, creditcard: e.target.value })} /></div>
        <div className="a"><Button variant="contained" color="success" onClick={() => { newCustomer() }}>Confirm</Button></div>
    </div>


</>)

    // endIcon={<LoginOutlined></LoginOutlined>}
}