import React, { Component,Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import {uploadProduct,uploadAliProduct} from '../../../firebase/firebase.utils'
import Spinner from 'react-bootstrap/Spinner'
import "./add-aliexpress-product.css"


export class Add_product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:'',
            availability:'in-stock',
            loader:false, 
            product:null
        }
    }
    
  
    handleChange = (event) => {
        const {name,value} =event.target;
        this.setState({ [name]:value });
    }

    handleFormSubmit = async (event) =>{
        this.setState({loader:true})
        event.preventDefault()
        const data = await fetch(`http://localhost:5000/${this.state.id}`)
        if (data){
            data.json().then(async (body)=>{
            console.log(body)
            await uploadAliProduct({...body, availability:this.state.availability})
            alert('product added successfully!')
            this.setState({
                id:'',      
                availability:'in-stock',
                loader:false    
            })
        }).catch((error)=>alert('this product cannot be scraped.try manually adding it'))}else{
            alert('Slow internet detected during scraping product information. try again')
            this.setState({
                id:'',      
                availability:'in-stock',
                loader:false    
            })
        }
       
       
        
    }

    handleDiscard =()=>{
        this.setState({
            id:'',
            availability:'in-stock',
        })
    }

    render(){
        const {loader} = this.state
        
        return (
            <Fragment>   
            
                <Breadcrumb title="Add Aliexpress Product" parent="Physical" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Add Aliexpress Product</h5>
                                    <h6>just copy and paste the product id from Aliexpress website.</h6>
                                </div>
                                <div className="card-body">
                                    <div className="row product-adding">
                                        <div className="col-xl-12">
                                            <form className="needs-validation add-product-form" onSubmit={this.handleFormSubmit}>
                                                <div className="form form-label-center">
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Product Id :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <input className="form-control" name="id" value={this.state.id} type="text" onChange={this.handleChange} required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                   
                                                   
                                                    <div className="form-group row">
                                                        <label className="col-xl-3 col-sm-4 mb-0" >Product Availability :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <select className="form-control digits" id="exampleFormControlSelect1" name="availability" value={this.state.availability} onChange={this.handleChange}>
                                                                <option>in-stock</option>
                                                                <option>pre-order</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="offset-xl-3 offset-sm-4">
                                                    <button type="submit" className="btn btn-primary">Add</button>
                                                    <button type="button" onClick={this.handleDiscard} className="btn btn-light">Discard</button>
                                                </div>
                                            </form>
                                            {loader?
                                            <>
                                            <div className="loader">Loading...</div>
                                            <h5 style={{"color":'gray'}}>wait scraping product information from Aliexpress.it may take upto 10 seconds depending on your internet connection.</h5>
                                            </>
                                            :
                                            ''}
                                            
                                        </div>
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

export default Add_product
