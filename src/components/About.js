import { useState } from "react";
import { getCustomerById } from "../utils/get";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Dialog, TextField } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { resetCurrentOrder, resetCurrentUser, setCurrentUser } from "../redux/userSlice";
import './About.css';
import './Home.css';
import { CustomerOrders } from "./CustomerOrders";
import { CreditPoints } from "./CreditPoints";
import { LoginOutlined } from "@mui/icons-material";
import { LogIn } from "./LogIn";

export const About = () => {

    const [id, setId] = useState();
    const [isShowOrders, setIsShowOrders] = useState(false);
    const [isShowCreditPoint, setIsShowCreditPoint] = useState(false);
    const [isChangeUser, setIsChangeUser] = useState(false);
    const [isShowCustomer, setIsShowCustomer] = useState(true);
    const [isCanceled, setIsCanceled] = useState(false);
    const [isSohwUpdateDetiles, setIsSohwUpdateDetiles] = useState(false);
    const [myErrors, setMyErrors] = useState({ idCustomerError: "" })

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.CurrentUser);

    const newCustomer = async () => {
        debugger
        dispatch(resetCurrentUser())
        dispatch(resetCurrentOrder())
        setIsChangeUser(false);
        setIsShowCustomer(false);
        const customer = await getCustomerById(id);
        if (customer.length != 0) {
            dispatch(setCurrentUser(await customer));
        }
    }

    const canceled = () => {
        debugger
        if (isChangeUser) {
            setIsCanceled(true);
            setIsChangeUser(false);
            setIsShowCustomer(false);
        }
        else
            navigate('/')
    }

    const validateIdCustomer = (e) => {
        debugger
        e.preventDefault();
        var val = /^[0-9]{9}$/;
        setId(e.target.value);
        if (!e.target.value)
            setMyErrors({ ...myErrors, idCustomerError: "Required!!!" })
        else if (e.target.value.match(val))
            setMyErrors({ ...myErrors, idCustomerError: 'Correct!!!' })
        else
            setMyErrors({ ...myErrors, idCustomerError: 'Wrong...!! password must be 9 digits' })
    }

    return <>
        <div className="about">
            {(userData.idCustomer == undefined || isChangeUser) && <Dialog open={isShowCustomer} aria-describedby='alert-dialog-slide-description'>
                <div className="a">
                    <h1>hello enter your code!</h1>
                    <Box>
                        <TextField value={id} type="password" id="id" color="success" label="id" variant="outlined" onChange={(e) => validateIdCustomer(e)} /><div className="error">{myErrors.idCustomerError}</div>
                    </Box>
                    <Button sx={{backgroundColor: "#67c6b8"}} disabled={myErrors.idCustomerError != 'Correct!!!'} variant="contained" endIcon={<LoginOutlined></LoginOutlined>} onClick={newCustomer}>confirm</Button>
                    <Button variant="contained" color="error" endIcon={<LoginOutlined></LoginOutlined>} onClick={canceled}>cancel</Button>
                </div>
            </Dialog >}

            {JSON.stringify(userData) != "{}" && <h1>Hi {userData.firstname}😉</h1>}

            <div className="btnn">
                {JSON.stringify(userData) != "{}" && <Button variant="contained" sx={{width: "10vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw"}} onClick={() => {
                    debugger
                    setIsShowCustomer(true)
                    setId(undefined)
                    setMyErrors({ ...myErrors, idCustomerError: undefined })
                    setIsChangeUser(true)
                    setIsShowOrders(false)
                    setIsShowCreditPoint(false)
                    setIsSohwUpdateDetiles(false)
                }
                }>change user</Button>}

                {JSON.stringify(userData) != "{}" && <Button variant="contained" sx={{width: "10vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw"}} onClick={() => {
                    setIsShowCreditPoint(true)
                    setIsShowOrders(false)
                    setIsSohwUpdateDetiles(false)
                    // setIsShowCustomer(false)
                }}>creditPoints</Button>}

{/* <Button sx={{backgroundColor: "#67c6b8"}} variant="contained" color="success" >confirm</Button> */}
{/* <Button sx={{width: "10vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw"}}>my orders</Button> */}

                {JSON.stringify(userData) != "{}" && <Button variant="contained" sx={{width: "10vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw"}} onClick={() => {
                    setIsShowOrders(true)
                    setIsShowCreditPoint(false)
                    setIsSohwUpdateDetiles(false)
                    // setIsShowCustomer(false)
                }}>my orders</Button>}

                {JSON.stringify(userData) != "{}" && <Button variant="contained" sx={{ width: "10vw", color: "white", backgroundColor: "#67c6b8", margin: "1vw"}} onClick={() => {
                    debugger
                    setIsSohwUpdateDetiles(true)
                    setIsShowOrders(false)
                    setIsShowCreditPoint(false)
                }}>update detiles</Button>}
            </div>

            {isShowOrders && <CustomerOrders props={id}></CustomerOrders>}
            {isShowCreditPoint && <CreditPoints></CreditPoints>}
            {((!isShowCustomer && JSON.stringify(userData) == "{}" && !isCanceled) || isSohwUpdateDetiles) && <LogIn setIsSohwUpdateDetiles={setIsSohwUpdateDetiles} userData={userData}></LogIn>}

        </div>
        <Outlet></Outlet>
    </>
}