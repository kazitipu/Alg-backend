import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {deleteUser} from './../../firebase/firebase.utils'


export class Datatable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedValues: [],
            myData: this.props.myData
        }
    }

    selectRow = (e, i) => {
        if (!e.target.checked) {
            this.setState({
                checkedValues: this.state.checkedValues.filter((item, j) => i !== item)
            });
        } else {
            this.state.checkedValues.push(i);
            this.setState({
                checkedValues: this.state.checkedValues
            })
        }
    }

    handleRemoveRow = () => {
        const selectedValues = this.state.checkedValues;
        const updatedData = this.state.myData.filter(function (el) {
            return selectedValues.indexOf(el.id) < 0;
        });
        this.setState({
            myData: updatedData
        })
        toast.success("Successfully Deleted !")
    };

    renderEditable = (cellInfo) => {
        const { myData } = this.props
        if (myData.length > 0){
            const newData =[]
            myData.forEach(user =>{
                
            //  this is not affecting my output see line 104   
                newData.push({
                    uid:user.uid,
                    name: user.displayName,
                    email: user.email,
                    created:this.toDateTime(user.createdAt.seconds),
                })
                
            });
            return (
                <div
                    style={{ backgroundColor: "#fafafa" }}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => {
                        const data = [...newData];
                        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        this.setState({ myData: data });
                    }}
                    dangerouslySetInnerHTML={{
                        __html:newData[cellInfo.index][cellInfo.column.id]
                    }}
                />
            );
        }
        else{
            return null;
        }
        
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    toDateTime=(secs)=> {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        return t;
    }

    render() {
        const { pageSize, myClass, multiSelectOption, pagination } = this.props;
        console.log(this.props)
        const { myData } = this.props
        console.log(myData)
        const newData = []
        if (myData.length >0){
            myData.forEach(user =>{
                console.log(user.createdAt)
                newData.push({
                    uid:user.uid,
                    name: user.displayName,
                    email: user.email,
                    created:this.toDateTime(user.createdAt.seconds),
                })   
            })
        }
       ;

        const columns = [];
        for (var key in newData[0]) {

            let editable = this.renderEditable
            if (key == "image") {
                editable = null;
            }
            if (key == "status") {
                editable = null;
            }
            if (key === "avtar") {
                editable = null;
            }
            if (key === "vendor") {
                editable = null;
            }
            if(key === "order_status"){
                editable = null;
            }

            columns.push(
                {
                    Header: <b>{this.Capitalize(key.toString())}</b>,
                    accessor: key,
                    Cell: editable,
                    style: {
                        textAlign: 'center'
                    }
                });
        }
        

        return (
            <Fragment>
                <ReactTable
                    data={newData}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className={myClass}
                    showPagination={pagination}
                />
                <ToastContainer />
            </Fragment>
        )
    }
}

export default Datatable
