import React, { Component } from 'react'
import { OverlayTrigger, Popover, Table, Col, Row, Button, Glyphicon, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import axios from 'axios'

export default class payments extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddApplication = this.handleAddApplication.bind(this);

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
      response: '',
      options_data: []
    };

  }

  handleAddApplication() {
    axios.post(
      'http://127.0.0.1:5000/v1/postPayment',
      {
        "id": sessionStorage.getItem("name"),
        "amount": this.state.requested_amount
      })
      .then(response => {
        this.handleClose();
        this.render();
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
        <ControlLabel>Please fill the fields to make a payment</ControlLabel>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <FormControl componentClass="select" placeholder="Choose a Loan">
            {items.map(item =>
              <option key={item.id} value={item.id} >{item.Bsname}({item.requested_amount})</option>
            )}
          </FormControl>
          <FormControl type="number" id="Amount" value={this.state.Amount} placeholder="Amount to pay" onChange={this.handleChange} />
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


  popoverHoverFocus(item) {
    return (
      <Popover id="popover-trigger-hover-focus" title={item.Bsname}>
        <strong>Business TaxId</strong> {item.BsTaxId}.<br></br>
        <strong>Business name</strong> {item.Bsname}.<br></br>
        <strong>Business city</strong> {item.Bscity} / {item.Bsstate}.<br></br>
      </Popover>
    )
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
                  <th>#</th>
                  <th>User</th>
                  <th>Business</th>
                  <th>Requested amout</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item =>
                  <tr key={item.BsTaxId}>
                    <td>{item.BsTaxId}</td>
                    <td>{item.user}</td>
                    <OverlayTrigger
                      trigger={['hover', 'focus']}
                      placement="right"
                      overlay={this.popoverHoverFocus(item)}
                    >
                      <td>{item.Bsname}</td>
                    </OverlayTrigger>

                    <td>{item.requested_amount}</td>
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
            <Modal.Title>Make an Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {form}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleAddApplication}>Pay</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
