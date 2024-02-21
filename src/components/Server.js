import axios from "axios";
import { useEffect, useState } from "react"


export const  Server = () =>{
    const[data,setData] = useState();
    let url = `https://localhost:7261/api/`;

    const get = async () =>{
    let res = await axios.get(`${url}Flight/GetAll`)
        if(res){
            console.log(res)
            setData(res.data)
        }
    }
    useEffect(() => {
        get();
    },[data])  

    return <>Server
    {
        data&& data.length >0 && data.map(p =><div>{p.idFlight}</div>)
    }
    </>
}