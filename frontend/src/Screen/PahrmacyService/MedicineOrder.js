import { Component } from "react";
import { Button, Form, Dropdown, Container, Col, ButtonGroup, Row } from "react-bootstrap";
import "./MedicineOrder.css";
import axios from "axios";
import decode from "jwt-decode";

class MedicineOrder extends Component {

    state = {
        name: '',
        age: '',
        email: '',
        gender: 'Select One',
        address: '',
        allergies: '',
        currentlyTakingMedications: '',
        existingMedicalProblems: '',
        userId: '',
        signature:''
      }

      componentDidMount = async () => {
    
        if (localStorage.getItem("authToken")) {
          const hasToken = localStorage.getItem("authToken");
          const id = decode(hasToken).id;
          await this.setState({ userId: id });
          console.log(this.state.userId);
          console.log(localStorage.getItem("authToken"));
        }
      }

      handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(value)
      }
    
      handleSelect = (e) => {
        this.setState({ gender: e });
        console.log(e);
      }

      emptyFields = () => {
        this.setState({ name: '' })
        this.setState({ age: '' })
        this.setState({ email: '' })
        this.setState({ gender: '' })
        this.setState({ address: '' })
        this.setState({ allergies: '' })
        this.setState({ currentlyTakingMedications: '' })
        this.setState({ existingMedicalProblems: '' })
        this.setState({ signature: '' })
      }

      handleSubmit = (e) => {
    
        e.preventDefault();
       
        const order = {
          name: this.state.name,
          age: this.state.age,
          email: this.state.email,
          gender: this.state.gender,  
          address: this.state.address,  
          allergies: this.state.allergies,  
          currentlyTakingMedications: this.state.currentlyTakingMedications,  
          existingMedicalProblems: this.state.existingMedicalProblems,  
          signature: this.state.signature  
        }
    
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          }
        }
        console.log(this.state.userId)

        // add order
    axios.post(`http://localhost:6500/codebusters/api/patientpvt/ordermedicine/order/save/${this.state.userId}`, order, config).then(res => {
        if (res.data.success) {
          alert("Successfully Appointment Inserted");
          //window.location.reload(false);
         // window.location=`/profile/patient/myAppointments`;
        } else {
          alert(res.data.message);
        }
      })
    }
    render() {
        return (
            <div className="home">
                <h3 className="medicineOrder-top-title " textAlign="center" style={{ marginLeft: "30%", marginTop: "35px" }}>Medicine Order Form</h3>
                <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }}>
                    <Container>
                        <Form style={{ marginLeft: "40%" }}>
                            <div className="medicineOrder-form-body">
                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicName">
                                    <Form.Label style={{ marginTop: "20px", font:" bold 20px/20px Times New Roman,serif" }}>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter full name" name="name"  style={{ maxHeight: "100%", marginTop: "10px" }} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicAge">
                                    <Form.Label style={{ marginTop: "8px", font:" bold 20px/20px Times New Roman,serif" }}>Age</Form.Label>
                                    <Form.Control type="number" placeholder="Enter your age" name="age"  style={{ maxHeight: "100%", marginTop: "10px" }} onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicEmail">
                                    <Form.Label style={{ marginTop: "8px", font:" bold 20px/20px Times New Roman,serif" }}>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" name="email"  style={{ maxHeight: "100%", marginTop: "10px" }} onChange={this.handleChange}/>
                                </Form.Group>

                                <Dropdown as={Col} md={10} onSelect={this.handleSelect}>
                                    <Form.Label style={{ marginTop: "8px", font:" bold 20px/20px Times New Roman,serif" }}> Gender</Form.Label>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: "100%", maxHeight: "100%", marginTop: "8px" }}>
                                    {this.state.gender}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ width: "100%" }}>
                                        <Dropdown.Item eventKey="Female">Female</Dropdown.Item>
                                        <Dropdown.Item eventKey="Male">Male</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicAddress">
                                    <Form.Label style={{ marginTop: "10px", font:" bold 20px/20px Times New Roman,serif" }}>Address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your address" name="address" style={{ maxHeight: "100%", marginTop: "8px" }} onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicEmail">
                                    <Form.Label style={{ marginTop: "8px", font:" bold 20px/20px Times New Roman,serif" }}>Do you have any allergies ? </Form.Label>
                                    <Form.Control as="textarea" name="allergies" rows={3} style={{ marginTop: "10px" }} onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" height="30%">
                                    <Form.Label style={{ marginTop: "20px" , font:" bold 20px/20px Times New Roman,serif"}}>Are you currently tajing any medications ? </Form.Label>
                                    <Form.Control as="textarea" rows={3} name="currentlyTakingMedications" style={{ marginTop: "10px" }} onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" height="30%">
                                    <Form.Label style={{ marginTop: "20px" , font:" bold 20px/20px Times New Roman,serif" }}>Existing Medical Problems / Conditions</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="existingMedicalProblems" style={{ marginTop: "10px" }} onChange={this.handleChange}/>
                                </Form.Group>

                                <Form.Group className="mb-3"  controlId="formFile" height="30%">
                                    <Form.Label style={{ marginTop: "20px" , font:" bold 20px/20px Times New Roman,serif"}}>Medicine List</Form.Label>
                                    <Form.Control type="file" style={{ marginLeft: "10%" }}  />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" height="30%">
                                    <Form.Label style={{ marginTop: "20px" , font:" bold 20px/20px Times New Roman,serif"}}>Signature</Form.Label>
                                    <Form.Control as="textarea"  name="signature" style={{ marginTop: "10px" }} onChange={this.handleChange}/>
                                </Form.Group>

                                <Row>
                                    <Col>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="primary" type="submit" style={{ marginTop: "20px", width: "200%" }} onClick={this.handleSubmit}>
                                                Order Medicine
                                            </Button>
                                            <Col>
                                                <Button variant="warning" type="reset" style={{ marginTop: "20px", marginLeft: "80%", width: "200%" }} onClick={this.emptyFields}>
                                                    Reset
                                                </Button>
                                            </Col>
                                        </ButtonGroup>
                                    </Col>
                                </Row>

                            </div>
                        </Form>
                    </Container>
                </div>
            </div>


        )
    }
}

export default MedicineOrder;
