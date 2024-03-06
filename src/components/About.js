import { useEffect, useState } from "react";
import { getCustomerById, getOrdersById } from "../utils/page1";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/userSlice";

export const About = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [id, setId] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.user.CurrentUser);

    const Orders = async () => {
        const Orders = await getOrdersById(id);
        setMyOrders(Orders);
    }
    const newCustomer = async () => {
        //await createNewCustomer(user)
        dispatch(setCurrentUser(await getCustomerById(id)))
        navigate('/');
    }
    useEffect(() => {
        Orders();
    }, [])

    return <>

        {userData.firstname && <p>{userData.firstname}</p>}

        <TextField onBlur={(e) => setId(e.target.value)} id="passWord" label="passWord" variant="outlined" />
        <Button onClick={() => newCustomer()}>confirm</Button>

        {/* <h3 className="error">{myErrors?.PasswordError}</h3> */}
        {myOrders && myOrders.map(x => {
            <div>
                <h2>{x.IdCustomer}</h2>
                <h2>{x.Firstname}</h2>
                <h2>{x.Lastname}</h2>
                <h2>{x.Email}</h2>
            </div>
        })
        }
        {
            userData && <p>{userData.firstname}</p>
        }
    </>
}