import { useEffect, useState } from "react";
import { getAllFlights } from "../utils/page1";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [data, setData] = useState();
    const navigate = useNavigate();

    const get = async () => {
        var flights = await getAllFlights();
        setData(flights);
    }

    useEffect(() => {
        get();
    }, [])

    return (
        <div className="home"><p>Home</p>
            {
                data && data.length > 0 && data.map(p => <div onClick={()=>navigate(`Invitation/${p.idPlace}`)}>{p.namePlace}</div> )
            }
        </div>)
}