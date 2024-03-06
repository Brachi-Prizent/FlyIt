import { useEffect, useState } from "react";
import { getAllFlights } from "../utils/page1";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Home = () => {
    const [data, setData] = useState();
    const navigate = useNavigate();
    
    const get = async () => {
        const flights = await getAllFlights();
        const flt = [...new Set(flights.map((x) => x.namePlace))];
        setData(flt);
    }

    useEffect(() => {
        get();
    }, [])

    return (<>
        
        <div className="home">

            {       
                data && data.length > 0 && data.map(p => <div onClick={() => navigate(`Invitation/${p}`)}>{p}</div>)
            }
        </div>
    </>)
}