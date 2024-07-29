import { useEffect, useState } from "react";
import { getFlights, getFlightsByNamePlace } from "../utils/get";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './Home.css'
import { Dialog } from "@mui/material";

export const Home = () => {

    const allPlaces = useSelector((state) => state.allPlaces.places);

    const [placeHasFlight, setPlaceHasFlight] = useState(true);
    const [flights, setFlights] = useState({});

    const navigate = useNavigate();

    // const getAllFlights = async () => {
    //     const f = await getFlightsByNamePlace()
    //     setFlights(await f);
    // }
    
    const checkFlightsPlace = async (p) => {
        
        const flt = await getFlightsByNamePlace(p.namePlace)
        setFlights(await flt);
        if (flt.length == 0) {
            setPlaceHasFlight(false);
        }
        else {
            navigate(`/Invitation/${p.namePlace}`)
        }
    }
   
    return <>

        <div className="home">
            <div className="contries">
                {
                    allPlaces && allPlaces.length > 0 && allPlaces.map(p =>
                        <div className="contry" onClick={() => checkFlightsPlace(p)}>
                            <h2>{p.namePlace}</h2>
                            <img src={p.image}></img>
                        </div>)
                }

                <Dialog open={!placeHasFlight} onClose={() => setPlaceHasFlight(true)} aria-describedby='alert-dialog-slide-description'><h1  style={{fontSize: "35px", textAlign : "center",padding: "80px"}}>sorry, no flights available to this destination 😒</h1></Dialog>

            </div>
        </div>
    </>
}