import { DesktopMac, Flight, FlightTakeoffTwoTone, Home, Login } from "@mui/icons-material";
import { Link } from "react-router-dom";
import './Main.css'
import { useSelector } from "react-redux";
function Main() {

    const userData = useSelector((state) => state.user.CurrentUser);
    return (
        <>
            <div className="main">
                <br/><br/>
                <div><Home /><Link className="link" to={""}>Home</Link></div>
                <br/><br/>
                <div class="dropdown">
                    <div className="link"><DesktopMac />About</div>
                    <div class="dropdown-content">
                        <a><Link className="link" to={"/About"}> customer</Link></a>
                        <a><Link className="link" to={"/AboutCompany"}> company</Link></a>
                    </div>
                </div>
                <br/><br/>
                <div><Flight /><Link className="link" to={"/References"}>References</Link></div>
                <br/><br/>
                <div><Link className="link" to={"/Blog"}>Blog</Link></div>
                <br/><br/>
                <div><Link className="link" to={"/LostAndFound"}>LostAndFound</Link></div>
                <br/><br/>
                {JSON.stringify(userData) == "{}" && <div><Login></Login><Link className="link" to={"/LogIn"}>LogIn </Link> </div>}
                <br/><br/>
                <div><Link className="link" to={"/AboutMyWebsite"}><FlightTakeoffTwoTone sx={{ fontSize: "25vh", marginTop: "30vh", marginLeft: "-30px" }}></FlightTakeoffTwoTone></Link></div>
            </div>
        </>
    );
}

export default Main;
