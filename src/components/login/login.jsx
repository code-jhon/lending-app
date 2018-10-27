import React, { Component } from 'react'

import { Button, FormGroup, FormControl, ControlLabel, Row, Col, Grid, Image } from "react-bootstrap";

import Navigation from '../navigation/navigation'

import axios from 'axios'


export default class login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: "false",
            id: "",
            password: "",
            role: ""
        };


    }

    state = {
        redirect: "false",
        id: "",
        password: "",
        role:""
    };

    validateForm() {
        return this.state.id.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    
    ingresar = event =>{
        axios.get('http://localhost:8888/v1/getuser/1')
        .then(response => {
            sessionStorage.setItem("logged", response.data.resp);
            sessionStorage.setItem("role", response.data.role);
            sessionStorage.setItem("id", response.data.id);
            sessionStorage.setItem("name", response.data.name);
            sessionStorage.setItem("email", response.data.email);
            this.setState(() => ({
                redirect: response.data.resp
            }))
        })              
    }

    render() {
        if (sessionStorage.getItem("logged")==="true") {
            this.state.redirect = "true";
        }

        if (this.state.redirect==="true") {
            return (
            <div>
                <Navigation />
            </div>
            );
        }
        return (
            <Row className="show-grid">
                <Grid>
                    <Row>
                        <Col xs={6} md={4} xsOffset={4}>
                            <Image src="https://lendingfront.com/images/company-logo.svg" />
                        </Col>
                    </Row>
                </Grid>;
                <Col xs={4} xsOffset={4}>
                    <div className="Login">
                        <form>
                            <FormGroup controlId="id" bsSize="large">
                                <ControlLabel>ID</ControlLabel>
                                <FormControl
                                    autoFocus
                                    value={this.state.id}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                />
                            </FormGroup>
                            <Button
                                block
                                bsSize="large"
                                disabled={!this.validateForm()}
                                onClick={this.ingresar}
                            >
                                Login
                    </Button>
                        </form>
                    </div>
                </Col>
            </Row>
        )
    }
}
