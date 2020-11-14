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
                        </div>
                        <div className="form-group">
                            <textarea onChange={this.changeInputField}
                                name="description"
                                className="form-control"
                                id="descriptionInputField"
                                placeholder="Description"
                                rows="3"></textarea>
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
        const token = localStorage.getItem('token');
        const currentThis = this;
        const projectName = document.getElementById('projectNames');
        const addTaskForm = {
            name: currentThis.state.name,
            description: currentThis.state.description,
            projectName: projectName.value
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

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
}

export default AddTask;