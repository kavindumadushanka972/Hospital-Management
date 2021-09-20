import { Component } from "react";
import { Button, Form, Dropdown, Col, Modal, Table, Row } from "react-bootstrap";
import axios from "axios";
import decode from "jwt-decode";
import "../DoctorAppointment/MyAppointment.css"
import loading from '../../assests/loading.gif'
import validator from 'validator'


class MyMedicineOrders extends Component {
    
    state = {
        id: '',
        Modal: false,
        name: '',
        age: '',
        email: '',
        gender: 'Select One',
        address: '',
        allergies: '',
        currentlyTakingMedications: '',
        existingMedicalProblems: '',
        signature:'',
        selectedOrder: '',
        orders: [],
        photo: '',
        emailError: ''
    };

    componentDidMount = async () => {

        if (localStorage.getItem("authToken")) {
            const hasToken = await localStorage.getItem("authToken");
            const id = decode(hasToken).id;
            this.setState({ userId: id });
            console.log(this.state.userId);
            console.log(localStorage.getItem("authToken"));
        }

        //get orders
        axios.get(`http://localhost:6500/patient/getmyorders/${this.state.userId}`).then(res => {
            
            if (res.data.success) {
                this.setState({
                    orders: res.data.orders
                });
                console.log(this.state.orders);
            }
        })
    }

    validateEmail = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });

        var email = e.target.value
      
        if (validator.isEmail(email)) {
          this.setState({ emailError: '' });
        } else {
          this.setState({ emailError: 'Enter valid email' });
        }
    }
    

    openModal = async (order) => {
        
        this.setState({name:order.name})
        this.setState({id:order._id})
        this.setState({age:order.age})
        this.setState({email:order.email})
        this.setState({gender:order.gender})
        this.setState({address:order.address})
        this.setState({allergies:order.allergies})
        this.setState({currentlyTakingMedications:order.currentlyTakingMedications})
        this.setState({existingMedicalProblems:order.existingMedicalProblems})
        this.setState({signature:order.signature})
        this.setState({photo:order.photo})
        this.setState({ Modal: true })
    }
    closeModal = () => {
        this.setState({ Modal: false })
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        this.setState({ [name]: value });
        // console.log(e.target.value)
    }
    name = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    age = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    email = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    gender = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    address = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    allergies = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    currentlyTakingMedications = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    existingMedicalProblems = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    signature = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    selectGender = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: value })
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

     // delete appointments
     onDelete = async (id) => {
        console.log(id);
        try {
            var option = window.confirm("Are you sure you want to delete this appointment ? ")
            if(option){
            await axios.delete(`http://localhost:6500/patient/deleteOrder/${id}`)
                .then((res) => {                   
                    alert("Appointment Successfully Deleted");                  
                    window.location.reload(true);
                })                
                .catch((err) => {
                    alert("Error occurred" + err);
                });
            }
        } catch (error) {
            alert("Error occurred" + error);
        }
    };

    Order = () => {
        if(this.state.name != '' && this.state.age != '' && this.state.email != '' && this.state.gender != 'Select One' && this.state.photo != ''){
            const order = {
                id: this.state.id,
                name: this.state.name,
                age: this.state.age,
                email: this.state.email,
                gender: this.state.gender,
                address: this.state.address,
                allergies: this.state.allergies,
                currentlyTakingMedications: this.state.currentlyTakingMedications,
                existingMedicalProblems: this.state.existingMedicalProblems,
                userId: this.state.userId,
                signature: this.state.signature,
                photo: this.state.photo
    
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            }
    
            console.log(order)
    
            // update medicine orders
            axios.put('http://localhost:6500/patient/updateOrder', order, config).then(res => {
                if (res.data.success) {
                    alert(res.data.message);
                    window.location.reload(false);
                }
            });
        
        }
    }
    
    render() {
        return (
            <div className="container">
                <div className="row" >
                    <div className="col-lg-9 mt-2 mb-2">
                        <h3 className="myappointment-top-title" textAlign="center" style={{ marginLeft: "30%", marginTop: "35px" }}>My Medicine Orders</h3>
                    </div>
                    {/* <div className="input-group rounded" style={{ marginTop: "30px", marginLeft: "30%", marginBottom: "30px" }}>
                        <input type="search"
                            style={{ maxWidth: "50%" }}
                            className="form-control rounded"
                            placeholder="Search your appointment by Doctor Name"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            onChange={this.handleSearchArea} />
                        <span className="input-group-text border-0" id="search-addon"  >
                            <i class="fas fa-search"></i>
                        </span>
                    </div> */}

                </div>
                <div className="home">

                    <div style={{ paddingTop: "5vh", paddingBottom: "5vh", marginTop: "20px" }}></div>
                    <div className="myappointment-form-body">
                        <Table striped bordered hover >
                            <thead >
                                <tr >
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Allergies</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.map((order, index) => (
                                    <tr>
                                        <th scope="row" style={{ width: "15%" }}>{index + 1}</th>
                                        <td >{order.name}</td>
                                        <td >{order.age}</td>
                                        <td >{order.gender}</td>
                                        <td >{order.allergies}</td>
                                        <th scope="col">
                                            <a className="btn btn-warning" href="#" style={{ marginTop: "5px" }} onClick={this.openModal.bind(this,order)}>
                                                <i className="far fa-edit" ></i>&nbsp; Edit
                                            </a>
                                            &nbsp;
                                            <a className="btn btn-danger" href="#" style={{ marginTop: "10px" }} onClick={this.onDelete.bind(this,order._id)} >
                                                <i className="far fa-trash-alt"></i>&nbsp; Delete
                                            </a>
                                            &nbsp;
                                        </th>
                                    </tr>

                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <Modal
                    show={this.state.Modal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    closable={false}
                >
                    <Modal.Body >
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Name</Form.Label>
                                    <Form.Control type="text" name="name" style={{ marginTop: "10px" }} value={this.state.name} onChange={this.name} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Age</Form.Label>
                                    <Form.Control type="number" name="age" style={{ marginTop: "10px" }} value={this.state.age} onChange={this.age} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Email</Form.Label>
                                    <Form.Control type="text" name="email" style={{ marginTop: "10px" }} value={this.state.email} onChange={this.validateEmail} />
                                    <span style={{
                                      fontWeight: 'bold',
                                      color: 'red',
                                    }}>{this.state.emailError}</span>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                <Form.Label name="gender" style={{ marginTop: "10px", font: " bold 20px/20px Times New Roman,serif"}}>Gender</Form.Label>
                                <select class="form-select" name="gender" value={this.state.gender} onChange={this.handleChange} >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </Form.Group>
                                
                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Address</Form.Label>
                                    <Form.Control type="text" name="address" style={{ marginTop: "10px" }} value={this.state.address} onChange={this.address} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Allergies</Form.Label>
                                    <Form.Control type="textArea" name="allergies" style={{ marginTop: "10px" }} value={this.state.allergies} onChange={this.allergies} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Currently Taking Medications</Form.Label>
                                    <Form.Control type="textArea" name="currentlyTakingMedications" style={{ marginTop: "10px" }} value={this.state.currentlyTakingMedications} onChange={this.currentlyTakingMedications} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Existing Medical Problems</Form.Label>
                                    <Form.Control type="textArea" name="existingMedicalProblems" style={{ marginTop: "10px" }} value={this.state.existingMedicalProblems} onChange={this.existingMedicalProblems} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Signature</Form.Label>
                                    <Form.Control type="textArea" name="signature" style={{ marginTop: "10px" }} value={this.state.signature} onChange={this.signature} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }} >
                                    Medicine List
                                </Form.Label>
                                <Col sm={3}>
                                 <img src={this.state.photo} style={{width: "200px"}}></img>
                                </Col>
                                <span>
                                <input type="file" name="file" id="file_up"
                                accept="image/*" onChange={this.handleUpload} />
                                </span>
                            </Form.Group>
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-success" onClick={this.Order}>Update</Button>{' '}
                        <Button variant="outline-danger" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default MyMedicineOrders;
