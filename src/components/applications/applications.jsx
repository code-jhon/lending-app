import React, { Component } from 'react'
import { Table, Col, Row, Button, Glyphicon, Modal, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
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
      value:""
    };
  }

  handleAddApplication() {
    axios.get('http://localhost:8888/v1/postApplication')
      .then(response => {
        console.log(response)
      })
    /*axios.post('http://localhost:8888/v1/postApplication', {
      requested: this.state.value,
      id_user: sessionStorage.getItem("id")
    }).then(response => {
        console.log(response.data)
      }).catch(function (error) {
        console.log(error);
      })  
    this.setState({ show: false });*/
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  getValidationState() {
    const length = this.state.value.length;
    if (length == 4) return 'success';
    else if (length == 6) return 'warning';
    else if (length > 6) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  addForm(){
    return(
      <form>
        <ControlLabel>Please the amount to request an application</ControlLabel>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <FormControl
            type="number"
            value={this.state.value}
            placeholder="Enter the amount"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
      </form>
    )
  }

  render() {
    const form = this.addForm();

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
                <tr>
                  <td>1</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col xs={4}>
            <Col xs={6}>
              <Button bsStyle="primary" bsSize="medium" block onClick={this.handleShow}><Glyphicon glyph="plus" /> Add</Button>
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
