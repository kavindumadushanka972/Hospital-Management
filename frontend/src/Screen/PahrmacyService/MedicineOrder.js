import { Component } from "react";
import { Button, Form, Dropdown, Container, Col, ButtonGroup, Row } from "react-bootstrap";
import "./MedicineOrder.css";
import axios from "axios";
import decode from "jwt-decode";
import loading from '../../assests/loading.gif'
import validator from 'validator'

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
        signature:'',
        photo: '',
        emailError: ''
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

      validateEmail = (e) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });

        var email = e.target.value
      
        if (validator.isEmail(email)) {
          this.setState({ emailError: '' });
        } else {
          this.setState({ emailError: 'Enter valid email' });
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

      handleUpload = async e => {
        e.preventDefault()
        try{
          
          const file = e.target.files[0]
          if(!file) return alert("File not exists")
    
          if(file.size > 1024 * 1024) // 1mb
              return alert("Size too large!")
    
          if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
              return alert("File format is incorrect.")
    
          let formData = new FormData()
          formData.append('file', file)
          this.setState({ photo: loading})
          const res = await axios.post('http://localhost:6500/patient/upload', formData, {
            headers: {'content-type': 'multipart/form-data'}
          })
          console.log(res.data)
          this.setState({ photo: res.data.url})
    
        } catch (err){
          alert(err.response.data.msg)
        }
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
        this.setState({ photo: '' })
      }

      handleSubmit = (e) => {
    
        e.preventDefault();

        if(this.state.name != '' && this.state.age != '' && this.state.email != '' && this.state.gender != 'Select One' && this.state.photo != ''){
          const order = {
            name: this.state.name,
            age: this.state.age,
            email: this.state.email,
            gender: this.state.gender,  
            address: this.state.address,  
            allergies: this.state.allergies,  
            currentlyTakingMedications: this.state.currentlyTakingMedications,  
            existingMedicalProblems: this.state.existingMedicalProblems,  
            signature: this.state.signature,
            photo: this.state.photo
          }
      
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
          }
          console.log(this.state.userId)
  
          // add order
          try {
              axios.post(`http://localhost:6500/patient/medicineOrder/${this.state.userId}`, order).then(res => {
            if (res.data.success) {
              alert("Successfully Appointment Inserted");
              window.location=`/profile/patient/myPharmacyOrders`;
            } else {
              alert(res.data.message);
            }
          })
          } catch (error) {
            alert(res.data.message);
          }
        } else {
          alert("Please check whether you entered information correctly")
        }
       
        
        
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
                                    <Form.Control type="email" placeholder="Enter your email" name="email"  style={{ maxHeight: "100%", marginTop: "10px" }} onChange={this.validateEmail}/>
                                    <span style={{
                                      fontWeight: 'bold',
                                      color: 'red',
                                    }}>{this.state.emailError}</span>
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
                                    <Col sm={3}>
                                      <img src={this.state.photo} style={{width: "200px"}}></img>
                                    </Col>
                                <span>
                                <input type="file" name="file" id="file_up"
                                accept="image/*" onChange={this.handleUpload} />
                                </span>
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
