import React, { Component, Fragment } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import data from "../../assets/data/invoice";
import Datatable from "../../components/invoice/invoiceDatatable";
import { getAllLotsRedux } from "../../actions/index";
import { connect } from "react-redux";
import "./css/invoice-by-order.css";
import Alg from "./alg.png";
export class InvoiceByOrder extends Component {
  componentDidMount = async () => {
    this.props.getAllLotsRedux();
  };

  render() {
    return (
      <Fragment>
        <Breadcrumb title="Invoice" parent="Invoice" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Invoice #{this.props.match.params.orderId}</h5>
                </div>
                <div
                  className="card-body"
                  style={{ backgroundColor: "#e4e3e1" }}
                >
                  <div id="basicScenario" className="product-list">
                    <div
                      id="container"
                      style={{ maxWidth: "1200px", borderRadius: ".2rem" }}
                    >
                      <section id="memo" style={{ height: "165px" }}>
                        <div class="logo">
                          <img
                            style={{ width: "70px", height: "70px" }}
                            src={Alg}
                          />
                        </div>

                        <div class="company-info">
                          <div>Alg Cargos & Logistics ltd</div>
                          <br />
                          <span>
                            37/2 Pritom-Zaman Tower, 10th Floor, suite 6A &nbsp;
                          </span>{" "}
                          <br />
                          <span>Culvert Road, Dhaka-1000. Bangladesh</span>
                          <br />
                          <span>Hotline: 8801736404419,</span>
                          <span>info@algcargos.com</span>
                        </div>
                      </section>

                      <section id="invoice-title-number">
                        <span id="title" style={{ backgroundColor: "#8a0368" }}>
                          INVOICE
                        </span>
                        <span id="number" style={{ fontSize: "200%" }}>
                          #{this.props.match.params.orderId}
                        </span>
                      </section>

                      <div class="clearfix"></div>

                      <section id="client-info">
                        <span>TO:</span>
                        <div>
                          <span class="bold">GlobalBuyBd.com</span>
                        </div>

                        <div>
                          <span>3C,4th floor,449/2</span>
                        </div>

                        <div>
                          <span>Jatrabari,Dhaka-1200</span>
                        </div>

                        <div>
                          <span>+8801521331295</span>
                        </div>

                        <div>
                          <span>khaledhasanfahim@gmail.com</span>
                        </div>
                      </section>

                      <div class="clearfix"></div>

                      <section id="items">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <th>#</th>
                            <th style={{ maxWidth: "50px" }}>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>CTN no</th>
                            <th>Tracking no</th>
                            <th>Weight</th>
                            <th>In Total</th>
                          </tr>

                          <tr data-iterate="item">
                            <td>1</td>
                            <td style={{ maxWidth: "50px" }}>Ladies Bag</td>
                            <td>3</td>
                            <td>120tk</td>
                            <td>55</td>
                            <td>a850ghohroh</td>

                            <td>3kg</td>
                            <td>360tk</td>
                          </tr>
                          <tr data-iterate="item">
                            <td>2</td>
                            <td style={{ maxWidth: "50px" }}>Watch</td>
                            <td>10</td>
                            <td>150tk</td>
                            <td>55</td>
                            <td>al04304723047</td>
                            <td>2kg</td>
                            <td>1400tk</td>
                          </tr>
                          <tr data-iterate="item">
                            <td>3</td>
                            <td style={{ maxWidth: "50px" }}>Bags</td>
                            <td>8</td>
                            <td>130tk</td>
                            <td>55</td>
                            <td>153483040</td>
                            <td>4kg</td>
                            <td>1040tk</td>
                          </tr>
                          <tr data-iterate="item">
                            <td>4</td>
                            <td style={{ maxWidth: "50px" }}>Shoes</td>
                            <td>3</td>
                            <td>120tk</td>
                            <td>55</td>
                            <td>03740730fajl</td>
                            <td>1kg</td>
                            <td>760tk</td>
                          </tr>
                          <tr data-iterate="item">
                            <td>5</td>
                            <td style={{ maxWidth: "50px" }}>Mixed</td>
                            <td>45</td>
                            <td>120tk</td>
                            <td>55</td>
                            <td>93694639463</td>
                            <td>5kg</td>
                            <td>3600tk</td>
                          </tr>
                        </table>
                      </section>

                      <section id="sums">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <th>Subtotal</th>
                            <td>36,000tk</td>
                          </tr>

                          <tr data-iterate="tax">
                            <th>Packing Charge</th>
                            <td>2000tk</td>
                          </tr>
                          <tr data-iterate="tax">
                            <th>Insurance</th>
                            <td>5000tk</td>
                          </tr>
                          <tr class="amount-total">
                            <th>TOTAL</th>
                            <td>43,000tk</td>
                          </tr>

                          {/* <!-- You can use attribute data-hide-on-quote="true" to hide specific information on quotes.
               For example Invoicebus doesn't need amount paid and amount due on quotes  --> */}
                          <tr data-hide-on-quote="true">
                            <th>paid</th>
                            <td>430tk</td>
                          </tr>

                          <tr data-hide-on-quote="true">
                            <th>AMOUNT DUE</th>
                            <td>0tk</td>
                          </tr>
                        </table>

                        <div class="clearfix"></div>
                      </section>

                      <div class="clearfix"></div>

                      <section id="invoice-info">
                        <div>
                          <span style={{ color: "#464242" }}>Created By</span>
                        </div>
                        <div>
                          <span>MD.Tipu</span>
                        </div>
                        <br />
                        <div>
                          <span style={{ color: "#464242" }}>Delivered By</span>
                        </div>
                        <div>
                          <span>Sagor</span>
                        </div>
                      </section>

                      <section id="terms">
                        <div class="notes">
                          Fahim, thank you very much.We really appreciate your
                          buisness. <br />
                          Please send the payments before due date.
                        </div>

                        <br />

                        <div class="payment-info">
                          <div>Payments details</div>
                          <div>DBBL 123006705</div>
                          <div>CITY BANK 40580387070</div>
                          <div>ISLAMI BANK 05873047304730</div>
                          <div>EBL 5037403740730</div>
                        </div>
                      </section>

                      <div class="clearfix"></div>

                      <div
                        class="thank-you"
                        style={{ backgroundColor: "#8a0368" }}
                      >
                        THANKS!
                      </div>

                      <div class="clearfix"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allLots: state.lots.lots,
  };
};
export default connect(mapStateToProps, { getAllLotsRedux })(InvoiceByOrder);
