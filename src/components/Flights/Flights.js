import { Button, ButtonGroup } from "@mui/material"
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { deleteFlight, getFlights } from "../../utils/page1";

export const Flights = () => {
    const [MyFlight, setMyFlight] = useState([]);
    const [flt, setUpdateflt] = useState({});

    const getflt = async () => {
        var flights = await getFlights();
        setMyFlight(flights);
    }

    const deleteFlt = async () => {
        let y = await deleteFlight(flt.idFlight);
        setMyFlight(await getFlights());
    }
    useEffect(() => {
        getflt();
    }, [])
    useEffect(() => {
        
    }, [MyFlight])


    return <>

        <table className="flights">
            <tr>
                <th>idFlight</th>
                <th>dateFlight</th>
                <th>timeFlight</th>
                <th>price</th>
                <th>nameCompany</th>
                <th>namePlace</th>
                <th>bookedSeats</th>
                <th>maxSeats</th>
            </tr>
            {
                MyFlight && MyFlight.length > 0 && MyFlight.map(p =>
                    <tr onClick={() => setUpdateflt(p)}>
                        <td>{p.idFlight}</td>
                        <td>{p.dateFlight}</td>
                        <td>{p.timeFlight}</td>
                        <td>{p.price}</td>
                        <td>{p.nameCompany}</td>
                        <td>{p.namePlace}</td>
                        <td>{p.bookedSeats}</td>
                        <td>{p.maxSeats}</td>
                    </tr>
                )
            }
        </table>
        <br />
        <ButtonGroup orientation="horizontal" variant="outlined" aria-label="outlined button group">
            <Button><NavLink className="link" to="AddFlight">AddFlight </NavLink></Button>
            <Button><NavLink className="link" to={`UpdateFlight/${flt.idFlight}`}>UpdateFlight </NavLink></Button>
            {JSON.stringify(flt) != "{}" && <Button sx={{ fontSize: "25px" }} onClick={() => deleteFlt()}>Delete</Button>}
        </ButtonGroup>
    </>
}