import React, { Component } from "react";
import ReactDOM from 'react-dom';

class TaskInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: null,
            taskDescription: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <div class="container">

                    <div class="row">
                        <div class="col-lg-9">

                            <div class="card mt-4">
                                <div class="card-body">
                                    <h3 class="card-title">{this.state.taskName}</h3>
                                    <p class="card-text">{this.state.taskDescription}</p>
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
            currentThis.setState({
                taskName: task['name'],
                taskDescription: task['description']
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

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
}

export default TaskInfo;