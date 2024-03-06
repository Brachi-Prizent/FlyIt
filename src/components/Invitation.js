import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { getPlace, getAllFlights, getFlightsByNamePlace, GetStationByIdFlight } from "../utils/page1";
import { useNavigate, useParams } from "react-router-dom";
import { Flight } from "@mui/icons-material";
import { useSelector } from "react-redux";
import './Home.css'
import './Invitation.css'

export const Invitation = () => {
    let dt = new Date();

    const userData = useSelector((state) => state.user.CurrentUser)

    const [company, setCompany] = useState();
    const [isDirect, setIsDirect] = useState(false);
    const [flightList, setFlightList] = useState([]);
    const [filterFlights, setFilterFlights] = useState([]);
    const [myOrder, setMyOrder] = useState({ idOrder: 0, idCustomer: userData.idCustomer, idFlight: 0, numOfPlace: 0 });
    const [sorts, setSorts] = useState(["Price", "stations"]);
    const [srt, setSrt] = useState();
    const [companies, setCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [selectedPrice, setSelectedPrice] = useState();


    const navigate = useNavigate();
    const params = useParams()

    const startedFlight = async () => {
        const a = await getFlightsByNamePlace(params.namePlace)
        setFilterFlights(a);
        setFlightList(a);
    }
    const bringCompanies = () => {
        const comp = [...new Set(flightList.map((x) => x.nameCompany))];
        setCompanies(comp);
    }
    const fl = (n) => {
        setCompany(n);
        ///////////////////////////////
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
        const f = flightList.find((x) => x.nameCompany == c)
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
    const dateChanged = (event) => {
        const { value } = event.target;
        setSelectedDate(value);
    }
    const priceChanged = (event) => {
        const { value } = event.target;
        setSelectedPrice(value);
    }

    const filterTheList = async () => {

        let filterDate = flightList, filterCompany = flightList, filterPrice = flightList;
        debugger
        if (selectedDate) {
            filterDate = flightList.filter((x) => new Date(x.dateFlight).toLocaleDateString() === new Date(selectedDate).toLocaleDateString())
        }
        if (selectedCompanies.length > 0) {
            filterCompany = flightList.filter((x) => selectedCompanies.includes(x.nameCompany))
        }
        if (selectedPrice) {
            filterPrice = flightList.filter((x) => selectedPrice >= x.price)
        }
        setFilterFlights(flightList.filter((x) => filterDate.includes(x) && filterCompany.includes(x) && filterPrice.includes(x)))

    }
    useEffect(() => {
        startedFlight();
    }, [])
    useEffect(() => {
        filterTheList();
    }, [selectedCompanies, selectedDate, selectedPrice])

    return <div className="home">


        <div className="AllFlights">

            {filterFlights && filterFlights.length > 0 && filterFlights.map(p =>

                <div class="flip-box">
                    <div class="flip-box-inner">
                        <div class="flip-box-front">
                            <h2>{new Date(p.dateFlight).toLocaleDateString()}</h2>
                        </div>
                        <div class="flip-box-back">
                            <h2 onClick={() => fl(p.nameCompany)}>company: {p.nameCompany}</h2>
                            <h2>price: {p.price}</h2>
                        </div>
                    </div>
                </div>
            )}
        </div>


        <TextField sx={{ width: "300px"}}
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
        <div className="filters">
            <h1>filter by :</h1>
            <FormControl sx={{ width: "300px", marginLeft: "2vw" }} onBlur={bringCompanies}>
                <InputLabel id="demo-simple-select-label">Companies</InputLabel>
                <Select
                    multiple
                    value={selectedCompanies}
                    label="Company"
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

            <TextField sx={{ width: "300px", marginLeft: "2vw" }}
                onChange={(e) => dateChanged(e)}
                label="date" variant="outlined" type="date" />

            <TextField sx={{ width: "300px", marginLeft: "2vw" }}
                onChange={(e) => priceChanged(e)}
                label="price" variant="outlined" type="number" />

        </div>

    </div>
}

export const Direct = (props) => {
    return <>

    </>
}
