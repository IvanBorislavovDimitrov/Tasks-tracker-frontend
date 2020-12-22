import React, { Component } from "react";
import ReactDOM from 'react-dom';

class SearchTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="container mt-5">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Create at</th>
                                <th scope="col">Assignee</th>
                            </tr>
                        </thead>
                        <tbody id="searched">

                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const nameParam = urlParams.get('name');
        const searched = document.getElementById('searched');
        fetch(process.env.REACT_APP_URL + '/tasks/search?name=' + nameParam, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const tasks = await response.json();
            console.log(tasks);
            let count = 0;  
            const parsedTasks = [];
            tasks.forEach(task => {
                let assginee = task['assignee'];
                if (assginee != null) {
                    assginee=  task['assignee']['username'];
                } else {
                    assginee = 'unassigned';
                }
                const element = (<tr>
                    <th scope="row">{++count}</th>
                    <td>{task['name']}</td>
                    <td>{task['createdAt']}</td>
                    <td>{assginee}</td>
                </tr>);
                parsedTasks.push(element);
            });
            ReactDOM.render(parsedTasks, searched);
        });
    }

    getTokenFromUrl = () => {
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

export default SearchTasks;