import React, { Component } from "react";

class ResetPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Reset password</p>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="password"
                                type="password"
                                className="form-control"
                                id="new-password"
                                placeholder="Password"
                            />
                            <div id="passwordNameInvalidForm" class="text-danger">

                            </div>
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="confirmPassword"
                                type="password"
                                className="form-control"
                                id="confirm-new-password"
                                placeholder="Confirm password"
                            />
                            <div id="confirmPasswordNameInvalidForm" class="text-danger">

                            </div>
                        </div>
                        <br />
                        <button onClick={this.resetPassword} className="btn btn-info btn-block">
                            Reset password
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    async componentDidMount() {
        await this.initUsername();
    }

    initUsername = async () => {
        const forgottenPasswordToken = this.getTokenFromUrl();
        fetch(process.env.REACT_APP_URL + '/users/find/' + forgottenPasswordToken, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            const user = await response.json();
            if (response.status !== 200) {
                alert('Something went wrong....');
                return;
            }
            this.setState({
                username: user['username']
            });
        })
    }

    resetPassword = () => {
        let stop = false;
        const passwordNameInvalidForm = document.getElementById('passwordNameInvalidForm');
        const newPassword = document.getElementById('new-password').value;
        if (newPassword == '') {
            passwordNameInvalidForm.textContent = 'Enter a password!';
            stop = true;
        }
        const confirmPasswordNameInvalidForm = document.getElementById('confirmPasswordNameInvalidForm');
        const confirmNewPassword = document.getElementById('confirm-new-password').value;
        if (confirmNewPassword == '') {
            confirmPasswordNameInvalidForm.textContent = 'Enter a confirm password!';
            stop = true;
        }
        if (newPassword !== confirmNewPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (stop) {
            return;
        }
        const currentThis = this;
        const forgottenPasswordForm = {
            username: currentThis.state.username,
            token: currentThis.getTokenFromUrl(),
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        }
        fetch(process.env.REACT_APP_URL + '/users/update/forgotten-password', {
            method: 'PATCH',
            body: JSON.stringify(forgottenPasswordForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            await response.json();
            if (response.status === 200) {
                alert("The password has been updated!");
                window.location.href = '/login'
                return;
            }
            alert('An error has occurred!');
        })
    }

    getTokenFromUrl = () => {
        const pageURL = window.location.href;
        const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
        return lastURLSegment;
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

}

export default ResetPasswordComponent;