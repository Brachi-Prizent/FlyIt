import { Button, Checkbox, Dialog, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { getFlightsByNamePlace, getFlightsByIdCompany, createOrder } from "../utils/page1";
import { useNavigate, useParams } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import './Home.css'
import './Invitation.css'
import { Station } from "./Station";
import { setCurrentOrder } from "../redux/userSlice";

export const Invitation = () => {

    let dt = new Date();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.CurrentUser)
    const typesOfCard = ["Adult", "Child"];

    const [flight, setFlight] = useState();
    const [chooseDate, setChooseDate] = useState(false);
    //const [isDirect, setIsDirect] = useState(false);
    const [flightList, setFlightList] = useState([]);
    const [filterFlights, setFilterFlights] = useState([]);
    const [myOrder, setMyOrder] = useState({ idOrder: 0, idCustomer: userData.idCustomer, idFlight: 0, numOfChildPlace: 0, numOfAdultPlace: 0 });
    const [sorts, setSorts] = useState(["Price", "stations"]);
    const [srt, setSrt] = useState();
    const [companies, setCompanies] = useState([]);

    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedFromDate, setSelectedFromDate] = useState();
    const [selectedUntilDate, setSelectedUntilDate] = useState();
    const [selectedAdultPrice, setSelectedAdultPrice] = useState();
    const [selectedChildPrice, setSelectedChildPrice] = useState();
    const [selectedTypeCard, setSelectedTypeCard] = useState([]);
    const [selectedDirectFlight, setSelectedDirectFlight] = useState(false);

    const [isShowOrder, setIsShowOrder] = useState(false);
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
    const fl = (id) => {
        
        var f = flightList.find(x => x.idFlight == id);
        setMyOrder({ ...myOrder, idFlight: id });
        //var flt = await getFlightsByIdCompany(idFlight);
        setFlight(f);

    }

    const toOrder = async () => {
        debugger
        if (JSON.stringify(userData) == "{}") {
            dispatch(setCurrentOrder(myOrder))
            navigate('/LogIn');
            setIsShowOrder(true)
        }
        else {
            await createOrder(myOrder);
            navigate('/About');
        }
    }
    const changeSort = () => {
        //filterList.sort((x)=> x.price, )
    }
    const companyChanged = (event) => {
        const { value } = event.target;
        setSelectedCompanies(value);
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

        let filterFromDate = flightList, filterUntilDate = flightList, filterCompany = flightList, filterAdultPrice = flightList, filterChildPrice = flightList, filterDirectFlight = flightList;
        debugger
        if (selectedFromDate) {
            filterFromDate = flightList.filter((x) => new Date(x.dateFlight).toLocaleDateString() >= new Date(selectedFromDate).toLocaleDateString())
        }
        if (selectedUntilDate) {
            filterUntilDate = flightList.filter((x) => new Date(x.dateFlight).toLocaleDateString() <= new Date(selectedUntilDate).toLocaleDateString())
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
        if (selectedDirectFlight) {
            filterDirectFlight = flightList.filter((x) => x.stations.length == 0)
        }
        setFilterFlights(flightList.filter((x) => filterDirectFlight.includes(x) && filterFromDate.includes(x) && filterUntilDate.includes(x) && filterCompany.includes(x) && filterAdultPrice.includes(x) && filterChildPrice.includes(x)))

    }
    useEffect(() => {
        startedFlight();
    }, [])
    useEffect(() => {
        filterTheList();
    }, [selectedCompanies, selectedFromDate, selectedUntilDate, selectedAdultPrice, selectedChildPrice, selectedTypeCard, selectedDirectFlight])


    return <div className="home">
        {userData?.idCustomer != "" && <h1>Hello {userData.firstname}😉</h1>}
        <div className="AllFlights">

            <div className="filters">
                <h1><Search></Search>filter by :</h1>

                <Button onClick={() => setSelectedDirectFlight(true)}>direct flight</Button>

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

                {!chooseDate && <Button onClick={() => setChooseDate(true)}>Date</Button>}
                {chooseDate &&
                    < TextField sx={{ width: "10%", marginLeft: "1vw" }}
                        onChange={(e) => setSelectedFromDate(e.target.value)}

                        label="from date" variant="outlined" type="date" />}
                {chooseDate && <TextField sx={{ width: "10%", marginLeft: "1vw" }}
                    onChange={(e) => setSelectedUntilDate(e.target.value)}
                    label="until date" variant="outlined" type="date" />}


                <FormControl sx={{ width: "10%", marginLeft: "1vw" }}>
                    <InputLabel id="demo-simple-select-label">Price</InputLabel>
                    <Select
                        multiple
                        value={selectedTypeCard}
                        label="Price"
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


            {filterFlights && filterFlights.length > 0 && filterFlights.map(p =>

                <div class="flip-box">
                    <div class="flip-box-inner">
                        <div class="flip-box-front">
                            <h2>{new Date(p.dateFlight).toLocaleDateString()}</h2>
                        </div>
                        <div class="flip-box-back" onClick={() => fl(p.idFlight)}>
                            <h2>company: {p.nameCompany}</h2>
                            <h2>childPrice: {p.childPrice}</h2>
                            <h2>adultPrice: {p.adultPrice}</h2>
                            {p.stations.length > 0 ? <div style={{ textDecoration: "underline" }} onClick={() => showStation(p.stations)}>flight whith stations</div> : <div>direct flight</div>}
                        </div>
                        <Dialog open={isOpen} onClose={() => setIsOpen(false)} aria-describedby='alert-dialog-slide-description'><div className='popup'><Station props={stations}></Station></div></Dialog>
                    </div>
                </div>
            )}
        </div>
        {myOrder.idFlight != 0 &&
            <div>
                <TextField sx={{ width: "300px" }}
                    onChange={(e) => setMyOrder({ ...myOrder, numOfChildPlace: e.target.value })} id="number" label="*numOfChildPlace" variant="outlined" type="number" />
                <TextField sx={{ width: "300px" }}
                    onChange={(e) => setMyOrder({ ...myOrder, numOfAdultPlace: e.target.value })} id="number" label="*numOfAdultPlace" variant="outlined" type="number" />

                <div></div>

                {(myOrder.numOfAdultPlace > 0 || myOrder.numOfChildPlace > 0) && <h1>your price is :</h1>}

                {(myOrder.numOfAdultPlace > 0 || myOrder.numOfChildPlace > 0)
                    && filterFlights.map(x =>
                        (x.idFlight == flight.idFlight) && <h2>{(x.childPrice * myOrder.numOfChildPlace) + (x.adultPrice * myOrder.numOfAdultPlace)}</h2>
                    )}
            </div>
        }


        {(myOrder.numOfAdultPlace > 0 || myOrder.numOfChildPlace > 0) && < Button onClick={toOrder} variant="outlined">click to order</Button>}

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
    </div>
}

