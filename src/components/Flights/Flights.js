import { useEffect, useState } from "react";
import { getFlightsByIdCompany } from "../../utils/get";
import { useSelector } from "react-redux";
import { Button, Dialog } from "@mui/material";
import { UpdateFlight } from "./UpdateFlight";
import { Outlet } from "react-router-dom";
import { deleteFlight } from "../../utils/deleteService";
import './Flight.css'
export const Flights = () => {

    const company = useSelector((state) => state.user.CurrentUser);

    const [myFlight, setMyFlight] = useState([]);
    const [flt, setFlt] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const bringCompanyFlights = async () => {
        debugger
        var flights = await getFlightsByIdCompany(company.idCompany);
        setMyFlight(await flights);
    }

    const deleteFlt = async () => {
        debugger
        const res = await deleteFlight(flt.idFlight);
        if(res){
            bringCompanyFlights()
            setIsDelete(true)
        }
        else{
            setIsDelete(false)
        }
        myFunction()
    }
    function myFunction() {
        debugger
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
    useEffect(() => {
        debugger
        if (JSON.stringify(company) != "{}")
            bringCompanyFlights()
    }, [company])

    useEffect(() => {
        debugger
        if (JSON.stringify(company) != "{}")
            bringCompanyFlights()
    }, [])

    return <>
        <div className="tbl">
            {myFlight && myFlight.length > 0 &&
                <table className="flights">
                    <tr>
                        <th>dateFlight</th>
                        <th>departure</th>
                        <th>timeFlight</th>
                        <th>adultPrice</th>
                        <th>childPrice</th>
                        <th>destination</th>
                        <th>bookedSeats</th>
                        <th>maxSeats</th>
                        <th>stations</th>
                    </tr>
                    {
                        myFlight[0].flights.map(p =>
                            <tr key={p.idCompany} className={flt === p && "rowSelected"} onClick={() => setFlt(p)} >
                                <td>{new Date(p.dateFlight).toLocaleDateString()}</td>
                                <td>{p.departure}</td>
                                <td>{p.timeFlight}</td>
                                <td>{p.adultPrice}</td>
                                <td>{p.childPrice}</td>
                                <td>{p.namePlace}</td>
                                <td>{p.bookedSeats}</td>
                                <td>{p.maxSeats}</td>
                                <td>{p.stations.length > 0 ? <details>
                                    <summary>stations</summary>
                                    {
                                        <table>
                                            <tr>
                                                <th>namePlace</th>
                                                <th>stayTime</th>
                                            </tr>
                                            {p.stations.map(s =>
                                                <tr>
                                                    <td>{s.namePlace}</td>
                                                    <td>{s.stayTime}</td>
                                                </tr>
                                            )}
                                        </table>
                                    }
                                </details> : <div>direct flight</div>}</td>

                            </tr>
                        )
                    }
                </table>}
        </div>

        <br />
        <div className="buttons">
            {JSON.stringify(flt) != "{}" && <div className="a"><Button sx={{ width: "10vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw" }} variant="contained" onClick={() => setIsUpdate(true)}>update</Button></div>}
            {JSON.stringify(flt) != "{}" && <div className="a"><Button sx={{ width: "10vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw" }} variant="contained" onClick={() => deleteFlt()}>delete</Button></div>}
        </div>

        {isDelete ? <div id="snackbar">deleted succefully..</div> : <div id="snackbar">this flight can't be cancelled</div>}

        <Dialog open={isUpdate} onClose={() => {
            setIsUpdate(false);
            bringCompanyFlights();
        }
        } aria-describedby='alert-dialog-slide-description'><div className='popup'><UpdateFlight flt={flt} onClose={() => setIsUpdate(false)}></UpdateFlight></div></Dialog>
        <Outlet></Outlet>
    </>
}