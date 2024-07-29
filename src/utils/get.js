import axios from "axios";

let url = `https://localhost:7261/api/`;

export const getAllFlights = async () => {
  let res = await axios.get(`${url}Flight/GetAllFlights`)
  if (res) {
    console.log(res)
    return res.data;
  }
}

export const getOrdersById = async (id) => {
  let res = await axios.get(`${url}Customer/GetOrdersByIdCustomer/${id}`)
  if (res) {
    console.log(res)
    return res.data;
  }
}

export const getCreditPointByIdCustomerAndNameCompany = async (idCustomer, nameCompany) => {
  let res = await axios.get(`${url}CreditPointCustomer/GetCreditPointCustomerByIdCustomerAndIdCompany/${idCustomer}/${nameCompany}`)
  if (res) {
    console.log(res)
    return res.data;
  }
}

export const getAllCreditPointsByIdCustomer = async (idCustomer) => {
  let res = await axios.get(`${url}CreditPointCustomer/GetAllCreditPointsByIdCustomer/${idCustomer}`)
  if (res) {
    console.log(res)
    return res.data;
  }
}

export const getPlaces = async () => {
  let res = await axios.get(`${url}Place/GetAllPlaces`)
  if (res) {
    console.log(res)
    return res.data;
  }
}

export const getAllCompanies = async () => {
  let res = await axios.get(`${url}Company/GetAllCompanies`)
  if (res) {
    console.log(res)
    return res.data;
  }
}

export const getFlightsByIdCompany = async (id) => {
  let res = await axios.get(`${url}Company/GetAllFlightsCompany/${id}`)
  if (res) {
    console.log(res)
    return res.data;
  }
}

export const getCustomerById = async (id) => {
  let res = await axios.get(`${url}Customer/GetCustomer/${id}`)
  if (res) {
    console.log(res)
    return res.data;
  }
}

export const getCompanyById = async (id) => {
  let res = await axios.get(`${url}Company/GetCompanyById/${id}`)
  if (res) {
    console.log(res)
    return res.data;
  }
}

export const getCompanyByName = async (name) => {
  let res = await axios.get(`${url}Company/GetCompanyByName/${name}`)
  if (res) {
    console.log(res)
    return res.data;
  }
}

export const getFlightsByNamePlace = async (name) => {
  let res = await axios.get(`${url}Flight/GetFlightByNamePlace/${name}`)
  if (res) {
    console.log(res)
    return res.data;
  }
}

export const getFlights = async () => {
  let res = await axios.get(`${url}Flight/GetFlights`)
  if (res) {
    console.log(res)
    return res.data;
  }
}

export const getFlightsByIdFlight = async (id) => {
  let res = await axios.get(`${url}Flight/GetFlightByIdFlight/${id}`)
  if (res) {
    console.log(res)
    return res.data;
  }
}
export const getLostAndFound = async () => {
  let res = await axios.get(`${url}LostAndFound/GetLostAndFound`)
  if (res) {
    console.log(res)
    return res.data;
  }
}