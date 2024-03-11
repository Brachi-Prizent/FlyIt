import { useEffect, useState } from "react";
import { getAllFlights, getPlaces } from "../utils/page1";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './Home.css'

export const Home = () => {
    //const [data, setData] = useState();
    const [places, setPlaces] = useState();
    const navigate = useNavigate();

    const get = async () => {
        const p = await getPlaces();
        console.log(p, "places")
        setPlaces(p);
        // const flights = await getAllFlights();
        // const flt = [...new Set(flights.map((x) => x.namePlace))];
        // setData(flt);
    }

    useEffect(() => {
        get();
    }, [])

    return <>

        <div className="home">
            {
                places && places.length > 0 && places.map(p =>
                    <p>
                        <div onClick={() => navigate(`Invitation/${p.namePlace}`)}>{p.namePlace}</div>
                        <img style={{ height: "10%", width: "20%" }} src={p.image}></img>
                    </p>)
            }
        </div>
    </>
}