import { Button, Checkbox, Dialog, FormControl, InputLabel, ListItemText, MenuItem, Select, TableHead, TableRow, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { getPlace, getAllFlights, getFlightsByNamePlace, GetStationByIdFlight } from "../utils/page1";
import { useNavigate, useParams } from "react-router-dom";
import { Filter1, Flight, Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import './Home.css'
import './Invitation.css'
import { Station } from "./Station";

export const Invitation = () => {
    let dt = new Date();

    const userData = useSelector((state) => state.user.CurrentUser)
    const typesOfCard = ["Adult", "Child"];
    const [company, setCompany] = useState();
    const [isDirect, setIsDirect] = useState(false);
    const [flightList, setFlightList] = useState([]);
    const [filterFlights, setFilterFlights] = useState([]);
    const [myOrder, setMyOrder] = useState({ idOrder: 0, idCustomer: userData.idCustomer, idFlight: 0, numOfChildPlace: 0, numOfAdultPlace: 0 });
    const [sorts, setSorts] = useState(["Price", "stations"]);
    const [srt, setSrt] = useState();
    const [companies, setCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [selectedAdultPrice, setSelectedAdultPrice] = useState();
    const [selectedChildPrice, setSelectedChildPrice] = useState();
    const [selectedTypeCard, setSelectedTypeCard] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [stations, setStations] = useState([]);



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
    const ifDirect = async (idFlight) => {
        let isDirect;
        //const f = flightList.find((x) => x.nameCompany == c)
        console.log("Jjj")
        const st = await GetStationByIdFlight(idFlight);
        console.log(st, "hhhhh")
        if (st.length == 0)
            isDirect = true;
        //setIsDirect(true)
        else
            isDirect = false;
        //setIsDirect(false)
        return isDirect;
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
        if (selectedTypeCard.includes("Adult")) {
            setSelectedAdultPrice(value)
        }
        if (selectedTypeCard.includes("Child")) {
            setSelectedChildPrice(value)
        }
    }
    const typeChanged = (event) => {
        const { value } = event.target;
        setSelectedTypeCard(value);
    }
    const showStation = (s) => {
        debugger
        setStations(s);
        setIsOpen(true);
    }
    const filterTheList = async () => {

        let filterDate = flightList, filterCompany = flightList, filterAdultPrice = flightList, filterChildPrice = flightList;
        debugger
        if (selectedDate) {
            filterDate = flightList.filter((x) => new Date(x.dateFlight).toLocaleDateString() === new Date(selectedDate).toLocaleDateString())
        }
        if (selectedCompanies.length > 0) {
            filterCompany = flightList.filter((x) => selectedCompanies.includes(x.nameCompany))
        }
        if (selectedAdultPrice) {
            filterAdultPrice = flightList.filter((x) => selectedAdultPrice >= x.adultPrice)
        }
        if (selectedChildPrice) {
            filterChildPrice = flightList.filter((x) => selectedChildPrice >= x.childPrice)
        }
        setFilterFlights(flightList.filter((x) => filterDate.includes(x) && filterCompany.includes(x) && filterAdultPrice.includes(x) && filterChildPrice.includes(x)))

    }
    useEffect(() => {
        startedFlight();
    }, [])
    useEffect(() => {
        filterTheList();
    }, [selectedCompanies, selectedDate, selectedAdultPrice, selectedChildPrice, selectedTypeCard])

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
                            <h2>childPrice: {p.childPrice}</h2>
                            <h2>adultPrice: {p.adultPrice}</h2>
                            {p.stations.length > 0 ? <div style={{ textDecoration: "underline" }} onClick={() => showStation(p.stations)}>flight whith stations</div> : <div>direct flight</div>}
                            {/* <h2>direct: {async () => await ifDirect(p.idFlight)
                                ? <div>true</div> : <div>false</div>}</h2> */}
                        </div>
                        <Dialog open={isOpen} onClose={() => setIsOpen(false)} aria-describedby='alert-dialog-slide-description'><div className='popup'><Station props={stations}></Station></div></Dialog>

                    </div>
                </div>
            )}
        </div>


        <TextField sx={{ width: "300px" }}
            onChange={(e) => setMyOrder({ ...myOrder, numOfChildPlace: e.target.value })} id="number" label="*numOfChildPlace" variant="outlined" type="number" />
        <TextField sx={{ width: "300px" }}
            onChange={(e) => setMyOrder({ ...myOrder, numOfAdultPlace: e.target.value })} id="number" label="*numOfAdultPlace" variant="outlined" type="number" />

        <div></div>

        {(myOrder.numOfAdultPlace > 0 || myOrder.numOfChildPlace > 0) && <h1>your price is :</h1>}

        {(myOrder.numOfAdultPlace > 0 || myOrder.numOfChildPlace > 0)
            && filterFlights.map(x => console.log(x.childPrice, "yyyyyyyyyyyy") &&
                (x.nameCompany == company) && <h2>{(x.childPrice * myOrder.numOfChildPlace) + (x.adultPrice * myOrder.numOfAdultPlace)}</h2>
            )}


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
            <h1><Search></Search>filter by :</h1>
            <FormControl sx={{ width: "10%", marginLeft: "1vw" }} onBlur={bringCompanies}>
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

            <TextField sx={{ width: "10%", marginLeft: "1vw" }}
                onChange={(e) => dateChanged(e)}
                label="date" variant="outlined" type="date" />


            <FormControl sx={{ width: "10%", marginLeft: "1vw" }}>
                <InputLabel id="demo-simple-select-label">TypeOfCard</InputLabel>
                <Select
                    multiple
                    value={selectedTypeCard}
                    label="TypeOfCard"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size="small"
                    fullWidth
                    onChange={typeChanged}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {typesOfCard.map((x) =>
                        <MenuItem value={x}><Checkbox checked={selectedTypeCard.includes(x)} />
                            <ListItemText primary={x} />
                        </MenuItem>)}
                </Select>
            </FormControl>

            {selectedTypeCard.length == 1 &&
                <TextField sx={{ width: "10%", marginLeft: "1vw" }}
                    onChange={(e) => priceChanged(e)}
                    label={`${selectedTypeCard}Price`} variant="outlined" type="number" />}

            {selectedTypeCard.length == 2 &&
                <>
                    <TextField sx={{ width: "10%", marginLeft: "1vw" }}
                        onChange={(e) => priceChanged(e)}
                        label="AdultPrice" variant="outlined" type="number" />
                    <TextField sx={{ width: "10%", marginLeft: "1vw" }}
                        onChange={(e) => priceChanged(e)}
                        label="ChildPrice" variant="outlined" type="number" />
                </>
            }
        </div>

    </div>
}

export const Direct = (props) => {
    return <>

    </>
}
