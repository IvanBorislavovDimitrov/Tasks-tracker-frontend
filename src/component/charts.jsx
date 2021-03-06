import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <div class="container">

                    {/* <div class="row my-2">
                        <div class="col-md-6 py-1">
                            <div class="card">
                                <div class="card-body">
                                    <canvas id="chLine"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 py-1">
                            <div class="card">
                                <div class="card-body">
                                    <canvas id="chBar"></canvas>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div class="row py-2">
                        <div class="col-md-4 py-1">
                            <div class="card">
                                <div class="col text-center mt-3">
                                    <h4>Bugs/Backlog ratio chart</h4>
                                </div>
                                <div class="card-body">
                                    <canvas id="backlogs-bugs-donut"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 py-1">
                            <div class="card">
                                <div class="col text-center mt-3">
                                    <h4>Tasks states chart</h4>
                                </div>
                                <div class="card-body">
                                    <canvas id="tasks-states-donut"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 py-1">
                            <div class="card">
                                <div class="col text-center mt-3">
                                    <h4>Admins/Users chart</h4>
                                </div>
                                <div class="card-body">
                                    <canvas id="admins-users-donut"></canvas>
                                </div>
                            </div>
                        </div>
                        {/* <div class="col-md-4 py-1">
                            <div class="card">
                                <div class="card-body">
                                    <canvas id="chDonut2"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 py-1">
                            <div class="card">
                                <div class="card-body">
                                    <canvas id="chDonut3"></canvas>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.loadBacklogsBugsStatistic();
        this.loadTasksStatesStatistic();
        this.loadAdminsUsersStatistic();
    }

    loadBacklogsBugsStatistic = () => {
        const currentThis = this;
        const projectId = this.getProjectIdFromUrl();
        fetch(process.env.REACT_APP_URL + '/projects/backlogs-bugs/' + projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            if (response.status !== 200) {
                alert("Statistics haven't been loaded. Please reload the page!");
                return;
            }
            const backlogsBugs = await response.json();
            currentThis.loadBacklogsBugsChart(backlogsBugs['backlogsCount'], backlogsBugs['bugsCount']);
        }).catch(error => alert(error));
    }

    loadTasksStatesStatistic = () => {
        const currentThis = this;
        const projectId = this.getProjectIdFromUrl();
        fetch(process.env.REACT_APP_URL + '/projects/tasks-statistics/' + projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            if (response.status !== 200) {
                alert("Statistics haven't been loaded. Please reload the page!");
                return;
            }
            const tasksStates = await response.json();
            currentThis.loadTasksStatesChart(tasksStates['backlogItems'], tasksStates['selectedItems'],
                tasksStates['inProgressItems'], tasksStates['blockedItems'], tasksStates['completedItems']);
        }).catch(error => alert(error));
    }

    loadAdminsUsersStatistic = () => {
        const currentThis = this;
        const projectId = this.getProjectIdFromUrl();
        fetch(process.env.REACT_APP_URL + '/projects/admins-users/' + projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            if (response.status !== 200) {
                alert("Statistics haven't been loaded. Please reload the page!");
                return;
            }
            const adminsUsers = await response.json();
            currentThis.loadAdminsUsersChart(adminsUsers['adminsCount'], adminsUsers['usersCount']);
        }).catch(error => alert(error));
    }

    loadBacklogsBugsChart = (backlogsCount, bugsCount) => {
        if (backlogsCount == 0 && bugsCount == 0) {
            backlogsCount = -1;
            bugsCount = -1;
        }
        const colors = ['#007bff', '#28a745', '#333333', '#c3e6cb', '#dc3545', '#6c757d'];
        const donutOptions = {
            cutoutPercentage: 60,
            legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } }
        };
        const backlogsBugsData = {
            labels: ['Bug', 'Backlog'],
            datasets: [
                {
                    backgroundColor: colors.slice(0, 3),
                    borderWidth: 0,
                    data: [backlogsCount, bugsCount]
                }
            ]
        };
        const backlogsBugsDonut = document.getElementById("backlogs-bugs-donut");
        if (backlogsBugsDonut) {
            new Chart(backlogsBugsDonut, {
                type: 'pie',
                data: backlogsBugsData,
                options: donutOptions
            });
        }

    }

    loadTasksStatesChart = (backlogItems, selectedItems, inProgressItems, blockedItems, completedItems) => {
        if (backlogItems == 0 && selectedItems == 0 && inProgressItems == 0 && blockedItems == 0 && completedItems == 0) {
            backlogItems = -1;
            selectedItems = -1;
            inProgressItems = -1;
            blockedItems = -1;
            completedItems = -1;
        }
        const colors = ['#007bff', '#28a745', '#333333', '#c3e6cb', '#dc3545', '#6c757d'];
        const donutOptions = {
            cutoutPercentage: 60,
            legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } }
        };

        const tasksStatesData = {
            labels: ['Backlog', 'Selected', 'In Progress', 'Blocked', 'Completed'],
            datasets: [
                {
                    backgroundColor: colors.slice(0, 5),
                    borderWidth: 0,
                    data: [backlogItems, selectedItems, inProgressItems, blockedItems, completedItems]
                }
            ]
        };
        const tasksStatesDonut = document.getElementById("tasks-states-donut");
        if (tasksStatesDonut) {
            new Chart(tasksStatesDonut, {
                type: 'pie',
                data: tasksStatesData,
                options: donutOptions
            });
        }
    }

    loadAdminsUsersChart = (adminsCount, usersCount) => {
        if (adminsCount == 0 && usersCount == 0) {
            adminsCount = -1;
            usersCount = -1;
        }
        const colors = ['#007bff', '#28a745', '#333333', '#c3e6cb', '#dc3545', '#6c757d'];
        const donutOptions = {
            cutoutPercentage: 60,
            legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } }
        };

        const adminsUsersData = {
            labels: ['Admins','Users'],
            datasets: [
                {
                    backgroundColor: colors.slice(0, 5),
                    borderWidth: 0,
                    data: [adminsCount, usersCount]
                }
            ]
        };
        const adminsUsersDonut = document.getElementById("admins-users-donut");
        if (adminsUsersDonut) {
            new Chart(adminsUsersDonut, {
                type: 'pie',
                data: adminsUsersData,
                options: donutOptions
            });
        }
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    getProjectIdFromUrl = () => {
        const pageURL = window.location.href;
        const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
        return lastURLSegment;
    }
}

export default Charts;