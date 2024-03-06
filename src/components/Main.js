import { DesktopMac, Flight, FlightClass, FlightClassOutlined, FlightLand, FlightTakeoffOutlined, FlightTakeoffRounded, FlightTakeoffSharp, FlightTakeoffTwoTone, Home, Login } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { References } from "./References";
// import '../App.css'
import './Main.css'
import { About } from "./About";
function Main() {

    return (
        <>
            <div className="main">
                <br /><br />
                <div><Home /><Link className="link" to={""}>Home</Link></div>
                <br /><br />
                <div class="dropdown">
                    <div className="link"><DesktopMac />About</div>
                    <div class="dropdown-content">
                        <a><Link className="link" to={"/About"}> customer</Link></a>
                        <a><Link className="link" to={"/AboutCompany"}> company</Link></a>
                    </div>
                </div>
                <br /><br />
                <div><Login></Login><Link className="link" to={"/LogIn"}>LogIn </Link> </div>
                <br /><br />
                <div><Flight /><Link className="link" to={"/References"}>References</Link></div>
                <br /><br />
                <div> <Link className="link" to={"/Blog"}>Blog</Link></div>
                {/* <div> <Link className="link" to={"/Invitation"}>Invitation </Link></div> */}
                {/* <div> <Link className="link" to={"/Flights"}>Flights</Link></div> */}
                <div><Link className="link" to={"/AboutMyWebsite"}><FlightTakeoffTwoTone sx={{ fontSize: "25vh", marginTop: "30vh", marginRight: "89vw" }}></FlightTakeoffTwoTone></Link></div>
                {/* <div class="tooltip"><FlightTakeoffTwoTone sx={{ fontSize: "25vh", marginTop: "30vh", marginRight: "89vw" }}></FlightTakeoffTwoTone>
                    <span class="tooltiptext">Tooltip text</span>
                </div> */}

            </div>
        </>
    );
}

export default Main;
