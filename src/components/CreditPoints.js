import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getAllCreditPointsByIdCustomer } from "../utils/get";
import './CreditPoint.css'
import { Chip } from "@mui/material";

export const CreditPoints = () => {

    const userData = useSelector((state) => state.user.CurrentUser)
    const [myCreditPoints, setMyCreditPoints] = useState([]);

    const bringCreditPoints = async () => {
        debugger
        const c = await getAllCreditPointsByIdCustomer(userData.idCustomer)
        setMyCreditPoints(c);
    }

    useEffect(() => {
        bringCreditPoints();
    }, [])

    return (<>
        <div className="cim">
            <div className="cardim">
                {myCreditPoints && myCreditPoints.length > 0 && myCreditPoints.map((x) => <Chip sx={{ height: "15vh", width: "17vw", margin: "2%", border: "2px solid #00559b" }}
                    label={<div>
                        <h2>
                            <label style={{ fontSize: "25px", color: "#00559b" }}>company: </label>
                            <label style={{ color: "#00559b" }}>{x.nameCompany}</label>
                        </h2>
                        <h2>
                            <label style={{ fontWeight: "10000", fontSize: "25px", color: "#00559b" }}>creditPoints: </label>
                            <label style={{ color: "#00559b" }}>{x.creditPoint}</label>
                        </h2>
                    </div>
                    }>
                </Chip>)}
            </div>
        </div>
        {myCreditPoints.length == 0 && <h1 className="not">you don't have creditPoints</h1>}
    </>)

}