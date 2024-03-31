import { AccountCircle } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { updateFlight, getAllCompanies, getFlightsByIdCompany } from "../../utils/get";

export const UpdateFlight = (props) => {

    //const params = useParams()
    //const [idFlight, setIdFlight] = useState(params);
    const [Flight, setFlight] = useState();
    const [comapnies, setComapnies] = useState();

    const correctFlight = async() => {
        debugger
        let f = await getFlightsByIdCompany(props.props);
        for (let index = 0; index < f.length; index++) {
            if (String(f[index].idFlight) === props.props)
                setFlight(f[index]);
        }
    }
    // const getFlights = async () => {
    //     let f = await getFlights();
    //     setAllFlight(f);
    // }
    const updateflt = async () => {
        debugger
        await updateFlight(Flight);
    }
    const getCmpny = async () => {
        let c = await getAllCompanies();
        setComapnies(c);
    }
    useEffect(() => {
        correctFlight();
    }, [])


    return <>

        <div className='App'>
            <div className="a"><AccountCircle color="success" sx={{ fontSize: '120px' }}></AccountCircle></div>
            <div className="a"><TextField label="dateFlight" variant="outlined" color="success" value={Flight?.dateFlight} onChange={(e) => setFlight({ ...Flight, dateFlight: e.target.value })} /></div>
            <div className="a"><TextField label="timeFlight" variant="outlined" color="success" value={Flight?.timeFlight} onChange={(e) => setFlight({ ...Flight, timeFlight: e.target.value })} /></div>
            <div className="a"><TextField label="price" variant="outlined" color="success" value={Flight?.price} onChange={(e) => setFlight({ ...Flight, price: e.target.value })} /></div>
            <div className="a"><TextField label="nameCompany" variant="outlined" color="success" value={Flight?.nameCompany} onChange={(e) => setFlight({ ...Flight, nameCompany: e.target.value })} /></div>
            <div className="a"><TextField label="namePlace" variant="outlined" color="success" value={Flight?.namePlace} onChange={(e) => setFlight({ ...Flight, namePlace: e.target.value })} /></div>
            <div className="a"><TextField label="maxSeats" variant="outlined" color="success" value={Flight?.maxSeats} onChange={(e) => setFlight({ ...Flight, maxSeats: e.target.value })} /></div>
            <div className="a"><Button variant="contained" color="success" onClick={() => { updateflt() }}>Confirm</Button></div>
        </div>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">*Companies</InputLabel>
            <Select
                sx={{ width: "300px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Flight?.nameCompany}
                label="Destination"
                onChange={getCmpny}
            >
                {comapnies && comapnies.map(x => <MenuItem value={x.nameCompany}>{x.nameCompany}</MenuItem>)}

            </Select>
        </FormControl>
    </>
}