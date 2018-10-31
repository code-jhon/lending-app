import React, { Component } from 'react'
import { OverlayTrigger, Popover, Table, Col, Row, Button, Glyphicon, Modal, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import axios from 'axios'

export default class applications extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      table_data: [],
      table_rows: '',
      BsTaxId: "",
      Bsname: '',
      Bscity: '',
      Bsstate: '',
      requested_amount: "",
      response: ''
    };

  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  componentWillMount() {
    axios.get('http://127.0.0.1:5000/v1/getLoans')
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

    let items;

    if (this.state.table_data.length > 0) {
      items = this.state.table_data;
    } else {
      items = [{ "id": "No data", "user": "", "Bsname": "", "status": "", "requested_amount": "" }];
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
        </Row>
      </div>
    )
  }
}
