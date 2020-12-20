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
                            <div id="emailNameInvalidForm" class="text-danger">

                            </div>
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
                            <div id="usernameNameInvalidForm" class="text-danger">

                            </div>
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
                            <div id="passwordNameInvalidForm" class="text-danger">

                            </div>
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
                            <div id="confirmPasswordNameInvalidForm" class="text-danger">

                            </div>
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
        const emailNameInvalidForm = document.getElementById('emailNameInvalidForm');
        const usernameNameInvalidForm = document.getElementById('usernameNameInvalidForm');
        const passwordNameInvalidForm = document.getElementById('passwordNameInvalidForm');
        const confirmPasswordNameInvalidForm = document.getElementById('confirmPasswordNameInvalidForm');
        emailNameInvalidForm.textContent = '';
        usernameNameInvalidForm.textContent = '';
        passwordNameInvalidForm.textContent = '';
        confirmPasswordNameInvalidForm.textContent = '';
        let stop = false;
        if (!this.validateEmail()) {
            emailNameInvalidForm.textContent = 'Enter an email';
            stop = true;
        }
        if (!this.validateUsername()) {
            usernameNameInvalidForm.textContent = 'Enter a username';
            stop = true;
        }
        if (!this.validatePassword()) {
            passwordNameInvalidForm.textContent = 'Enter a password';
            stop = true;
        }
        if (!this.validateConfirmPassword()) {
            confirmPasswordNameInvalidForm.textContent = 'Enter a confirm password';
            stop = true;
        }
        if (stop) {
            return;
        }
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
        }).then(async response => {
            if (response.status !== 200) {
                alert("You haven't been registered!");
                return;
            }
            const registerResponse = await response.json();
            alert("You've been registered!");
            window.location.href = '/';
        })
            .catch(error => alert(error))
    }

    validateEmail = () => {
        if (this.state.email == '' || this.state.email == null || this.state.email == undefined) {
            return false;
        }
        return true;
    }

    validateUsername = () => {
        if (this.state.username == '' || this.state.username == null || this.state.username == undefined) {
            return false;
        }
        return true;
    }

    validatePassword = () => {
        if (this.state.password == '' || this.state.password == null || this.state.password == undefined) {
            return false;
        }
        return true;
    }

    validateConfirmPassword = () => {
        if (this.state.confirmPassword == '' || this.state.confirmPassword == null || this.state.confirmPassword == undefined) {
            return false;
        }
        return true;
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {
        let isLoggedIn = false;
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token != "undefined") {
            window.location.href = '/';
        }
    }
}

export default Register;