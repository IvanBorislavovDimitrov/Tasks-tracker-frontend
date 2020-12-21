import React, { Component } from "react";

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            hideInvalidUsernamePassword: true,
            seen: false,
            emailSent: false
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Login</p>
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
                        <div hidden={this.state.hideInvalidUsernamePassword} className="text-danger mb-3">Invalid username or password
                            </div>
                        <button onClick={this.loginUser} className="btn btn-info btn-block">
                            Login
                        </button>
                        <button onClick={this.redirectToForgottenPassword} className="btn btn-danger btn-block">
                            Forgotten Password
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    loginUser = () => {
        const currentThis = this;
        const loginForm = {
            username: currentThis.state.username,
            password: currentThis.state.password
        };
        fetch(process.env.REACT_APP_URL + '/authenticate', {
            method: 'POST',
            body: JSON.stringify(loginForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            const jsonResponse = await response.json();
            if (response.status !== 200) {
                alert("Invalid login!");
                return;
            }
            localStorage.setItem('token', jsonResponse['token']);
            window.location.href = '/';
        })
            .catch(error => alert(error));
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

    redirectToForgottenPassword = () => {
        window.location.href = '/users/forgotten-password'
    }
}

export default UserLogin;