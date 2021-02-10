import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/sales-transactions';
import Datatable from './pendingOrdersDatatable';
import {getAllOrders} from '../../firebase/firebase.utils'

export class PaymentApproved extends Component {
    constructor(props){
        super(props)
        this.state ={
            paymentApproved:[]
        }
    }

    componentDidMount=async()=>{
        const allOrders = await getAllOrders()
        const paymentApproved = allOrders.filter(order=>order.status === "payment_approved")
        this.setState({paymentApproved})
    }
    handleUpdateRow =async (orderIdArray) =>{
        const newPaymentApproved = this.state.paymentApproved.filter((order) => !orderIdArray.includes((order.orderId).toString()))
        this.setState({paymentApproved:newPaymentApproved})
    }

    render() {
        const {paymentApproved} = this.state
        return (
            <Fragment>
                <Breadcrumb title="Payment Approved" parent="Sales" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Pending Orders</h5>
                                </div>
                                <div className="card-body">
                                    <div id="batchDelete" className="transactions">
                                        <Datatable
                                            multiSelectOption={false}
                                            myData={paymentApproved}
                                            pageSize={10}
                                            pagination={true}
                                            class="-striped -highlight"
                                            handleUpdateRow ={this.handleUpdateRow}
                                            {...this.props}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default PaymentApproved;
