import { useState } from "react";
import { getCustomerById, getOrdersById } from "../utils/get";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Dialog, TextField } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { resetCurrentUser, setCurrentUser } from "../redux/userSlice";
import './About.css'
import { CustomerOrders } from "./CustomerOrders";
import { CreditPoints } from "./CreditPoints";
import { LoginOutlined } from "@mui/icons-material";
import { LogIn } from "./LogIn";

export const About = () => {

    const [id, setId] = useState();
    const [isShowOrders, setIsShowOrders] = useState(false);
    const [isShowCreditPoint, setIsShowCreditPoint] = useState(false);
    const [isShowCustomer, setIsShowCustomer] = useState(true);
    const [custometEmpty, setCustometEmpty] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.user.CurrentUser);

    const newCustomer = async () => {
        debugger
        setIsShowCustomer(false);
        const customer = await getCustomerById(id);
        if (customer.length != 0) {
            dispatch(setCurrentUser(await customer));
        }
        else {
            setCustometEmpty(true);
        }
    }
    // const newCustomer = async () => {
    //     //await createNewCustomer(user)
    //     dispatch(setCurrentUser(await getCustomerById(id)))
    //     navigate('/');
    // }
    // useEffect(() => {
    //     if (userData?.idCustomer != undefined)
    //         Orders();
    // }, [])

    return <>
        <div className="about">

            {!userData?.idCustomer && <Dialog open={isShowCustomer} aria-describedby='alert-dialog-slide-description'>
                <div className="a">
                    <h1>hello customer enter your code!</h1>
                    <Box>
                        <TextField type="password" id="id" color="success" label="id" variant="outlined" onBlur={(e) => setId(e.target.value)} />
                    </Box>
                    <Button variant="contained" color="success" endIcon={<LoginOutlined></LoginOutlined>} onClick={newCustomer}>confirm</Button>
                    <Button variant="contained" color="success" endIcon={<LoginOutlined></LoginOutlined>} onClick={()=>navigate('/')}>cancel</Button>
                </div>
            </Dialog >}

            {JSON.stringify(userData) != "{}" && <h1>Hello {userData.firstname}😉</h1>}
            {/* {JSON.stringify(userData) == "{}" && <TextField onBlur={(e) => Orders(e.target.value)} id="passWord" label="passWord" variant="outlined" />} */}
            {JSON.stringify(userData) != "{}" && <Button onClick={() => {
                setIsShowOrders(false)
                debugger
                setIsShowCreditPoint(false)
                dispatch(resetCurrentUser())
                setIsShowCustomer(true);
            }
            }>changeUser</Button>}
            {JSON.stringify(userData) != "{}" && <Button onClick={() => {
                setIsShowCreditPoint(true)
                setIsShowOrders(false)
            }}>creditPoints</Button>}

            {JSON.stringify(userData) != "{}" && <Button onClick={() => {
                setIsShowOrders(true)
                setIsShowCreditPoint(false)
            }}>my orders</Button>}

            {isShowOrders && <CustomerOrders props={id}></CustomerOrders>}
            {isShowCreditPoint && <CreditPoints></CreditPoints>}
            {custometEmpty && <LogIn id={id} setCustometEmpty={setCustometEmpty}></LogIn>}
        </div>
        <Outlet></Outlet>
    </>
}