import { AccountCircle } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { createNewCustomer, createOrder, updateCustomer } from "../utils/get";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const LogIn = (props) => {

    const [id, setCustometEmpty] = props;

    const orderData = useSelector((state) => state.order.CurrentOrder);
    const userData = useSelector((state) => state.user.CurrentUser);

    const [user, setUser] = useState({ idCustomer: "", firstname: "", lastname: "", city: "", email: "", creditcard: 0, });
    const [myOrder, setMyOrder] = useState({idOrder: orderData.idOrder, idCustomer: "", idFlight: orderData.idFlight, numOfChildPlace: orderData.numOfChildPlace, numOfAdultPlace: orderData.numOfAdultPlace });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newCustomer = async () => {
        debugger
        await createNewCustomer(user);
        //const customer = await getCustomerById(user.idCustomer);
        dispatch(setCurrentUser(user));
        if (JSON.stringify(orderData) != "{}") {
            await createOrder(myOrder)
        }
        navigate('/');
    }
    // const newOrder = async () => {
    //     setMyOrder({ ...myOrder, idCustomer: orderData.idCustomer})
    //     dispatch(setCurrentOrder(myOrder))
    //     await createOrder(myOrder)
    // }
    const addCustomer = async (id) => {
        setMyOrder({ ...myOrder, idCustomer: id })
        setUser({ ...user, idCustomer: id })
    }
    const updateTheCustomer = async () => {
        dispatch(setCurrentUser([user]));
        await updateCustomer(user);
    }
    return (<>

        <div className='App'>
            <div className="a"><AccountCircle color="success" sx={{ fontSize: '120px' }}></AccountCircle></div>
            {!userData.idCustomer && <div className="a"><TextField label="IdCustomer" variant="outlined" type="password" color="success" onChange={(e) => addCustomer(e.target.value)} /></div>}<br />
            <div className="a"><TextField label="Firstname" variant="outlined" color="success" onChange={(e) => setUser({ ...user, firstname: e.target.value })} /></div><br />
            <div className="a"><TextField label="Lastname" variant="outlined" color="success" onChange={(e) => setUser({ ...user, lastname: e.target.value })} /></div><br />
            <div className="a"><TextField type="Email" label="Email" variant="outlined" color="success" onChange={(e) => setUser({ ...user, email: e.target.value })} /></div><br />
            <div className="a"><TextField label="Creditcard" variant="outlined" color="success" onChange={(e) => setUser({ ...user, creditcard: e.target.value })} /></div><br />
            {!userData.idCustomer && <div className="a"><Button variant="contained" color="success" onClick={() => { newCustomer() }}>Confirm</Button></div>}<br />
            {userData.idCustomer && <div className="a"><Button variant="contained" color="success" onClick={() => { updateTheCustomer() }}>Update</Button></div>}
        </div>


    </>)

    // endIcon={<LoginOutlined></LoginOutlined>}
}