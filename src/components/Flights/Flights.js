import { Button, ButtonGroup } from "@mui/material"
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { deleteFlight, getFlights, getFlightsByIdCompany } from "../../utils/page1";
import { useSelector } from "react-redux";

export const Flights = () => {

    const company = useSelector((state) => state.user.CurrentUser);

    const [MyFlight, setMyFlight] = useState([]);
    const [updateFlight, setUpdateFlight] = useState({});

    const getflt = async () => {
        debugger
        var flights = await getFlightsByIdCompany(company.idCompany);
        setMyFlight( await flights);
    }

    const deleteFlt = async () => {
        let y = await deleteFlight(updateFlight.idFlight);
        setMyFlight(await getFlights());
    }

    useEffect(() => {
        debugger
        getflt()
    }, [MyFlight])
    // useEffect(() => {
        
    // }, [MyFlight])


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
                    <tr onClick={() => setUpdateFlight(p)}>
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
        {/* <ButtonGroup orientation="horizontal" variant="outlined" aria-label="outlined button group">
            <Button><NavLink className="link" to="AddFlight">AddFlight </NavLink></Button>
            <Button><NavLink className="link" to={`UpdateFlight/${updateFlight.idFlight}`}>UpdateFlight </NavLink></Button>
            {JSON.stringify(updateFlight) != "{}" && <Button sx={{ fontSize: "25px" }} onClick={() => deleteFlt()}>Delete</Button>}
        </ButtonGroup> */}
    </>
}