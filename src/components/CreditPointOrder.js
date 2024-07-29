
// export const CreditPointOrder = () => {
  
//     const [currentCreditPoint, setCurrentCreditPoint] = useState({ idCreditPoint: 0, idCustomer: userData.idCustomer, nameCompany: "", creditPoint: 0 })
//     const [companyCreditPoints, setCompanyCreditPoints] = useState({ creditPoint: 0 });
//     const [selectedCreditPoint, setSelectedCreditPoint] = useState(0);
//     const [isShowOrder, setIsShowOrder] = useState(false);

//     const fl = async (f) => {
//         debugger
//         const c = await getCreditPointByIdCustomerAndNameCompany(userData.idCustomer, f.nameCompany)
//         setCompanyCreditPoints(c[0]);
//         var f = flightList.find(x => x.idFlight == f.idFlight);
//         setMyOrder({ ...myOrder, idFlight: f.idFlight });
//         //var flt = await getFlightsByIdCompany(idFlight);
//         setCurrentFlight(f);
//         setCurrentCreditPoint({ ...currentCreditPoint, nameCompany: f.nameCompany })
//     }

//     const toOrder = async () => {
//         debugger
//         //setIsShowOrder(true)
//         //setSelectedCreditPoint(companyCreditPoints?.creditPoint / 2)
//         const comp = await getCompanyByName(currentFlight.nameCompany);
//         setPointPrice(comp[0].pointPrice);
//         //////////////////////setCompanyCreditPoints(comp[0].creditPoint);
//         //setCurrentCreditPoint({ ...currentCreditPoint, creditPoint: companyCreditPoints?.creditPoint + (myOrder.numOfAdultPlace + myOrder.numOfChildPlace) * currentFlight.timeFlight })
//         setIsShowOrder(false)
//         setCurrentCreditPoint({ ...currentCreditPoint, creditPoint: companyCreditPoints?.creditPoint - selectedCreditPoint + (myOrder.numOfAdultPlace + myOrder.numOfChildPlace) * currentFlight.timeFlight })

//         if (JSON.stringify(userData) == "{}") {
//             dispatch(setCurrentOrder(myOrder))
//             navigate('/LogIn');
//         }
//         else {
//             await createOrder(myOrder);
//         }
//         navigate('/');
//     }

//     const updateCreditPoint = async () => {
//         debugger
//         //const currentCreditPoint = { idCreditPoint: 0, idCustomer: userData.idCustomer, nameCompany: "", creditPoint: 0 }

//         if (companyCreditPoints == undefined) {
//             await createCreditPointCustomer(currentCreditPoint);
//         }
//         else {
//             await UpdateCreditPointCustomer(currentCreditPoint);
//         }
//     }
//     useEffect(() => {
//         debugger
//         if (currentFlight?.idFlight) {
//             updateCreditPoint();
//         }
//     }, [currentCreditPoint?.creditPoint])
//     return (<><p>CreditPointOrder</p>
      
//       <Dialog open={isShowOrder} onClose={() => {
//             toOrder()

//         }} aria-describedby='alert-dialog-slide-description'><div style={{ textAlign: 'center' }}>
//                 <h3>do you have {companyCreditPoints?.creditPoint} Credit points </h3>
//                 <p>how many CreditPoints do you want to use?</p>
//                 <input type="range" value={selectedCreditPoint} min="0" max={companyCreditPoints?.creditPoint} onChange={(e) => setSelectedCreditPoint(parseInt(e.target.value))} />
//                 <div>{selectedCreditPoint}</div>
//             </div></Dialog>
  
//     </>)
//   }