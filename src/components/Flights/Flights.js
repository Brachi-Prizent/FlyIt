import { useEffect, useState } from "react";
import { deleteFlight, getFlights, getFlightsByIdCompany } from "../../utils/get";
import { useSelector } from "react-redux";
import { Button, Dialog } from "@mui/material";
import { UpdateFlight } from "./UpdateFlight";
import { LoginOutlined } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

export const Flights = () => {

    const company = useSelector((state) => state.user.CurrentUser);

    const [myFlight, setMyFlight] = useState([]);
    const [flt, setFlt] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);

    const bringCompanyFlights = async () => {
        debugger
        var flights = await getFlightsByIdCompany(company.idCompany);
        setMyFlight(await flights);
    }

    const deleteFlt = async () => {
        debugger
        await deleteFlight(flt.idFlight);
        bringCompanyFlights();
    }

    useEffect(() => {
        debugger
        if (JSON.stringify(company) != "{}")
            bringCompanyFlights()
    }, [company])

    return <>
        {myFlight && myFlight.length > 0 &&
            <table className="flights">
                <tr>
                    <th>idFlight</th>
                    <th>dateFlight</th>
                    <th>timeFlight</th>
                    <th>adultPrice</th>
                    <th>childPrice</th>
                    <th>nameCompany</th>
                    <th>namePlace</th>
                    <th>bookedSeats</th>
                    <th>maxSeats</th>
                    {/* <th>stations</th> */}
                </tr>
                {
                    myFlight[0].flights.map(p =>
                        <tr onClick={() => setFlt(p)}>
                            <td>{p.idFlight}</td>
                            <td>{p.dateFlight}</td>
                            <td>{p.timeFlight}</td>
                            <td>{p.adultPrice}</td>
                            <td>{p.childPrice}</td>
                            <td>{p.nameCompany}</td>
                            <td>{p.namePlace}</td>
                            <td>{p.bookedSeats}</td>
                            <td>{p.maxSeats}</td>
                        </tr>
                    )
                }
            </table>}
        <br />
        {/* <ButtonGroup orientation="horizontal" variant="outlined" aria-label="outlined button group">
            <Button><NavLink className="link" to="AddFlight">AddFlight </NavLink></Button>
            <Button><NavLink className="link" to={`UpdateFlight/${updateFlight.idFlight}`}>UpdateFlight </NavLink></Button>
            {JSON.stringify(updateFlight) != "{}" && <Button sx={{ fontSize: "25px" }} onClick={() => deleteFlt()}>Delete</Button>}
        </ButtonGroup> */}
        <div className="buttons">
            {JSON.stringify(flt) != "{}" && <div className="a"><Button variant="contained" color="error" endIcon={<LoginOutlined></LoginOutlined>} onClick={() => setIsUpdate(true)}>update</Button></div>}
            {JSON.stringify(flt) != "{}" && <div className="a"><Button variant="contained" color="error" endIcon={<LoginOutlined></LoginOutlined>} onClick={() => deleteFlt()}>delete</Button></div>}
        </div>
        <Dialog open={isUpdate} onClose={() => setIsUpdate(false)} aria-describedby='alert-dialog-slide-description'><div className='popup'><UpdateFlight props={flt.idFlight}></UpdateFlight></div></Dialog>
        <Outlet></Outlet>
    </>
}