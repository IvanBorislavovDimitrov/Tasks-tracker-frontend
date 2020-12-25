import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

class BugBacklogChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <div class="container">
                    <div class="row my-3">
                        <div class="col">
                            <h4>Bugs/Backlog ratio</h4>
                        </div>
                    </div>
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
                                <div class="card-body">
                                    <canvas id="chDonut1"></canvas>
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
        const colors = ['#007bff', '#28a745', '#333333', '#c3e6cb', '#dc3545', '#6c757d'];
        const donutOptions = {
            cutoutPercentage: 85,
            legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } }
        };
        const chDonutData1 = {
            labels: ['Bug', 'Backlog'],
            datasets: [
                {
                    backgroundColor: colors.slice(0, 3),
                    borderWidth: 0,
                    data: [30, 70]
                }
            ]
        };
        const chDonut1 = document.getElementById("chDonut1");
        if (chDonut1) {
            new Chart(chDonut1, {
                type: 'pie',
                data: chDonutData1,
                options: donutOptions
            });
        }
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
}

export default BugBacklogChart;