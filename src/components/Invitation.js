import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { getPlace, getAllFlights, getFlightsByNamePlace, GetStationByIdFlight } from "../utils/page1";
import { useNavigate, useParams } from "react-router-dom";
import { Flight } from "@mui/icons-material";
import { useSelector } from "react-redux";

export const Invitation = () => {
    let dt = new Date();
    const userData = useSelector((state) => state.user.CurrentUser)
    const [company, setCompany] = useState();
    const [isDirect, setIsDirect] = useState(false);
    //const [destinations, setDestinations] = useState([]);
    const [numOfPlace, setNumOfPlace] = useState();
    //const [flights, setFlights] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [filterFlights, setFilterFlights] = useState([]);
    const [myOrder, setMyOrder] = useState({ idOrder: 0, idCustomer: userData.idCustomer, idFlight: 0, numOfPlace: 0 });
    const [sorts, setSorts] = useState(["Price", "stations"]);
    const [srt, setSrt] = useState();
    const [companies, setCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);

    const navigate = useNavigate();
    const params = useParams()

    const fl = (n) => {
        setCompany(n);
        ///////////////////////////////
    }

    const getAllPlaces = async (e) => {
        setFilterFlights(filterList.filter(x => new Date(x.dateFlight).toLocaleDateString() === new Date(e.target.value).toLocaleDateString()))
    }
    const createOrder = () => {
        navigate('/LogIn');
        /////////////////////////////////////////
    }
    const changeSort = () => {
        //filterList.sort((x)=> x.price, )
    }
    const changeFilter = () => {

    }
    const ifDirect = async (c) => {
        const f = filterList.find((x) => x.nameCompany == c)
        const st = await GetStationByIdFlight(f.idFlight);
        if (st.length == 0)
            setIsDirect(true)
        else
            setIsDirect(false)
    }
    const companyChanged = (event) => {
        const { value } = event.target;
        setSelectedCompanies(value);
    }
    const bringCompanies = (event) => {
       const comp = [...new Set(filterList.map((x) => x.nameCompany))];
       setCompanies(comp);
    }
    const startedFlight = async () => {
        const a = await getFlightsByNamePlace(params.namePlace)
        setFilterFlights(a);
        setFilterList(a);
    }
    const filterTheList = async () => {
        setFilterFlights(filterList.filter((x) => selectedCompanies.includes(x.nameCompany)))
    }
    useEffect(() => {
        startedFlight();
    }, [])
    useEffect(() => {
        filterTheList();
    }, [selectedCompanies])
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

        <TextField sx={{ width: "300px" }}
            onBlur={(e) => getAllPlaces(e)}
            id="Date" label="*Date" variant="outlined" type="date" />

        <div></div>

        <TextField sx={{ width: "300px" }}
            onChange={(e) => setMyOrder({ ...myOrder, numOfPlace: e.target.value })} id="number" label="*num of place" variant="outlined" type="number" />

        <div></div>

        {myOrder.numOfPlace > 0 && <h1>your price is :</h1>}

        {myOrder.numOfPlace > 0
         && filterFlights.map(x =>
            (x.nameCompany == company) && <h2>{x.price * myOrder.numOfPlace}</h2>)}


        <Button onClick={createOrder} variant="outlined">click to order</Button>

        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">sortBy</InputLabel>
            <Select
                sx={{ width: "300px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={srt}
                label="sortBy"
                onChange={changeSort}
            >
                {sorts.map(s => <MenuItem value={s}>{s}</MenuItem>)}

            </Select>
        </FormControl>

        <FormControl sx={{ width: "300px" }} onBlur={bringCompanies}>
            <InputLabel id="demo-simple-select-label">Companies</InputLabel>
            <Select
                multiple
                value={selectedCompanies}
                label="Companies"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size="small"
                fullWidth
                onChange={companyChanged}
                renderValue={(selected) => selected.join(', ')}
            >
                {companies && companies.length > 0 && companies.map((x) =>
                    <MenuItem value={x}><Checkbox checked={selectedCompanies.includes(x)} />
                        <ListItemText primary={x} />
                    </MenuItem>)}
            </Select>
        </FormControl>

        <div className="tbl">
            <table className="flights">
                <tr>
                    <th>company</th>
                    <th>price</th>
                    <th>direct</th>
                </tr>
                {
                    filterFlights && filterFlights.length > 0 && filterFlights.map(p =>
                        <tr onClick={() => fl(p.nameCompany)}>
                            <td>{p.nameCompany}</td>
                            <td>{p.price}</td>
                            {/* <td onLoad={() => ifDirect(p.nameCompany)}>{isDirect}</td> */}
                        </tr>
                    )
                }
            </table>
        </div>
    </div>
}

export const Direct = (props) => {
    return <>

    </>
}
