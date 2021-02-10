import React, { Component } from 'react'
import Sidebar from './common/sidebar_components/sidebar';
import Right_sidebar from './common/right-sidebar';
import Footer from './common/footer';
import Header from './common/header_components/header';
import {getAllOrders, getAllPayments,getAllAdmins, getAllProducts, getAllAliProducts,auth} from '../firebase/firebase.utils'
import {connect} from 'react-redux'
import {setAllOrders, setAllPayments,setAllAdmins,setAllProducts,setCurrentAdmin} from '../actions'

export class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            ltr:true,
            divName:'RTL',
        }
    }

    componentDidMount=async()=>{
        console.log(this.props.history)
        const allOrdersArray = await getAllOrders()
        const allPaymentsArray = await getAllPayments()
        const allAdminsArray = await getAllAdmins()
        const allProductsArray = await getAllProducts()
        const allAliProductsArray = await getAllAliProducts()
        this.props.setAllOrders(allOrdersArray)
        this.props.setAllPayments(allPaymentsArray)
        this.props.setAllAdmins(allAdminsArray)
        this.props.setAllProducts([...allAliProductsArray,...allProductsArray])
        auth.onAuthStateChanged((adminAuth)=>{
            var admin = this.props.admins.find(admin=>admin.adminId == adminAuth.uid)
            this.props.setCurrentAdmin(admin)
        } )

    }
    ChangeRtl(divName){
        if(divName === 'RTL') {
            document.body.classList.add('rtl');
            this.setState({divName: 'LTR'});
        }else{
            document.body.classList.remove('rtl');
            this.setState({divName: 'RTL'});
        }
    }
    render() {
        return (
            <div>
                <div className="page-wrapper" >
                    <Header />
                    <div className="page-body-wrapper">
                        <Sidebar />
                        <Right_sidebar />
                        <div className="page-body">
                            {this.props.children}
                        </div>
                        <Footer />
                    </div>
                </div>
                <div className="btn-light custom-theme" onClick={ () => this.ChangeRtl(this.state.divName)}>{this.state.divName}</div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        admins:state.admins.admins
    }
}
export default connect(mapStateToProps,{setAllOrders,setAllPayments,setAllAdmins,setAllProducts,setCurrentAdmin})(App);
