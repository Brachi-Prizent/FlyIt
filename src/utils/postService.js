import axios from "axios";

let url = `https://localhost:7261/api/`;

export const createFlight = async (flight) => {
    debugger
    let res = await axios.post(`${url}Flight/AddFlight`, flight)
    if (res) {
        console.log(res)
        return res.data;
      }  
}
export const createNewCustomer = async (customer) => {
    await axios.post(`${url}Customer/AddCustomer`, customer)
}
export const createOrder = async (order) => {
    await axios.post(`${url}Order/AddOrder`, order)
}
export const createCreditPointCustomer = async (CreditPoint) => {
    await axios.post(`${url}CreditPointCustomer/AddCreditPointCustomer`, CreditPoint)
}
export const createStation = async (station) => {
    debugger
    await axios.post(`${url}Station/AddStation`, station)
}