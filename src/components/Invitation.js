import { Button, Checkbox, Dialog, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { getFlightsByNamePlace, getCompanyByName, getCreditPointByIdCustomerAndNameCompany } from "../utils/get";
import { useNavigate, useParams } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import './Home.css'
import './Invitation.css'
import { Station } from "./Station";
import { resetCurrentOrder, setCurrentOrder } from "../redux/userSlice";
import { LogIn } from "./LogIn";
import { createCreditPointCustomer, createOrder } from "../utils/postService"
import { UpdateCreditPointCustomer } from "../utils/putService";
import { hover } from "@testing-library/user-event/dist/hover";

export const Invitation = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userData = useSelector((state) => state.user.CurrentUser);
    const typesOfCard = ["Adult", "Child"];

    const [currentFlight, setCurrentFlight] = useState();
    const [pointPrice, setPointPrice] = useState(1);
    const [chooseDate, setChooseDate] = useState(false);
    const [flightList, setFlightList] = useState([]);
    const [filterFlights, setFilterFlights] = useState([]);
    const [myOrder, setMyOrder] = useState({ idOrder: 0, idCustomer: userData.idCustomer, idFlight: 0, numOfChildPlace: 0, numOfAdultPlace: 0 });
    const [companies, setCompanies] = useState([]);

    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedFromDate, setSelectedFromDate] = useState();
    const [selectedUntilDate, setSelectedUntilDate] = useState();
    const [selectedAdultPrice, setSelectedAdultPrice] = useState();
    const [selectedChildPrice, setSelectedChildPrice] = useState();
    const [selectedTypeCard, setSelectedTypeCard] = useState([]);
    const [selectedDirectFlight, setSelectedDirectFlight] = useState(false);
    const [selectedCreditPoint, setSelectedCreditPoint] = useState(0);

    const [companyCreditPoints, setCompanyCreditPoints] = useState({ creditPoint: 0 });
    const [isShowOrder, setIsShowOrder] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [stations, setStations] = useState([]);
    const [currentCreditPoint, setCurrentCreditPoint] = useState({ idCreditPoint: 0, idCustomer: userData.idCustomer, nameCompany: "", creditPoint: 0 })
    const [isShowLogin, setIsShowLogin] = useState(false);
    const [isNotValid, setIsNotValid] = useState(false);

    const startedFlight = async () => {
        const a = await getFlightsByNamePlace(params.namePlace)
        setFilterFlights(a);
        setFlightList(a);
    }
    const bringCompanies = () => {
        const comp = [...new Set(flightList.map((x) => x.nameCompany))];
        setCompanies(comp);
    }
    const fl = async (f) => {
        debugger
        //var f = flightList.find(x => x.idFlight == f.idFlight);
        setMyOrder({ ...myOrder, idFlight: f.idFlight });
        //var flt = await getFlightsByIdCompany(idFlight);
        setCurrentFlight(f);
        setCurrentCreditPoint({ ...currentCreditPoint, nameCompany: f.nameCompany })
    }

    const toOrder = async () => {
        debugger
        if (myOrder.numOfAdultPlace + myOrder.numOfChildPlace <= currentFlight.maxSeats - currentFlight.bookedSeats) {
            debugger
            //setIsShowOrder(true)
            //setSelectedCreditPoint(companyCreditPoints?.creditPoint / 2)
            const comp = await getCompanyByName(currentFlight.nameCompany);
            setPointPrice(comp[0].pointPrice);
            //setCurrentCreditPoint({ ...currentCreditPoint, creditPoint: companyCreditPoints?.creditPoint + (myOrder.numOfAdultPlace + myOrder.numOfChildPlace) * currentFlight.timeFlight })
            if (userData.idCustomer == undefined) {
                dispatch(setCurrentOrder(myOrder))
                setIsShowLogin(true);
            }
            else {
                dispatch(resetCurrentOrder());
                //setCurrentCreditPoint({ ...currentCreditPoint, idCustomer: userData.idCustomer });
                setMyOrder({ ...myOrder, idCustomer: userData.idCustomer });
                const c = await getCreditPointByIdCustomerAndNameCompany(userData.idCustomer, currentFlight.nameCompany)
                if (c.length > 0) {
                    //setCurrentCreditPoint({ ...currentCreditPoint, idCreditPoint: c[0].idCreditPoint });
                    setCompanyCreditPoints(c[0]);
                    setIsShowOrder(true);
                }
                else {
                    toOrder2({ ...myOrder, idCustomer: userData.idCustomer });
                }

            }
        }
        else {
            setIsNotValid(true)
            myFunction()

        }
    }
    function myFunction() {
        debugger
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    const toOrder2 = async (order) => {
        debugger
        setIsShowOrder(false);
        setCurrentCreditPoint({ ...currentCreditPoint, idCustomer: userData.idCustomer, creditPoint: companyCreditPoints?.creditPoint - selectedCreditPoint + (myOrder.numOfAdultPlace + myOrder.numOfChildPlace) * currentFlight.timeFlight })
        await createOrder(order);
        updateCreditPoint({ ...currentCreditPoint, idCustomer: userData.idCustomer, creditPoint: companyCreditPoints?.creditPoint - selectedCreditPoint + (myOrder.numOfAdultPlace + myOrder.numOfChildPlace) * currentFlight.timeFlight })
    }
    const updateCreditPoint = async (cp) => {
        debugger
        if (companyCreditPoints.creditPoint == 0) {
            await createCreditPointCustomer(cp);
        }
        else {
            const c = await UpdateCreditPointCustomer(cp);
        }
        navigate("/About");
    }

    const companyChanged = (event) => {
        const { value } = event.target;
        setSelectedCompanies(value);
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

    const resetFilters = () => {
        setFilterFlights(flightList);
        setSelectedCompanies([]);
        setSelectedDirectFlight(false);
        setSelectedUntilDate(undefined);
        setSelectedFromDate(undefined);
        setSelectedTypeCard([]);
        setSelectedAdultPrice(undefined);
        setSelectedChildPrice(undefined);
        setChooseDate(false);
    }

    useEffect(() => {
        startedFlight();
    }, [])

    useEffect(() => {
        filterTheList();
    }, [selectedCompanies, selectedFromDate, selectedUntilDate, selectedAdultPrice, selectedChildPrice, selectedTypeCard, selectedDirectFlight])

    return <div className="home">
        {userData.idCustomer != undefined && <h1>Hello {userData.firstname}😉</h1>}
        <div className="AllFlights">

            <div className="filters">
                <h1><Search></Search>Filter by :</h1>

                <Button variant="contained" sx={{overscrollBehavior: "unset", height: "6vh", width: "8vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw"}} onClick={() => resetFilters()}>all flights</Button>
                <Button variant="contained" sx={{ height: "6vh", width: "8vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw"}} onClick={() => setSelectedDirectFlight(true)}>direct flight</Button>

                {!chooseDate && <Button variant="contained" sx={{ height: "6vh", width: "8vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw"}} onClick={() => setChooseDate(true)}>Date</Button>}
                {chooseDate &&
                    < TextField sx={{ height: "6vh", width: "8vw", margin: "1vw" }}
                        onChange={(e) => setSelectedFromDate(e.target.value)}
                        value={selectedFromDate}
                        label="from date" variant="contained" type="date" />}

                {chooseDate && <TextField sx={{ width: "8vw", margin: "1vw" }}
                    onChange={(e) => setSelectedUntilDate(e.target.value)}
                    value={selectedUntilDate}
                    label="until date"  variant="contained "type="date" />}

                <FormControl sx={{height: "6vh", width: "8vw", margin: "1vw"}} onBlur={bringCompanies}>
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

                <FormControl sx={{height: "6vh", width: "8vw", margin: "1vw"}}>
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

                {((selectedTypeCard.length == 1 && selectedTypeCard == "Adult") || selectedTypeCard.length == 2) &&
                    <TextField sx={{ width: "8vw", margin: "1vw"}} label="adultPrice" variant="outlined" onChange={(e) => setSelectedAdultPrice(e.target.value)} />}
                {((selectedTypeCard.length == 1 && selectedTypeCard == "Child") || selectedTypeCard.length == 2) &&
                    <TextField sx={{ width: "8vw", margin: "1vw"}} label="childPrice" variant="outlined" onChange={(e) => setSelectedChildPrice(e.target.value)} />}
            
            </div>


            {filterFlights && filterFlights.length > 0 && filterFlights.map(p =>

                <div class="flip-box">
                    <div class="flip-box-inner">
                        <div class="flip-box-front">
                            <h2>{new Date(p.dateFlight).toLocaleDateString()}</h2>
                            <h2>{p.departure}</h2>
                        </div>
                        <div class="flip-box-back" onClick={() => fl(p)}>
                            <div className="tooltip">
                                <span className="tooltiptext">click to order</span>
                                <h2>company: {p.nameCompany}</h2>
                                <h2>childPrice: {p.childPrice}</h2>
                                <h2>adultPrice: {p.adultPrice}</h2>
                                <h2>remining seats: {p.maxSeats - p.bookedSeats}</h2>
                                {p.stations.length > 0 ? <div style={{ textDecoration: "underline" }} onClick={() => showStation(p.stations)}>flight whith stations</div> : <div>direct flight</div>}
                            </div>
                        </div>
                        <Dialog open={isOpen} onClose={() => setIsOpen(false)} aria-describedby='alert-dialog-slide-description'><div className='popup'><Station props={stations}></Station></div></Dialog>
                    </div>
                </div>
            )}
        </div>

        {myOrder.idFlight != 0 &&
            <div>
                <TextField sx={{ width: "10vw", marginLeft: "2vw" }} value={myOrder.numOfChildPlace}
                    onChange={(e) =>
                        (e.target.value == '' || e.target.value < 0) ? setMyOrder({ ...myOrder, numOfChildPlace: 0 }) : setMyOrder({ ...myOrder, numOfChildPlace: parseInt(e.target.value) })
                    } id="number" label="*numOfChildPlace" variant="outlined" type="number" />
                
                <TextField sx={{ width: "10vw", marginLeft: "2vw" }} value={myOrder.numOfAdultPlace}
                    onChange={(e) =>
                        (e.target.value == '' || e.target.value < 0) ? setMyOrder({ ...myOrder, numOfAdultPlace: 0 }) : setMyOrder({ ...myOrder, numOfAdultPlace: parseInt(e.target.value) })}
                    id="number" label="*numOfAdultPlace" variant="outlined" type="number" />

                <div></div>

                {(myOrder.numOfAdultPlace > 0 || myOrder.numOfChildPlace > 0) && <h1>your payment is :</h1>}

                {(myOrder.numOfAdultPlace > 0 || myOrder.numOfChildPlace > 0)
                    && filterFlights.map(x =>
                        (x.idFlight == currentFlight.idFlight) && <h2>{((x.childPrice * myOrder.numOfChildPlace) + (x.adultPrice * myOrder.numOfAdultPlace)) - (pointPrice * selectedCreditPoint)}</h2>
                    )}
            </div>
        }

        {(myOrder.numOfAdultPlace > 0 || myOrder.numOfChildPlace > 0) && < Button sx={{ height: "6vh", width: "15vw", color: "white", backgroundColor: "#67c6b8"}} onClick={() => toOrder()} variant="outlined">click to order</Button>}
        {userData.idCustomer == undefined && <Dialog open={isShowLogin} onClose={() => setIsShowLogin(false)} aria-describedby='alert-dialog-slide-description'><div className='popup'><LogIn></LogIn></div></Dialog>}

        {isNotValid && <div id="snackbar">your num of place is over</div>}

        <Dialog open={isShowOrder} onClose={() => {
            toOrder2(myOrder)
        }} aria-describedby='alert-dialog-slide-description'><h3 style={{padding: "80px", textAlign: 'center' }}>
                <h3>you have {companyCreditPoints?.creditPoint} Credit points </h3>
                <p>how many CreditPoints do you want to use?</p>
                <input type="range" value={selectedCreditPoint} min="0" max={companyCreditPoints?.creditPoint} onChange={(e) => setSelectedCreditPoint(parseInt(e.target.value))} />
                <div>{selectedCreditPoint}</div>
            </h3></Dialog>
    </div>
}

