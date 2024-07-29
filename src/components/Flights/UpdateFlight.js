import { FlightSharp } from "@mui/icons-material";
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getPlaces } from "../../utils/get";
import { updateFlight } from "../../utils/putService";
import { createFlight, createStation } from "../../utils/postService";
import { useSelector } from "react-redux";
import '../Home.css';

export const UpdateFlight = (props) => {

    const company = useSelector((state) => state.user.CurrentUser);

    // const {currentFlight, onClose} = props;
    // const onClose = props.setIsUpdate;
    const currentFlight = props.flt;

    const [Flight, setFlight] = useState();
    const [places, setPlaces] = useState();
    const [placesStation, setPlacesStation] = useState([]);
    const [station, setStation] = useState({ idFlight: currentFlight?.idFlight, namePlace: "", chronologicalOrder: 0, stayTime: 0 });
    debugger
    const [myErrors, setMyErrors] = useState(currentFlight?.idFlight ?
        {
            timeFlight: "Correct!!!",
            adultPrice: "Correct!!!",
            childPrice: "Correct!!!",
            maxSeats: "Correct!!!"
        }
        : {
            timeFlight: 'Required!!!',
            adultPrice: 'Required!!!',
            childPrice: 'Required!!!',
            maxSeats: 'Required!!!'
        })


    const [isAddFlight, setIsAddFlight] = useState(false);
    const [index, setIndex] = useState(0);


    const newFlight = async () => {
        debugger
        if (currentFlight != undefined) {
            await updateFlight(Flight);
        }
        else {
            var idF = await createFlight(Flight);
            setStation({ ...station, idFlight: idF });
            setIsAddFlight(true);
        }
    }

    const addStationToServsr = async () => {
        if (index > 0) {
            await createStation(station)
        }
        setIndex(index + 1);
    }

    const addStationToUseState = async () => {
        setStation({ ...station, namePlace: placesStation[placesStation.length - 1], chronologicalOrder: index });
    }

    const bringPlaces = async () => {
debugger
        setFlight(currentFlight);
        let p = await getPlaces();
        setPlaces(p);
        if (currentFlight == undefined) {
            setFlight({ ...Flight, nameCompany: company.nameCompany });
        }
    }

    const changeStation = (event) => {
        const { value } = event.target;
        setPlacesStation(value)
    }

    const validateTimeFlight = (e) => {
        debugger
        var val = /^[0-9]{1,}$/;
        setFlight({ ...Flight, timeFlight: e })
        if (!(e)) { setMyErrors({ ...myErrors, timeFlight: "Required!!!" }) }
        if (e.match(val)) { setMyErrors({ ...myErrors, timeFlight: 'Correct!!!' }) }
        else {
            setMyErrors({ ...myErrors, timeFlight: 'Wrong...!! timeFlight must be 1 digits at least' });
        }
    }
    const validateAdultPrice = (e) => {
        var val = /^[0-9]{2,}$/;
        setFlight({ ...Flight, adultPrice: e })
        if (!e)
            setMyErrors({ ...myErrors, adultPrice: "Required!!!" })
        else if (e.match(val))
            setMyErrors({ ...myErrors, adultPrice: 'Correct!!!' })
        else
            setMyErrors({ ...myErrors, adultPrice: 'Wrong...!! adultPrice must be 2 digits at least' });
    }
    const validateChildPrice = (e) => {
        var val = /^[0-9]{2,}$/;
        setFlight({ ...Flight, childPrice: e })
        if (!e)
            setMyErrors({ ...myErrors, childPrice: "Required!!!" })
        else if (e.match(val))
            setMyErrors({ ...myErrors, childPrice: 'Correct!!!' })
        else
            setMyErrors({ ...myErrors, childPrice: 'Wrong...!! childPrice must be 2 digits at least' });
    }
    const validateMaxSeats = (e) => {
        var val = /^[0-9]{3,}$/;
        setFlight({ ...Flight, maxSeats: e })
        if (!e)
            setMyErrors({ ...myErrors, maxSeats: "Required!!!" })
        else if (e.match(val))
            setMyErrors({ ...myErrors, maxSeats: 'Correct!!!' })
        else
            setMyErrors({ ...myErrors, maxSeats: 'Wrong...!! maxSeats must be 3 digits at least' });
    }

    useEffect(() => {
        debugger
        bringPlaces();
    }, [])

    // useEffect(() => {
    //     if (currentFlight) {
    //         validateTimeFlight(JSON.stringify(currentFlight.timeFlight));
    //         console.log(myErrors.timeFlight);
    //         validateAdultPrice(JSON.stringify(currentFlight.adultPrice));
    //         validateChildPrice(JSON.stringify(currentFlight.childPrice));
    //         validateMaxSeats(JSON.stringify(currentFlight.maxSeats));
    //     }
    // }, [Flight])

    useEffect(() => {
        debugger
        if (index > 0) {
            addStationToUseState();
        }
    }, [placesStation])

    useEffect(() => {
        debugger
        addStationToServsr();
    }, [station?.stayTime])

    return <>
        {console.log(myErrors.timeFlight)}
        <div className='App'>
            {!isAddFlight && <div>
                <div className="a"><FlightSharp sx={{ fontSize: '120px', color: "#67c6b8" }}></FlightSharp></div>
                <div className="a"><TextField sx={{ width: "100%" }} label="dateFlight" variant="outlined" color="success" type="date" value={Flight?.dateFlight} onChange={(e) => setFlight({ ...Flight, dateFlight: e.target.value })} /></div>
                <div className="a"><TextField sx={{ width: "100%" }} label="departure" variant="outlined" color="success" type="time" value={Flight?.departure} onChange={(e) => setFlight({ ...Flight, departure: e.target.value })} /></div>
                <div className="a"><TextField label="timeFlight" variant="outlined" color="success" value={Flight?.timeFlight} onChange={(e) => validateTimeFlight(e.target.value)} /><div className="error">{myErrors.timeFlight}</div></div>
                <div className="a"><TextField label="adultPrice" variant="outlined" color="success" value={Flight?.adultPrice} onChange={(e) => validateAdultPrice(e.target.value)} /><div className="error">{myErrors.adultPrice}</div></div>
                <div className="a"><TextField label="childPrice" variant="outlined" color="success" value={Flight?.childPrice} onChange={(e) => validateChildPrice(e.target.value)} /><div className="error">{myErrors.childPrice}</div></div>
                <div className="a"><TextField label="maxSeats" variant="outlined" color="success" value={Flight?.maxSeats} onChange={(e) => validateMaxSeats(e.target.value)} /><div className="error">{myErrors.maxSeats}</div></div>
            </div>}
            <br></br>
            {!isAddFlight && <FormControl fullWidth sx={{ width: "86%" }}>
                <InputLabel id="demo-simple-select-label">Destination</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={places?.namePlace}
                    label="Destination"
                    onChange={(e) => setFlight({ ...Flight, namePlace: e.target.value })}
                >
                    {places && places.map(x => <MenuItem value={x.namePlace}>{x.namePlace}</MenuItem>)}

                </Select>
            </FormControl>}

            {isAddFlight && <div style={{ height: "15vh", width: "30vw" }}>
                <h1>Would you like to add stations?</h1>
                <FormControl fullWidth sx={{ width: "20vw" }}>
                    <InputLabel id="demo-simple-select-label">Station</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={placesStation}
                        label="Station"
                        onChange={changeStation}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {places && places.map(x => <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <MenuItem value={x.namePlace}><Checkbox checked={placesStation?.includes(x.namePlace)}
                                onChange={() => setPlacesStation(placesStation?.concat(x.namePlace))} />
                                <ListItemText primary={x.namePlace} />
                            </MenuItem>
                            {placesStation?.includes(x.namePlace) && <TextField placeholder="stay time" type="number" style={{ width: '7vw' }}
                                onChange={(e) => setStation({ ...station, stayTime: e.target.value })}></TextField>}
                        </div>)}
                    </Select>
                </FormControl></div>}

            {!isAddFlight && <div className="a"><Button disabled={(myErrors.timeFlight != 'Correct!!!' || myErrors.adultPrice != 'Correct!!!' || myErrors.childPrice != 'Correct!!!' || myErrors.maxSeats != 'Correct!!!' || Flight?.namePlace == undefined || Flight?.dateFlight == undefined || Flight?.departure == undefined)} variant="contained" sx={{ backgroundColor: "#67c6b8" }} onClick={newFlight}>Confirm</Button></div>}
            {isAddFlight && <div className="a"><Button variant="contained" sx={{ backgroundColor: "#67c6b8" }} onClick={props.onClose}>Confirm</Button></div>}
        </div>

    </>
}