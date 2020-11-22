import React, { Component } from "react";
import ReactDOM from 'react-dom';

class ProjectReleases extends Component {
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
                    <h1 class="display-3 text-center">Releases</h1>
                </header>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Version</th>
                            <th scope="col">Created at</th>
                            <th scope="col">Check tasks</th>
                        </tr>
                    </thead>
                    <tbody id="releases">

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
        const projectId = this.getProjectIdFromUrl();
        fetch(process.env.REACT_APP_URL + '/releases/project/' + projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const releases = await response.json();
            if (response.status !== 200) {
                alert('Releases not loaded!');
                return;
            }
            let counter = 0;
            const releasesArray = [];
            releases.forEach(release => {
                counter++;
                const releaseRow = (<tr>
                    <th scope="row">{counter}</th>
                <td>{release['version']}</td>
                <td>{release['createdAt']}</td>
                <td><button onClick={() => currentThis.redirectToTask(release['id'])} className="btn btn-success btn-sm">Show Tasks</button></td>
                </tr>);
                releasesArray.push(releaseRow);
            });
            const releaseDiv = document.getElementById('releases');
            ReactDOM.render(releasesArray, releaseDiv);
        });
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

    redirectToTask = (releaseTasksResource) => {
        window.location.href = '/releases/tasks/' + releaseTasksResource;
    }
}

export default ProjectReleases;