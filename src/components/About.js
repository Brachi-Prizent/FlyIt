import { useEffect, useState } from "react";
import { getOrdersById } from "../utils/page1";
import { useSelector } from "react-redux";

export const About = () => {
    const [myOrders, setMyOrders] = useState([]);
    const userData = useSelector((state) => state.user);

    const Orders = async () => {
        const Orders = await getOrdersById(326633104);
        setMyOrders(Orders);
    }

    useEffect(() => {
        Orders();
    }, [])
    
    return <>About
        {
            myOrders && myOrders.map(x => {
                <div>
                    <h2>{x.IdCustomer}</h2>
                    <h2>{x.Firstname}</h2>
                    <h2>{x.Lastname}</h2>
                    <h2>{x.Email}</h2>
                </div>
            })
        }
        {
            userData && <p>{userData.name}</p>
        }
    </>
}