import React, { Component } from 'react'
import { OverlayTrigger, Popover, Table, Col, Row, Label } from 'react-bootstrap'
import axios from 'axios'

export default class loans extends Component {
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

  handleStatus(status) {
    let style;
    switch (status) {
      case "Active":
        style = "success"
        break;
      case "Closed":
        style = "warning"
        break;

      default:
        style = "default"
        break;
    }

    return (
      <Label bsStyle={style}>{status}</Label>
    );
  }

  render() {

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
                  <th>Fees</th>
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
                    <td>{item.fees}</td>
                    <td>{this.handleStatus(item.status)}</td>
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
