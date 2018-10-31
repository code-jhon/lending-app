import React, { Component } from 'react'
import { OverlayTrigger, Popover, Table, Col, Row, Button, Glyphicon, Modal, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
import axios from 'axios'

export default class applications extends Component {
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
      requested_amount:"",
      response: ''
    };

  }

  handleAddApplication() {
    axios.post(
      'http://127.0.0.1:5000/v1/postApplication',
      {
        "user":sessionStorage.getItem("name"),
        "user_email":sessionStorage.getItem("email"),
        "BsTaxId":this.state.BsTaxId,
        "Bsname":this.state.Bsname,
        "Bscity":this.state.Bscity,
        "Bsstate":this.state.Bsstate,
        "requested_amount":this.state.requested_amount
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
    this.setState({ show: true });
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
/*
"BsTaxId": 78894565,
            "Bsname": "Small Store",
            "Bscity": "Cali",
            "Bsstate": "Valle",
            "requested_amount":50001,
*/
  addForm(){
    return(
      <form>
        <ControlLabel>Please fill the fields to request an application</ControlLabel>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <FormControl type="number" id="BsTaxId" value={this.state.BsTaxId} placeholder="Business Tax Id" onChange={this.handleChange}/>
          <FormControl type="text" id="Bsname" value={this.state.Bsname} placeholder="Business Name" onChange={this.handleChange}/>
          <FormControl type="text" id="Bscity" value={this.state.Bscity} placeholder="Business City" onChange={this.handleChange}/>
          <FormControl type="text" id="Bsstate" value={this.state.Bsstate} placeholder="Business State" onChange={this.handleChange}/>
          <FormControl type="number" id="requested_amount" value={this.state.requested_amount} placeholder="Requested Amount" onChange={this.handleChange}/>
          <FormControl.Feedback />
          <HelpBlock>Validation is based on requested_amount length.</HelpBlock>
        </FormGroup>
      </form>
    )
  }

  componentWillMount(){
    axios.get('http://127.0.0.1:5000/v1/getApplications')
      .then(response => {
        this.setState({ table_data: response.data.resp, table_rows: response.size })
      })
  }

  shouldComponentUpdate(nextProps) {
    const BsTaxId = this.state.BsTaxId !== nextProps.BsTaxId;
    return BsTaxId;
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
    }else{
      items = [{ "id": "No data", "user": "", "Bsname": "", "status": "", "requested_amount": ""}];
    }

    return (
      <div>
        <Row>
          <Col xs={4} xsOffset={4}>
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
              <Button bsStyle="primary" bsSize="medium" block onClick={this.handleShow}><Glyphicon glyph="star" /> Request here!</Button>
            </Col>
          </Col>
        </Row>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Make and Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {form}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleAddApplication}>Request</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
