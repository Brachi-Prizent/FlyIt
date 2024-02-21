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
        let res = await axios.get(`${url}Order/Get/${id}`)
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
    export  const getCompany = async () => {
      let res = await axios.get(`${url}Company/GetCompany`)
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

    // export const addData = async (object) => {
    //   // const { name, password, mail }
    //   fetch(`${serviceURL}/users/register`, object)
    //       // במקרה של הצלחה
    //       .then((response) =>
    //           response.json()
    //       )
    //       .then((data) => {
    //           console.log(data)
    //           // setData(data)
    //           // בנקודת הנחה שכל האובייקטים במבנה זהה
    //           // יצירת מערך עם כל הכותרות
    //           // data && data?.length > 0 && setKeys(Object.keys(data[0]))
    //       })
    //       // במקרה של כשלון
    //       .catch((e) => console.log(e))
    //   // בכל מקרה
    //   // .finally((e) => console.log(e))
    // }     