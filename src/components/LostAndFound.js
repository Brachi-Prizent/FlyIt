import { useEffect, useState } from "react";
import { getLostAndFound } from "../utils/get";
import './Home.css'
import './LostAndFound.css'
import { Search } from "@mui/icons-material";
export const LostAndFound = () => {

    const [lostAndFound, setLostAndFound] = useState([]);

    const bringLostAndFound = async () => {
        setLostAndFound(await getLostAndFound());
    }


    function myFunction() {
        debugger
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        // filter = e.toUpperCase();
        table = document.getElementById("losts");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    useEffect(() => {
        bringLostAndFound();
    }, [])

    return (<>

        <div className="laf">

            <input type="text" id="myInput" onKeyUp={() => myFunction()} placeholder="Search for names.." title="Type in a name" />

            <table id="losts">
                <tr>
                    <th>product</th>
                    <th>dateFlight</th>
                    <th>namePlace</th>
                    <th>nameCompany</th>
                </tr>
                {
                    lostAndFound && lostAndFound.length > 0 && lostAndFound.map(p =>
                        <tr>
                            <td>{p.product}</td>
                            <td>{new Date(p.dateFlight).toLocaleDateString()}</td>
                            <td>{p.namePlace}</td>
                            <td>{p.nameCompany}</td>
                        </tr>
                    )
                }
            </table>
        </div>
    </>)
}