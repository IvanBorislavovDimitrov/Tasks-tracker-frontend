import React, { Component } from "react";
import ReactDOM from 'react-dom';

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Add Task</p>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="name"
                                type="text"
                                className="form-control"
                                id="nameInputField"
                                placeholder="Name"
                            />
                            <div id="projectNameInvalidForm" class="text-danger">

                            </div>
                        </div>
                        <div className="form-group">
                            <textarea onChange={this.changeInputField}
                                name="description"
                                className="form-control"
                                id="descriptionInputField"
                                placeholder="Description"
                                rows="3"></textarea>
                        </div>
                        <div id="descriptionNameInvalidForm" class="text-danger">

                        </div>
                        <div class="form-group">
                            <label for="type">Type</label>
                            <select class="form-control" id="type">
                                <option>backlog-item</option>
                                <option>bug</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="projectNames">Project</label>
                            <select class="form-control" id="projectNames">

                            </select>
                        </div>
                        <button onClick={this.addTask} className="btn btn-info btn-block">
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

    addTask = () => {
        const projectNameInvalidForm = document.getElementById('projectNameInvalidForm');
        const descriptionNameInvalidForm = document.getElementById('descriptionNameInvalidForm');
        projectNameInvalidForm.textContent = '';
        descriptionNameInvalidForm.textContent = '';
        let stop = false;
        if (!this.validateNameForm()) {
            projectNameInvalidForm.textContent = 'Invalid project name';
            stop = true;
        }
        if (!this.validateDescriptionForm()) {
            descriptionNameInvalidForm.textContent = 'Invalid description';
            stop = true;
        }
        if (stop) {
            return;
        }
        const token = localStorage.getItem('token');
        const currentThis = this;
        const projectName = document.getElementById('projectNames');
        const taskType = document.getElementById('type').value;
        const addTaskForm = {
            name: currentThis.state.name,
            description: currentThis.state.description,
            projectName: projectName.value,
            type: taskType
        };
        fetch(process.env.REACT_APP_URL + '/tasks/create', {
            method: 'POST',
            body: JSON.stringify(addTaskForm),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            await response.json();
            if (response.status !== 200) {
                alert("The task hasn't been added!");
                return;
            }
            alert("The task has been added!");
            window.location.href = '/';
        }).catch(error => alert(error));
    }

    validateNameForm = () => {
        if (this.state.name == '' || this.state.name == null || this.state.name == undefined) {
            return false;
        }
        return true;
    }

    validateDescriptionForm = () => {
        if (this.state.description == '' || this.state.description == null || this.state.description == undefined) {
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

export default AddTask;