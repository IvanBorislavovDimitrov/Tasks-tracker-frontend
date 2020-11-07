import React, { Component } from "react";

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
            projectName: null
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
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="projectName"
                                type="text"
                                className="form-control"
                                id="projectNameInputField"
                                placeholder="Project Name"
                            />
                        </div>
                        <button onClick={this.addTask} className="btn btn-info btn-block">
                            Add
                            </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    addTask = () => {
        const token = localStorage.getItem('token');
        const currentThis = this;
        const addTaskForm = {
            name: currentThis.state.name,
            description: currentThis.state.description,
            projectName: currentThis.state.projectName
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