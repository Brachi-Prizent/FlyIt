import axios from "axios";

let url = `https://localhost:7261/api/`;

export const deleteOrder = async (id) => {
    let res = await axios.delete(`${url}Order/DeleteOrder/${id}`)
    if (res) {
      console.log(res)
      return res.data;
    }
  }

  export const deleteFlight = async (id) => {
    let res = await axios.delete(`${url}Flight/DeleteFlight/${id}`)
    if (res) {
      console.log(res)
      return res.data;
    }
  }
  export const deleteCreditPointCustomer = async (item) => {
    await axios.delete(`${url}CreditPointCustomer/DeleteCreditPointCustomer/${item}`)
  }