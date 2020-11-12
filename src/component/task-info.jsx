import React, { Component } from "react";
import ReactDOM from 'react-dom';

class TaskInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: null,
            taskDescription: null,
            taskAssignee: null,
            taskState: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <div class="container">

                    <div class="row">
                        <div class="col-lg-9">

                            <div class="card mt-3">
                                <div class="card-body">
                                    <h3 class="card-title">{this.state.taskName}</h3>
                                    <p class="card-text">Description: {this.state.taskDescription}</p>
                                    <p class="card-text">Assignee: {this.state.taskAssignee}</p>
                                    <p class="card-text">State: {this.state.taskState}</p>
                                    <div>
                                        <h4 className="mt-2 mb-2">Actions</h4>
                                        <div div="row">
                                            <button onClick={() => this.setStateTo('backlog')} className="btn btn-primary">Move to Backlog</button>
                                            <button onClick={() => this.setStateTo('selected')} className="btn btn-primary ml-2">Move to Selected</button>
                                            <button onClick={() => this.setStateTo('in_progress')} className="btn btn-primary ml-2">Move to In Progress</button>
                                            <button onClick={() => this.setStateTo('blocked')} className="btn btn-primary ml-2">Move to In Blocked</button>
                                            <button onClick={() => this.setStateTo('completed')} className="btn btn-success ml-2">Move to Completed</button>
                                        </div>
                                        <div div="row"><h1></h1>
                                            <button onClick={this.assignToMe} className="btn btn-danger">Assign to me</button>
                                            <button className="btn btn-primary ml-2">Edit</button>
                                            <button className="btn btn-danger ml-2">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card card-outline-secondary my-4">
                                <div class="card-header">
                                    Comments
      </div>
                                <div id="commendSection" class="card-body">

                                </div>
                            </div>

                        </div>

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
                taskName: task['name'],
                taskDescription: task['description'],
                taskAssignee: assignee,
                taskState: task['state']
            })
            const commentsArray = [];
            task['comments'].forEach(comment => {
                const commentDiv = (<div>
                    <p>{comment['description']}</p>
                    <small all class="text-muted">Posted by: {comment['author']['username']}</small>
                    <hr />
                </div>);
                commentsArray.push(commentDiv);
            });
            const addCommentHref = "/task-comments/" + taskId;
            commentsArray.push((<a href={addCommentHref} class="btn btn-success mt-2">Leave a Comment</a>));
            const commentSection = document.getElementById('commendSection');
            ReactDOM.render(commentsArray, commentSection);

        }).catch(error => {
            alert(error);
        })
    }

    getTaskFromUrl = () => {
        const pageURL = window.location.href;
        const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
        return lastURLSegment;
    }

    assignToMe = () => {
        const taskId = this.getTaskFromUrl();
        fetch(process.env.REACT_APP_URL + '/tasks/assign/' + taskId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const task = await response.json();
            if (response.status !== 200) {
                alert('Not assigned!');
                return;
            }
            window.location.reload();
        });
    }

    setStateTo = (state) => {
        const taskId = this.getTaskFromUrl();
        const taskStateForm = {
            state: state
        }
        fetch(process.env.REACT_APP_URL + '/tasks/alter-state/' + taskId, {
            method: 'PATCH',
            body: JSON.stringify(taskStateForm),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const task = await response.json();
            if (response.status !== 200) {
                alert('Task not moved');
                return;
            }
            window.location.reload();
        })
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
}

export default TaskInfo;