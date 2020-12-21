import React, { Component } from "react";

class ActivateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
            </React.Fragment>
        );
    }

    async componentDidMount() {
        const activationCode = this.getActivationCodeFromUrl();
        await fetch(process.env.REACT_APP_URL + "/users/activate/" + activationCode, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            await response.json();
            window.location.href = '/login';
        })
    }

    getActivationCodeFromUrl = () => {
        const pageURL = window.location.href;
        const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
        return lastURLSegment;
    }
}

export default ActivateAccount;