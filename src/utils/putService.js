import axios from "axios";

let url = `https://localhost:7261/api/`;

export const UpdateCreditPointCustomer = async (CreditPoint) => {
    await axios.put(`${url}CreditPointCustomer/UpdateCreditPointCustomer`, CreditPoint)
}

export const updateCustomer = async (customer) => {
    await axios.put(`${url}Customer/UpdateCustomer`, customer)
}

export const updateFlight = async (flight) => {
    await axios.put(`${url}Flight/UpDateFlight`, flight)
  }
  