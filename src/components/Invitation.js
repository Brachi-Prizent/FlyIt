import { Button, FormControl, InputLabel, MenuItem, Select, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { getPlace, getAllFlights } from "../utils/page1";
import { useParams } from "react-router-dom";

export const Invitation = () => {
    let dt = new Date();
    const [company, setCompany] = useState();
    const [isShowCompanies, setIsShowCompanies] = useState();
    const [destinations, setDestinations] = useState([]);
    const [date, setDate] = useState(dt);
    const [dates, setDates] = useState(["2000", "2012"]);
    const [numOfPlace,setNumOfPlace] = useState();
    const [save, setSave] = useState();
    const [flights, setFlights] = useState([]);
    const params = useParams()

    const numOfPlaceChange = (e) =>{
        setNumOfPlace(e.target.value)
    }
    const companyChange = (e) => {
        setCompany(e.target.value)
    }
    const dateChange = (e) => {
        setDate(e.target.value)
    }
    const getAllPlace = async () => {
        var d = await getPlace();
        var f = await getAllFlights();
        setFlights(f);
        setDestinations(d);
    }
const order = () => {

}
    useEffect(() => {
        getAllPlace();
    }, [])
    return <div className="invitation">


        {/* {
            setDestination(flights && flights.find(x => x.idFlight === params.flights))
        } */}
        {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">*Destination</InputLabel>
            <Select
                sx={{ width: "300px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={destination}
                label="Destination"
                onChange={destinationChange}
            >
                {destinations.map(x => x.flights.length > 0
                    && <MenuItem value={x.namePlace}>{x.namePlace}</MenuItem>)}

            </Select>
        </FormControl> */}
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Company</InputLabel>
            <Select
                sx={{ width: "300px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={company}
                label="Company"
                onChange={companyChange}

            >
                {/* {companies.map(x => <MenuItem value={x}>{x}</MenuItem>)} */}
                {
                destinations.map(x => 
                      (params.idPlace === String(x.idPlace) )
                  
                  && x.flights.map(y =>
                        <MenuItem value={y.nameCompany}>{y.nameCompany}</MenuItem>))}
            </Select>
        </FormControl>
        <TextField sx={{ width: "300px" }}
            onChange={dateChange} id="Date" label="*Date" variant="outlined" type="date" />
        <div></div>
        <TextField sx={{ width: "300px" }}
            onChange={numOfPlaceChange} id="number" label="*number" variant="outlined" type="number" />
        <div></div>
        <Button onClick={()=>setSave(true)} variant="outlined">👌save</Button>

        {save && <h1>your price is :</h1>}

        {save && flights.map(x => 
            ( x.nameCompany == company &&  params.idPlace === String(x.idPlace) ) 
            && <h2>{x.idPlace*numOfPlace}</h2>)}
        
        <Button onClick={order()} variant="outlined">click to order</Button>
    
           
       
        

        {/* <DataGrid
            rows={4}
            columns={5}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
        <TableHead>iii
            <TableRow />gt
            <TableRow />
        </TableHead> */}
    </div>
}