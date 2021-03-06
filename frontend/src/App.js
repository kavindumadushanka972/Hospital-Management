import React from "react";
import { BrowserRouter as BRouter, Switch, Route } from "react-router-dom";
import RegistrationScreen from "./Screen/RegistrationScreen";
import Home from "./Screen/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Doctor from "./Screen/Doctor";
import Patient from "./Screen/Patient";
import Labchemist from "./Screen/Labchemist";
import Pharmasist from "./Screen/Pharmasist";
import AdministrationLoginScreen from "./Screen/AdministrationLoginScreen";
import Admin from "./Screen/Admin";
import Report from "./Components/Report";
import Homescreenmanagement from "./Screen/Homescreenmanagement";
import Paymentmanagement from "./Screen/Paymentmanagement";
import PatientProfile from "./Screen/PatientProfile/PatientProfile";
import MyAppointments from "./Screen/DoctorAppointment/MyAppointments";
import MyMedicineOrders from "./Screen/PahrmacyService/MyMedicineOrders";

const App = () => {
  return (
    <BRouter>
      <main className="page-body-content">
      
      
      <Header/>
        <Switch>
          <Route exact path="/admin" component={AdministrationLoginScreen} />
        </Switch>
   
        <Switch>
          <Route exact path="/profile/admin" component={Admin} />
        </Switch>
        <Switch>
          <Route exact path="/registration" component={RegistrationScreen} />
        </Switch>
        <Switch>
          <Route exact path="/report" component={Report} />
        </Switch>
      
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <Switch>
          <Route exact path="/profile/doctor" component={Doctor} />
        </Switch>
        <Switch>
          <Route exact path="/profile/patient" component={Patient} />
        </Switch>

        <Switch>
          <Route exact path="/profile/patient/getServices" component={PatientProfile} />
        </Switch>

        <Switch>
          <Route exact path="/profile/patient/myAppointments" component={MyAppointments} />
        </Switch>
        <Switch>
          <Route exact path="/profile/patient/myPharmacyOrders" component={MyMedicineOrders} />
        </Switch>
        <Switch>
          <Route exact path="/profile/labchemist" component={Labchemist} />
        </Switch>
        <Switch>
          <Route exact path="/profile/pharmasist" component={Pharmasist} />
        </Switch>
        <Switch>
          <Route exact path="/admin/homescreenmanagement" component={Homescreenmanagement} />
        </Switch>
        <Switch>
          <Route exact path="/admin/paymentmanagement" component={Paymentmanagement} />
        </Switch>
     <Footer/>

     
      </main>
      </BRouter>
      
 
      
     
  );
};

export default App;





