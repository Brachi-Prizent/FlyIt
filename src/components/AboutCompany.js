import { Box, Button, Dialog, TextField } from "@mui/material"
import { resetCurrentUser, setCurrentUser } from "../redux/userSlice";
import { getFlightsByIdCompany } from "../utils/page1";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { LoginOutlined } from "@mui/icons-material";
import { Flights } from "./Flights/Flights";
import { UpdateFlight } from "./Flights/UpdateFlight";


export const AboutCompany = () => {
    //const [user, setUser] = useState({ IdCompany: "", NameCompany: "" });
    const [id, setId] = useState();
    const [isShow, setIsShow] = useState(true);
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    //const [name, setName] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const companyData = useSelector((state) => state.user.CurrentUser);

    const flightsCompany = async () => {
        debugger
        //await createNewCompany(user)
        const company = await getFlightsByIdCompany(id)
        dispatch(setCurrentUser(await company))
        //navigate('/Flights');
    }

    return <>


        <div className='App'>

            <div style={{ height: "10px" }}></div>
            {!companyData.idCompany && <Dialog open={isShow} onClose={() => setIsShow(false)} aria-describedby='alert-dialog-slide-description'>
                <div className="a">
                    <h1>hello company enter your code!</h1>
                    <Box>
                        <TextField type="password" id="id" color="success" label="id" variant="outlined" onBlur={(e) => setId(e.target.value)} />
                    </Box>
                    <Button variant="contained" color="success" endIcon={<LoginOutlined></LoginOutlined>} onClick={flightsCompany}>confirm</Button>
                </div>
            </Dialog >}

            {/* <TextField onBlur={(e) => flightsCompany(e.target.value)} id="passWord" label="passWord" variant="outlined" /> */}

            {companyData.idCompany && <h1>hi {companyData.nameCompany}😉</h1>}







            <div className="bottons">
                {companyData.idCompany && <div className="a"><Button variant="contained" color="error" onClick={() => dispatch(resetCurrentUser())}>changeUser</Button></div>}
                {companyData.idCompany && <div className="a"><Button variant="contained" color="error" endIcon={<LoginOutlined></LoginOutlined>} onClick={() => setIsUpdate(true)}>myFlights</Button></div>}
                {companyData.idCompany && <div className="a"><Button variant="contained" color="error" endIcon={<LoginOutlined></LoginOutlined>} onClick={() => setIsAdd(true)}>add</Button></div>}
            </div>
            <Dialog open={isAdd} onClose={() => setIsAdd(false)} aria-describedby='alert-dialog-slide-description'><div className='popup'><UpdateFlight /></div></Dialog>
            {isUpdate && <Flights />}

        </div>






    </>
}