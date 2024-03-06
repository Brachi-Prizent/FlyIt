import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

function Main() {

    return (
        <>
            <ButtonGroup orientation="vertical" variant="outlined" aria-label="outlined button group">
                <Button> <Link className="link" to={""}>Home </Link></Button>
                <div class="dropdown">
                    <Button className="link">About</Button>
                    <div class="dropdown-content">
                        <a><Link className="link" to={"/About"}> customer</Link></a>
                        <a><Link className="link" to={"/AboutCompany"}> company</Link></a>
                    </div>
                </div>
                <Button> <Link className="link" to={"/LogIn"}>LogIn </Link> </Button>
                <Button> <Link className="link" to={"/References"}>References</Link></Button>
                <Button> <Link className="link" to={"/Blog"}>Blog</Link></Button>
                <Button> <Link className="link" to={"/Invitation"}>Invitation </Link></Button>
                <Button> <Link className="link" to={"/Flights"}>Flights</Link></Button>
            </ButtonGroup>

            {/* <div class="w3-container">
                <h2>Tabs in a Grid</h2>

                <div class="w3-row">
                    <a href="javascript:void(0)" onclick="openCity(event, 'London');">
                        <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">London</div>
                    </a>
                    <a href="javascript:void(0)" onclick="openCity(event, 'Paris');">
                        <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">Paris</div>
                    </a>
                    <a href="javascript:void(0)" onclick="openCity(event, 'Tokyo');">
                        <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding">Tokyo</div>
                    </a>
                </div>
            </div> */}
        </>
    );
}

export default Main;
