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
                        <div class="form-group">
                            <label for="projectNames">Project</label>
                            <select class="form-control" id="projectNames">

                            </select>
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
        this.loadProjects();
    }

    loadProjects = () => {
        fetch(process.env.REACT_APP_URL + '/projects', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const projects = await response.json();
            if (response.status !== 200) {
                alert("Projects were not loaded!");
                return;
            }
            const projectElements = [];
            projects.forEach(project => {
                const projectElementSelect = (<option>{project['name']}</option>);
                projectElements.push(projectElementSelect);
            });
            const projectNamesSection = document.getElementById('projectNames');
            ReactDOM.render(projectElements, projectNamesSection);
        })
    }

    releaseProject = () => {
        const token = localStorage.getItem('token');
        const currentThis = this;
        const projectNamesSection = document.getElementById('projectNames');
        const projectName = projectNamesSection.value;
        const releaseForm = {
            version: currentThis.state.version,
            projectName: projectName
        };
        fetch(process.env.REACT_APP_URL + '/projects/release', {
            method: 'POST',
            body: JSON.stringify(releaseForm),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            await response.json();
            if (response.status !== 200) {
                alert("The project has been released!");
                return;
            }
            alert("The project hasn't been released!");
            window.location.href = '/';
        }).catch(error => alert(error));
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
}

export default ReleaseProject;