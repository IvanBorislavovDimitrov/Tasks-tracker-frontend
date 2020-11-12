import React, { Component } from "react";

class DeleteTask extends Component {
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
                        <p className="h4 mb-4">Delete Task</p>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="name"
                                type="text"
                                className="form-control"
                                id="nameInputField"
                                placeholder="Name"
                                disabled="disabled"
                                value={this.state.name}
                            />
                        </div>
                        <div className="form-group">
                            <textarea onChange={this.changeInputField}
                                name="description"
                                disabled="disabled"
                                className="form-control"
                                id="descriptionInputField"
                                placeholder="Description"
                                value={this.state.description}
                                rows="3">
                            </textarea>
                        </div>

                        <button onClick={this.deleteTask} className="btn btn-danger btn-block">
                            Delete
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

    deleteTask = () => {
        const taskId = this.getTaskFromUrl();
        const token = localStorage.getItem('token');
        const currentThis = this;
        fetch(process.env.REACT_APP_URL + '/tasks/delete/' + taskId, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            await response.json();
            if (response.status !== 200) {
                alert("The task hasn't been deleted!");
                return;
            }
            alert("The task has been deleted!");
            window.location.href = '/';
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

export default DeleteTask;