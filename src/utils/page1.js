import axios from "axios";

    let url = `https://localhost:7261/api/`;

    export  const getAllFlights = async () => {
        let res = await axios.get(`${url}Flight/GetAllFlights`)
        if (res) {
            console.log(res)
          return res.data;
        }
    }

    export  const getOrdersById = async (id) => {
        let res = await axios.get(`${url}Customer/GetOrdersByIdCustomer/${id}`)
        if (res) {
            console.log(res)
          return res.data;
        }
    }

    export  const getPlace = async () => {
        let res = await axios.get(`${url}Place/GetAllPlaces`)
        if (res) {
            console.log(res)
          return res.data;
        }
    }
    export  const getAllCompanies = async () => {
      let res = await axios.get(`${url}Company/GetAllCompanies`)
      if (res) {
          console.log(res)
        return res.data;
      }
    }
    export  const updateFlight = async (flight) => {
       await axios.put(`${url}Flight/UpDateFlight`,flight)
    }
    export  const addFlight = async (flight) => {
      await axios.post(`${url}Flight/AddFlight`,flight)
    }
    export  const deleteFlight = async (id) => {
       await axios.delete(`${url}Flight/DeleteFlight/${id}`)
    }
    export  const getFlights = async () => {
      let res = await axios.get(`${url}Flight/GetFlights`)
      if (res) {
          console.log(res)
        return res.data;
      }
    }
    export  const createNewCustomer = async (customer) => {
      await axios.post(`${url}Customer/AddCustomer`, customer)
    }
    export  const createOrder = async (order) => {
      await axios.post(`${url}Order/UpDateOrder`, order)
    }
    export  const getFlightsByIdComany = async (id) => {
      let res = await axios.get(`${url}Company/GetAllFlightsCompany/${id}`)
      if (res) {
          console.log(res)
        return res.data;
      }
    }
    export  const getCustomerById = async (id) => {
      let res = await axios.get(`${url}Customer/GetCustomer/${id}`)
      if (res) {
          console.log(res)
        return res.data;
      }
    }
    export  const GetStationByIdFlight = async (id) => {
      let res = await axios.get(`${url}Station/GetStationByIdFlight/${id}`)
      if (res) {
          console.log(res)
        return res.data;
      }
    }
    export  const GetCompanyById = async (id) => {
      let res = await axios.get(`${url}Company/GetCompanyById/${id}`)
      if (res) {
          console.log(res)
        return res.data;
      }
    }
    export  const getFlightsByNamePlace = async (name) => {
      let res = await axios.get(`${url}Flight/GetFlightByNamePlace/${name}`)
      if (res) {
          console.log(res)
        return res.data;
      }
    }
       