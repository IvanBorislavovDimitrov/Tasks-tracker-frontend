import React, { Component } from "react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
            confirmPassword: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Register</p>
                        <div id="emailField" className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="email"
                                type="text"
                                className="form-control"
                                id="emailInputField"
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="username"
                                type="text"
                                className="form-control"
                                id="usernameInputField"
                                placeholder="Username"
                            />
                        </div>
                        <div id="passwordField" className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="password"
                                type="password"
                                className="form-control"
                                id="passwordInputField"
                                placeholder="Password"
                            />
                        </div>
                        <div id="confirmPasswordField" className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="confirmPassword"
                                type="password"
                                className="form-control"
                                id="confirmPasswordInputField"
                                placeholder="Confirm Password"
                            />
                        </div>
                        <button onClick={this.registerUser} className="btn btn-info btn-block">
                            Register
                            </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    registerUser = () => {
        const currentThis = this;
        const registerForm = {
            username: currentThis.state.username,
            email: currentThis.state.email,
            password: currentThis.state.password,
            confirmPassword: currentThis.state.confirmPassword
        }
        fetch(process.env.REACT_APP_URL + '/users/register', {
            method: 'POST',
            body: JSON.stringify(registerForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(response => {
                alert("You've been registered!");
                window.location.href = '/'; 
            }).catch(error => alert(error))
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
}

export default Register;