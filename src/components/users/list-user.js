import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/listUser';
import Datatable from './usersDatatable'
import {getAllUsers} from '../../firebase/firebase.utils'

export class List_user extends Component {
    constructor(props){
        super(props)
        this.state ={
            allUsers:[]
        }
    }

    componentDidMount=async()=>{
        const allUsers = await getAllUsers()
        this.setState({allUsers})
    }

    render() {
        const {allUsers} = this.state
        return (
            <Fragment>
                <Breadcrumb title="User List" parent="Users" />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <h5>User Details</h5>
                        </div>
                        <div className="card-body">
                            <div className="clearfix"></div>
                            <div id="batchDelete" className="category-table user-list order-table coupon-list-delete">
                                <Datatable
                                    multiSelectOption={false}
                                    myData={allUsers}
                                    pageSize={10}
                                    pagination={true}
                                    class="-striped -highlight"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default List_user
