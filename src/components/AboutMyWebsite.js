import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { setPlaces } from "../redux/placesSlice";
import { getPlaces } from "../utils/get";
import './AboutMyWebsite.css'
import './Home.css'

export const AboutMyWebsite = () => {

    const [allPlaces, setAllPlaces] = useState();
    const dispatch = useDispatch();
    const [p, setP] = useState("");
    var str = "";
    var i = 0;
    var txt = 'My webSite is perfect!!!!!';
    var speed = 80;

    function typeWriter() {
        if (i < txt.length) {
            str = str + txt.charAt(i);
            setP(str);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    const getAllPlaces = async () => {
        const p = await getPlaces();
        dispatch(setPlaces(p));
        setAllPlaces(p);
    }

    useEffect(() => {
        getAllPlaces();
        typeWriter();
    }, [])

    return (<>
        <div className="home">
            <img style={{ marginTop: "2vw", border: "none", height: "23vh", width: "35vw" }} src="img/flightBlue.png"></img>
            <div className="abt">
                <h3 style={{ paddingTop: "14vh", color: "#00559b"}}>
                    The largest travel agency site that provides services
                    <br />
                    for booking flights in a enjoyable and pleasnt way.
                    <br />
                    we will help you find and compare the best offers on flights.
                    <br />
                    Flyit was born in 1993 and since then serves
                    <br />
                    over thousand users a year.
                    <br />
                    Flyit continues to grow and improve its services
                    <br />
                    in order to satisfy customers in the best way.
                    <br />
                    Together we will make it easiar for you to experience the world!
                </h3>
            </div>
            <marquee>{
                allPlaces && allPlaces.length > 0 && allPlaces.map(p =>
                    <img style={{ height: "15vh", width: "13vw", marginRight: "5px", marginBottom: "-2vh" }} src={p.image}></img>
                )
            }</marquee>
        </div>
    </>)
}