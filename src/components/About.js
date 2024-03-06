import { useEffect, useState } from "react";
import { getCustomerById, getOrdersById } from "../utils/page1";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../redux/userSlice";
import './About.css'

export const About = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [id, setId] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.user.CurrentUser);

    const Orders = async () => {
        debugger
        const customer = await getCustomerById(id);
        dispatch(setCurrentUser(await customer));
        const orders = await getOrdersById(id);
        setMyOrders(orders);
    }
    // const newCustomer = async () => {
    //     //await createNewCustomer(user)
    //     dispatch(setCurrentUser(await getCustomerById(id)))
    //     navigate('/');
    // }
    // useEffect(() => {
    //     if (userData?.idCustomer != undefined)
    //         Orders();
    // }, [])

    return <>
        <div className="about">
            {userData?.idCustomer != "" && <h1>Hellow {userData.firstname}😉</h1>}

            {JSON.stringify(userData) == "{}" && <TextField onBlur={(e) => setId(e.target.value)} id="passWord" label="passWord" variant="outlined" />}
            {JSON.stringify(userData) == "{}" && <Button onClick={Orders}>confirm</Button>}

            {myOrders && myOrders.length > 0 && myOrders[0].orders.length > 0 && myOrders.map(x => {
                return <table>
                    <tr>
                        <th>idOrder</th>
                        <th>idFlight</th>
                        <th>dateFlight</th>
                        <th>nameCompany</th>
                        <th>namePlace</th>
                        <th>numOfPlace</th>
                    </tr>
                    {x.orders.map((o) => {
                        return <tr>
                            <td>{o.idOrder}</td>
                            <td>{o.idFlight}</td>
                            <td>{o.dateFlight}</td>
                            <td>{o.nameCompany}</td>
                            <td>{o.namePlace}</td>
                            <td>{o.numOfPlace}</td>
                        </tr>
                    })}
                </table>
            })
            }
        </div>
    </>
}