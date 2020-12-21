import React, { Component } from "react";

class ForgottenPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            hideInvalidUsernamePassword: true
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Forgotten password</p>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="email"
                                type="text"
                                className="form-control"
                                id="usernameInputField"
                                placeholder="Email"
                            />
                        </div>
                        <div id="emailNameInvalidForm" class="text-danger">

                        </div>
                        <br/>
                        <button onClick={this.resetPassword} className="btn btn-info btn-block">
                            Reset password
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    resetPassword = () => {
        let stop = false;
        const emailNameInvalidForm = document.getElementById('emailNameInvalidForm');
        if (!this.validateEmail()) {
            emailNameInvalidForm.textContent = 'Enter an email';
            stop = true;
        }
        if (stop) {
            return;
        }
        const currentThis = this;
        const forgottenPasswordForm = {
            email: currentThis.state.email
        }
        fetch(process.env.REACT_APP_URL + '/users/generate/forgotten-password', {
            method: 'POST',
            body: JSON.stringify(forgottenPasswordForm),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            await response.json();
            if (response.status === 200) {
                alert("An email has been sent! Check!");
                window.location.href = '/';
                return;
            }
            alert('An error has occurred during email validations!');
        })
    }

    validateEmail = () => {
        if (this.state.email == '' || this.state.email == null || this.state.email == undefined) {
            return false;
        }
        return true;
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

}

export default ForgottenPassword;