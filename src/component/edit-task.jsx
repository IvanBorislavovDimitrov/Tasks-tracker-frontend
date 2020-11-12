import React, { Component } from "react";

class EditTask extends Component {
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
                        <p className="h4 mb-4">Edit Task</p>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="name"
                                type="text"
                                className="form-control"
                                id="nameInputField"
                                placeholder="Name"
                                value={this.state.name}
                            />
                        </div>
                        <div className="form-group">
                            <textarea onChange={this.changeInputField}
                                name="description"
                                className="form-control"
                                id="descriptionInputField"
                                placeholder="Description"
                                value={this.state.description}
                                rows="3">
                            </textarea>
                        </div>

                        <button onClick={this.editTask} className="btn btn-info btn-block">
                            Edit
                            </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.loadTask();
    }

    loadTask = () => {
        const currentThis = this;
        const taskId = this.getTaskFromUrl();
        fetch(process.env.REACT_APP_URL + '/tasks/' + taskId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const task = await response.json();
            let assignee = "No assignee";
            if (task['assignee'] != null && task['assignee'] != undefined) {
                assignee = task['assignee']['username'];
            }
            currentThis.setState({
                name: task['name'],
                description: task['description']
            })

        }).catch(error => {
            alert(error);
        })
    }

    editTask = () => {
        const taskId = this.getTaskFromUrl();
        const token = localStorage.getItem('token');
        const currentThis = this;
        const editTaskForm = {
            name: currentThis.state.name,
            description: currentThis.state.description
        };
        fetch(process.env.REACT_APP_URL + '/tasks/update/' + taskId, {
            method: 'PATCH',
            body: JSON.stringify(editTaskForm),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            await response.json();
            if (response.status !== 200) {
                alert("The task hasn't been updated!");
                return;
            }
            alert("The task has been updated!");
            window.location.href = '/tasks/' + taskId;
        }).catch(error => alert(error));
    }

    getTaskFromUrl = () => {
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

export default EditTask;