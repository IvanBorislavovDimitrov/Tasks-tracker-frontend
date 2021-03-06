import React, { Component } from "react";
import ReactDOM from 'react-dom';

class ProjectTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <React.Fragment>
                <table class="table table-bordered ">
                    <thead>
                        <tr>
                            <th scope="col">Backlog</th>
                            <th scope="col">Selected</th>
                            <th scope="col">In Progress</th>
                            <th scope="col">Blocked</th>
                            <th scope="col">Completed (not released)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="backlog" style={{ width: '22rem' }}>

                            </td>
                            <td id="selected" style={{ width: '22rem' }}>

                            </td>
                            <td id="inProgress" style={{ width: '22rem' }}>

                            </td>
                            <td id="blocked" style={{ width: '22rem' }}>

                            </td>
                            <td id="completed" style={{ width: '22rem' }}>
                            
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.loadTasks();
    }

    loadTasks = () => {
        const projectId = this.getProjectIdFromUrl();
        const token = 'Bearer ' + localStorage.getItem('token');
        fetch(process.env.REACT_APP_URL + '/tasks/project/unreleased/' + projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(async response => {
            const tasks = await response.json();
            if (response.status !== 200) {
                alert('Tasks were not loaded');
                return;
            }
            const backlogItems = [];
            const selectedItems = [];
            const inProgressItems = [];
            const blockedItems = [];
            const completedItems = [];
            tasks.forEach(task => {
                let assigneeName = task['assignee'];
                if (assigneeName == null) {
                    assigneeName = 'No assignee'
                } else {
                    assigneeName = task['assignee']['username'];
                }
                const taskHref = '/tasks/' + task['id'];
                const backlogItem = (
                    <div class="card-advanced h-100 mb-3" style={{ width: '22rem' }}>
                        <div class="card-body">
                            <h4 class="card-title">{task['name']}</h4>
                            <p class="card-text">Assignee: {assigneeName}</p>
                        </div>
                        <div class="card-footer">
                            <a href={taskHref} class="btn btn-primary">More Info!</a>
                        </div>
                    </div>
                );
                if (task['state'] == 'BACKLOG') {
                    backlogItems.push(backlogItem);
                } else if (task['state'] == 'SELECTED') {
                    selectedItems.push(backlogItem);
                } else if (task['state'] == 'IN_PROGRESS') {
                    inProgressItems.push(backlogItem);
                } else if (task['state'] == 'BLOCKED') {
                    blockedItems.push(backlogItem);
                } else if (task['state'] == 'COMPLETED') {
                    completedItems.push(backlogItem);
                } else {
                    alert('State not found: ' + task['state']);
                }
            });
            const backlog = document.getElementById('backlog');
            ReactDOM.render(backlogItems, backlog);
            const selected = document.getElementById('selected');
            ReactDOM.render(selectedItems, selected);
            const inProgress = document.getElementById('inProgress');
            ReactDOM.render(inProgressItems, inProgress);
            const blocked = document.getElementById('blocked');
            ReactDOM.render(blockedItems, blocked);
            const completed = document.getElementById('completed');
            ReactDOM.render(completedItems, completed);
        }).catch(error => {
            alert(error);
        })
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

export default ProjectTasks;