import React, { Component } from "react";
import ReactDOM from 'react-dom';

class AddUserToProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            projectName: null,
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Add User to Project</p>
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
                        <div class="form-group">
                            <label for="projectNames">Project</label>
                            <select class="form-control" id="projectNames">

                            </select>
                        </div>
                        <button onClick={this.addUserToProject} className="btn btn-info btn-block">
                            Add
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

    addUserToProject = () => {
        const token = localStorage.getItem('token');
        const currentThis = this;
        const addUserToProjectName = {
            username: currentThis.state.username,
            projectName: currentThis.state.projectName
        };
        fetch(process.env.REACT_APP_URL + '/projects/add-user-to-project', {
            method: 'POST',
            body: JSON.stringify(addUserToProjectName),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            await response.json();
            if (response.status !== 200) {
                alert("The user hasn't been added to the project!");
                return;
            }
            alert("The user has been added to the project!");
            window.location.href = '/';
        }).catch(error => alert(error));
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
}

export default AddUserToProject;