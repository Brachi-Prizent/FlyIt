import { useEffect, useState } from "react";
import { getOrdersById } from "../utils/get";
import { useSelector } from "react-redux";
import './CustomerOrders.css'
import { deleteOrder } from "../utils/deleteService";
import { DeleteOutline } from "@mui/icons-material";
export const CustomerOrders = () => {

    const [myOrders, setMyOrders] = useState([]);
    const [isDelete, setIsDelete] = useState(false);

    const allPlaces = useSelector((state) => state.allPlaces.places);
    const userData = useSelector((state) => state.user.CurrentUser);

    const bringOrders = async () => {
        console.log(allPlaces);
        debugger
        const orders = await getOrdersById(userData.idCustomer);
        for (var i = 0; i < orders[0]?.orders.length; i++) {
            for (var j = 0; j < allPlaces.length; j++) {
                if (orders[0]?.orders[i].namePlace === allPlaces[j].namePlace)
                    orders[0].orders[i].image = allPlaces[j].image;
            }
        }
        setMyOrders(orders[0]?.orders);
    }

    const deleteMyOrder = async (id) => {
        debugger
        let res = await deleteOrder(id);
        if (res) {
            bringOrders();
            setIsDelete(true);
        }
        else{
            setIsDelete(false)
        }
        myFunction();

    }
    function myFunction() {
        debugger
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
    useEffect(() => {
        debugger
        bringOrders();
    }, [])

    return (<>
        <div className="cards">
            {myOrders && myOrders.length > 0 && myOrders.map(o => <div class="card" >
                <img src={o.image} style={{ width: "290px" }} />
                <h1>{o.namePlace}</h1>
                <p>{new Date(o.dateFlight).toLocaleDateString()}</p>
                <p>{o.nameCompany}</p>
                <p>numOfAdultPlace: {o.numOfAdultPlace}</p>
                <p>numOfAdultPlace: {o.numOfAdultPlace}</p>
                <p><button className="b" onClick={() => deleteMyOrder(o.idOrder)}>delete <DeleteOutline></DeleteOutline></button></p>
            </div>)}
        </div>
        {isDelete ? <div id="snackbar">deleted succefully..</div> : <div id="snackbar">this order can't be cancelled</div>}
        {myOrders.length == 0 && <h1 className="not">you don't have orders</h1>}
    </>)
}