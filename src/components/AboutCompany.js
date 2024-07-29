import { Box, Button, Dialog, TextField } from "@mui/material"
import { resetCurrentOrder, resetCurrentUser, setCurrentUser } from "../redux/userSlice";
import { getCompanyById, getFlightsByIdCompany } from "../utils/get";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LoginOutlined } from "@mui/icons-material";
import { Flights } from "./Flights/Flights";
import { UpdateFlight } from "./Flights/UpdateFlight";
import './About.css'

export const AboutCompany = () => {

    const [id, setId] = useState();
    const [isShowCompany, setIsShowCompany] = useState(true);
    const [isAdd, setIsAdd] = useState(false);
    const [isAddClose, setIsAddClose] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [isOkay, setIsOkay] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);
    const [myErrors, setMyErrors] = useState({ idCompanyError: "" })


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const companyData = useSelector((state) => state.user.CurrentUser);

    const bringCompany = async () => {
        debugger
        dispatch(resetCurrentUser());
        dispatch(resetCurrentOrder());
        const company = await getCompanyById(id);
        if (company.length > 0) {
            setIsShowCompany(false);
            dispatch(setCurrentUser(await company));
        }
        else
            setIsOkay(false);
    }
    const canceled = () => {
        if (isChange) {
            setIsChange(false);
            setIsShowCompany(false);
        }
        else
            navigate('/')

    }

    const validateIdCompany = (e) => {
        debugger
        e.preventDefault();
        var val = /^[0-9]{1,}$/;
        setId(e.target.value);
        if (!(e.target.value)) {
            setMyErrors({ ...myErrors, idCompanyError: "Required!!!" })
        }
        else if (e.target.value.match(val)) {
            setMyErrors({ ...myErrors, idCompanyError: 'Correct!!!' })
        }
        else {
            setMyErrors({ ...myErrors, idCompanyError: 'Wrong...!! password must be digits' })
        }
    }

    return <>

        <div className='home'>

            <div style={{ height: "10px" }}></div>
            {(!companyData?.idCompany || isChange) && <Dialog open={isShowCompany} aria-describedby='alert-dialog-slide-description'>
                <div className="a">
                    {isOkay ? <h1>hello enter your code!</h1> : <h1>Wrong password please enter again!</h1>}
                    <Box>
                        <TextField value={id} type="password" id="id" color="success" label="id" variant="outlined" onChange={(e) => validateIdCompany(e)} /><div className="error">{myErrors.idCompanyError}</div>
                    </Box>
                    <Button sx={{ backgroundColor: "#67c6b8" }} disabled={myErrors.idCompanyError != 'Correct!!!'} variant="contained" endIcon={<LoginOutlined></LoginOutlined>} onClick={bringCompany}>confirm</Button>
                    <Button variant="contained" color="error" endIcon={<LoginOutlined></LoginOutlined>} onClick={canceled}>cancel</Button>
                </div>
            </Dialog >}

            {companyData?.idCompany && <h1>Hi {companyData.nameCompany}😉</h1>}

            <div className="buttons">
                {companyData?.idCompany && <div className="a"><Button variant="contained" sx={{ width: "10vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw" }} onClick={() => {
                    setIsAddClose(false)
                    setIsUpdate(false);
                    // setIsAdd(false)
                    setIsChange(true);
                    setIsShowCompany(true);
                    setId(undefined);
                    setMyErrors({ ...myErrors, idCompanyError: undefined })
                }
                }>changeUser</Button></div>}
                {companyData?.idCompany && <div className="a"><Button variant="contained" sx={{ width: "10vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw" }} onClick={() => setIsUpdate(true)}>myFlights</Button></div>}
                {companyData?.idCompany && <div className="a"><Button variant="contained" sx={{ width: "10vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw" }} onClick={() => setIsAdd(true)}>add</Button></div>}
            </div>

            <Dialog open={isAdd} onClose={() => {
                setIsAdd(false)
                setIsAddClose(true)
            }
            } aria-describedby='alert-dialog-slide-description'><div><UpdateFlight onClose={() => setIsAdd(false)}></UpdateFlight></div></Dialog>
            {isUpdate && <Flights />}

        </div>

    </>
}