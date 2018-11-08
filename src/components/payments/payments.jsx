import React, { Component } from 'react'
import { OverlayTrigger, Popover, Table, Col, Row, Button, Glyphicon, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import axios from 'axios'

export default class payments extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddPayment = this.handleAddPayment.bind(this);

    this.state = {
      show: false,
      table_data: [],
      table_rows: '',
      BsTaxId: "",
      Bsname: '',
      Bscity: '',
      Bsstate: '',
      requested_amount: "",
      LoanId: "",
      PaymentVal:"",
      response: '',
      options_data: []
    };

  }

  handleAddPayment() {
    axios.post(
      'http://127.0.0.1:5000/v1/postPayment',
      {
        "id": sessionStorage.getItem("name"),
        "loan":this.state.LoanId,
        "amount": this.state.PaymentVal
      })
      .then(response => {
        this.handleClose();
        this.setState({ table_data: response.data.resp, table_rows: response.size })
      })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.getOptions()
    this.setState({ show: true });
  }

  getOptions(){
    axios.get('http://127.0.0.1:5000/v1/getLoans')
      .then(response => {
        this.setState({ options_data: response.data.resp })
      })
  }

  getValidationState() {
    const length = this.state.requested_amount.length;
    if (length === 4) return 'success';
    else if (length === 6) return 'warning';
    else if (length > 6) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  addForm() {
    let items = this.state.options_data;
    return (
      <form>
        <FormGroup
          validationState={this.getValidationState()}
        >
          <FormControl id="LoanId" componentClass="select" placeholder="Choose a Loan" onChange={this.handleChange}>
            {items.map(item =>
              <option key={item.id} value={item.id} >{item.Bsname}({item.requested_amount})</option>
            )}
          </FormControl>
          <FormControl type="number" id="PaymentVal" value={this.state.PaymentVal} placeholder="Amount to pay" onChange={this.handleChange} />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on requested_amount length.</HelpBlock>
        </FormGroup>
      </form>
    )
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:5000/v1/getPayments')
      .then(response => {
        this.setState({ table_data: response.data.resp, table_rows: response.size})
      })
  }

  render() {

    const form = this.addForm();
    let items;

    if (this.state.table_data.length > 0) {
      items = this.state.table_data;
    } else {
      items = [{ "id": "No data", "user": "", "Bsname": "", "status": "", "requested_amount": "" }];
    }

    return (
      <div className="bg-image">
        <Row>
          <Col xs={6} xsOffset={2}>
            <Table responsive>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Loan</th>
                  <th>Fee</th>
                  <th>Amount Left</th>
                  <th>Remaining Fees</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item =>
                  <tr key={item.user}>
                    <td>{item.user}</td>
                    <td>{item.loan}</td>
                    <td>{item.fee}</td>
                    <td>{item.amount_left}</td>
                    <td>{item.remaining_fees}</td>
                    <td>{item.status}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col xs={4}>
            <Col xs={6}>
              <Button bsStyle="primary" bsSize="sm" block onClick={this.handleShow}><Glyphicon glyph="new-window" /> Pay here!</Button>
            </Col>
          </Col>
        </Row>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Make a Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {form}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleAddPayment}>Pay</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
