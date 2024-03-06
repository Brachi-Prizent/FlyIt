import { Button, TextField } from "@mui/material"
import { setCurrentUser } from "../redux/userSlice";
import { createNewCompany, getFlightsByIdComany } from "../utils/page1";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";


export const AboutCompany = () => {
    //const [user, setUser] = useState({ IdCompany: "", NameCompany: "" });
    const [id, setId] = useState();
    //const [name, setName] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    debugger
    const companyData = useSelector((state) => state.user.CurrentUser);

    const newCompany = async () => {
        //await createNewCompany(user)
        dispatch(setCurrentUser(await getFlightsByIdComany(id)))
        navigate('/Flights');
    }

    return <>


        <div className='App'>
            

            <TextField onBlur={(e) => setId(e.target.value)} id="passWord" label="passWord" variant="outlined" />
            {/* <h3 className="error">{myErrors?.PasswordError}</h3> */}
            <Button onClick={() => newCompany()}>confirm</Button>

            {companyData && <p>{companyData.IdCompany}</p>}
            
            {/* <div className="a"><AccountCircle color="success" sx={{ fontSize: '120px' }}></AccountCircle></div>
            <div className="a"><TextField label="IdCompany" variant="outlined" type="password" color="success" onChange={(e) => setUser({ ...user, IdCompany: e.target.value }) && setId(e.target.value)} /></div>
            <div className="a"><TextField label="NameCompany" variant="outlined" color="success" onChange={(e) => setUser({ ...user, NameCompany: e.target.value }) && setName(e.target.value)} /></div>
            <div className="a"><Button variant="contained" color="success" onClick={() => { newCompany() }}>Confirm</Button></div> */}
        </div>





    </>
}