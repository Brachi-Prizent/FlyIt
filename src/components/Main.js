import { DetailsSharp, Login, Logout, Mail, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import './Main.css'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { resetCurrentOrder, resetCurrentUser } from "../redux/userSlice";
function Main() {

    const [currentButton, setCurrentButton] = useState(5);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.CurrentUser);
    return (
        <>
            <div className="main">
                <br/><br/>
                <div style={{color: currentButton == 1 && "#67c6b8" }}><Mail /><Link className="link" onClick={() => setCurrentButton(1)}  style={{color: currentButton == 1 && "#67c6b8" }} to={"/Order"}>Order</Link></div>
                <br/><br/>
                <div class="dropdown">
                    <div className="link" style={{color: currentButton == 4 && "#67c6b8" }}><Person/> About</div>
                    <div class="dropdown-content">
                        <a><Link onClick={() => setCurrentButton(4)} className="link" to={"/About"}> customer</Link></a>
                        <a><Link onClick={() => setCurrentButton(4)} className="link" to={"/AboutCompany"}> company</Link></a>
                    </div>
                </div>
                <br/><br/>
                <div style={{color: currentButton == 2 && "#67c6b8" }}><DetailsSharp></DetailsSharp><Link  onClick={() => setCurrentButton(2)} style={{color: currentButton == 2 && "#67c6b8" }} className="link" to={"/LostAndFound"}>LostAndFound</Link></div>
                <br/><br/>
                {JSON.stringify(userData) == "{}" && <div style={{color: currentButton == 3 && "#67c6b8" }}><Login></Login><Link onClick={() => setCurrentButton(3)} style={{color: currentButton == 3 && "#67c6b8" }} className="link" to={"/LogIn"}>LogIn </Link> </div>}
                {JSON.stringify(userData) != "{}" && <div style={{color: currentButton == 3 && "#67c6b8" }}><Logout></Logout><Link onClick={() => {
                    dispatch(resetCurrentUser())
                    dispatch(resetCurrentOrder())
                    setCurrentButton(3)}} style={{color: currentButton == 3 && "#67c6b8" }} className="link" to={"/"}>LogOut </Link> </div>}
                <br/><br/>
                <div><Link onClick={() => setCurrentButton(5)} style={{color: currentButton == 5 && "#67c6b8" }} to={"/"}><img style={{border: "none", width: "12vw", height: "17vh", marginTop: "40vh", marginLeft: "-14px" }} src="img/light.png"></img></Link></div>
            </div>
        </>
    );
}

export default Main;
