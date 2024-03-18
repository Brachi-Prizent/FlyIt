import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Blog from "./components/Blog";
import { References } from "./components/References";
import { About } from "./components/About";
import { AddFlight } from "./components/Flights/AddFlight";
import { Invitation } from "./components/Invitation";
import { UpdateFlight } from "./components/Flights/UpdateFlight";
import { Flights } from "./components/Flights/Flights";
import { LogIn } from "./components/LogIn";
//import { Home } from "@mui/icons-material";
import { Home } from "./components/Home";
import { LogInCompany } from "./components/LogIncompany";
import { AboutCompany } from "./components/AboutCompany";
import { AboutMyWebsite } from "./components/AboutMyWebsite";
import { LostAndFound } from "./components/LostAndFound";

function App() {

  return (
    <>
      <div style={{display:"flex", flexDirection:"row"}}>
      <BrowserRouter>
        <Main />
        <Routes>
          <Route path="" element={<Home/>}></Route>
          <Route path="LogIn" element={<LogIn />}></Route>
          <Route path="AboutCompany" element={<AboutCompany />}></Route>
          <Route path="Blog" element={<Blog />}></Route>
          <Route path="References" element={<References />}></Route>
          <Route path="About" element={<About />}></Route>
          <Route path="Flights" element={<Flights />}></Route>
          <Route path="Flights/UpdateFlight/:id" element={<UpdateFlight />}></Route>
          <Route path="Flights/AddFlight" element={<AddFlight />}></Route>
          <Route path="Invitation/:namePlace" element={<Invitation />}></Route>
          <Route path="AboutMyWebsite" element={<AboutMyWebsite />}></Route>
          <Route path="LostAndFound" element={<LostAndFound />}></Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
