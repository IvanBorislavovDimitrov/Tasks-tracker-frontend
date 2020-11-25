import React, { Component } from "react";
import ReactDOM from 'react-dom';

class ReleaseProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: null,
            projectName: null,
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Release project</p>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="version"
                                type="text"
                                className="form-control"
                                id="versionInputField"
                                placeholder="Version"
                            />
                        </div>

                        <button onClick={this.releaseProject} className="btn btn-info btn-block">
                            Release
                            </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
    }

    releaseProject = () => {
        const token = localStorage.getItem('token');
        const currentThis = this;
        const projectId = this.getProjectIdFromUrl();
        const releaseForm = {
            version: currentThis.state.version,
            projectId: projectId
        };
        fetch(process.env.REACT_APP_URL + '/releases', {
            method: 'POST',
            body: JSON.stringify(releaseForm),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            const responseJson = await response.json();
            if (response.status == 400) {
                alert(responseJson['message']);                
                return;
            }
            if (response.status != 200) {
                alert("The project hasn't been released!");
                return;
            }
            alert("The project has been released!");
            window.location.href = '/';
        }).catch(error => alert(error));
    }

    getProjectIdFromUrl = () => {
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

export default ReleaseProject;