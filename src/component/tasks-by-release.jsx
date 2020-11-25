import React, { Component } from "react";
import ReactDOM from 'react-dom';

class TasksByRelease extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <header class="jumbotron my-4">
                    <h1 class="display-3 text-center">Tasks by release</h1>
                </header>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Created at</th>
                            <th scope="col">Check task</th>
                        </tr>
                    </thead>
                    <tbody id="tasks">

                    </tbody>
                </table>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.loadReleasesByProjectId();
    }

    loadReleasesByProjectId = () => {
        const currentThis = this;
        const releaseId = this.getReleaseIdFromUrl();
        fetch(process.env.REACT_APP_URL + '/tasks/release/' + releaseId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const tasks = await response.json();
            if (response.status !== 200) {
                alert('Tasks not loaded!');
                return;
            }
            let counter = 0;
            const tasksArray = [];
            tasks.forEach(task => {
                counter++;
                const tasksRow = (<tr>
                    <th scope="row">{counter}</th>
                    <td>{task['name']}</td>
                    <td>{task['createdAt']}</td>
                    <td><button onClick={() => currentThis.redirectToTask(task['id'])} className="btn btn-success btn-sm">Show Task</button></td>
                </tr>);
                tasksArray.push(tasksRow);
            });
            const tasksDiv = document.getElementById('tasks');
            ReactDOM.render(tasksArray, tasksDiv);
        });
    }

    getReleaseIdFromUrl = () => {
        const pageURL = window.location.href;
        const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
        return lastURLSegment;
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    redirectToTask = (releaseTasksResource) => {
        window.location.href = '/tasks/' + releaseTasksResource;
    }
}

export default TasksByRelease;