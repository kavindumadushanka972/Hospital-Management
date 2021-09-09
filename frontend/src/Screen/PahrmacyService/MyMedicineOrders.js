import { Component } from "react";
import axios from "axios";
import decode from "jwt-decode";


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
        orders: []
    };

    componentDidMount = async () => {

        if (localStorage.getItem("authToken")) {
            const hasToken = await localStorage.getItem("authToken");
            const id = decode(hasToken).id;
            this.setState({ userId: id });
            console.log(this.state.userId);
            console.log(localStorage.getItem("authToken"));
        }

        // get orders
        // axios.get(`http://localhost:6500/codebusters/api/patientpvt/ordermedicine/orders/${this.state.userId}`).then(res => {
        //     if (res.data.success) {
        //         this.setState({
        //             orders: res.data.order
        //         });
        //         console.log(this.state.orders);
        //     }
        // })
    }

    openModal = async (order) => {
        this.setState({selectedOrder:order})
        this.setState({ Modal: true })
    }
    closeModal = () => {
        this.setState({ Modal: false })
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(e.target.value)
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
        console.log(e);
        this.setState({ gender: e })
    }

    Order = () => {
        const order = {
            name: this.state.selectedOrder.name,
            age: this.state.selectedOrder.age,
            email: this.state.selectedOrder.email,
            gender: this.state.selectedOrder.gender,
            address: this.state.selectedOrder.address,
            allergies: this.state.selectedOrder.allergies,
            currentlyTakingMedications: this.state.selectedOrder.currentlyTakingMedications,
            existingMedicalProblems: this.state.selectedOrder.existingMedicalProblems,
            userId: this.state.selectedOrder.userId,
            signature: this.state.selectedOrder.signature

        }
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
        }

        // update appointments
        axios.put('http://localhost:6500/codebusters/api/patientpvt/ordermedicine/order/update', order, config).then(res => {
            if (res.data.success) {
                alert(res.data.message);
                window.location.reload(false);
            }
        });
    }
    
    render(){
        return(
            <div>
                <h2>Component</h2>
            </div>
        )
    }
}

export default MyMedicineOrders;
