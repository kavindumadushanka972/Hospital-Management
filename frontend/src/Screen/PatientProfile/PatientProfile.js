import React from "react";
import DoctorAppointment from "../DoctorAppointment/DoctorAppointment";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import MedicineOrder from "../PahrmacyService/MedicineOrder";
import MyAppointments from "../DoctorAppointment/MyAppointments";
import SearchDoctors from "../SearchDoctor/SearchDoctors";
import MyMedicineOrders from "../PahrmacyService/MyMedicineOrders";

const Patient = () => {

  const [key, setKey] = useState('home');

  return (
    //style={{display: "flex",justifyContent: "center",alignItems: "center"}} 
    <div style={{ marginTop: "50px", marginBottom: "50px", marginLeft: "5%", marginRight: "5%", paddingTop: "5vh", paddingBottom: "5vh" }}   >
   
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-10"
        style={{ textAlign: "center", marginLeft: "30%", paddingBottom: "3vh", fontSize: "1rem" }}
      >


        
        <Tab eventKey="searchDoctors" title="Search for Doctors">
        <Container>
            <Row>
              <Col span={14}>
                <SearchDoctors />
              </Col>
            </Row>
          </Container>
        </Tab>

        <Tab eventKey="doctorAppointment" title="Doctor Appointment">
          <Container>
            <Row>
              <Col span={14}>
                <DoctorAppointment />
              </Col>
            </Row>
          </Container>
        </Tab>

        <Tab eventKey="myAppointments" title="My Appointments">
          <Container>
            <Row>
              <Col span={14}>
                <MyAppointments />
              </Col>
            </Row>
          </Container>
        </Tab>

        <Tab eventKey="pharmacyService" title="Pharmacy Service" >
          <Container>
            <Row>
              <Col span={14}>
                <MedicineOrder />
              </Col>
            </Row>
          </Container>
        </Tab>

        <Tab eventKey="pharmacyOrder" title="My Medicine Orders" >
          <Container>
            <Row>
              <Col span={14}>
                <MyMedicineOrders />
              </Col>
            </Row>
          </Container>
        </Tab>
      

      
      </Tabs>

      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRclWhY1hKnF3-pK9ZyaPxViO_52BziVmyzurN45QzfOGiHumHEY0hs2eZGyqRHfl0Vpe0&usqp=CAU" className="ml-auto mr-auto" style={{width: '400px', marginTop: '25px'}}></img>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREtfQgvIyy-aeF-8a7gAYOI8K7-L4pbRhEmdFsX2zTecC5LQher9XspcfeFGOJ2j6C46M&usqp=CAU" className="ml-auto mr-auto" style={{width: '400px', marginTop: '25px'}}></img>
      <img src="https://previews.123rf.com/images/bytedust/bytedust1210/bytedust121000009/15861423-child-discharged-from-hospital-and-going-home.jpg" className="ml-auto mr-auto" style={{width: '400px', marginTop: '25px'}}></img>

    </div>
  
  );
}


export default Patient;