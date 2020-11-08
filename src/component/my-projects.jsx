import React, { Component } from "react";
import ReactDOM from 'react-dom';

class MyProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <React.Fragment>
                <div class="container">

                    <header class="jumbotron my-4">
                        <h1 class="display-3 text-center">My Projects</h1>
                    </header>

                    <div id="projects" class="row text-center">

                    </div>

                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.loadProjects();
    }

    loadProjects = () => {
        const token = 'Bearer ' + localStorage.getItem('token');
        fetch(process.env.REACT_APP_URL + '/projects/my-projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(async response => {
            const projects = await response.json();
            let elements = [];
            projects.forEach(project => {
                const href = '/projects/' + project['id'];
                const projectTasksHref = '/project-tasks/' + project['id'];
                const projectElement = (<div id={project['id']} class="col-lg-3 col-md-6 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h4 class="card-title">{project['name']}</h4>
                            <p class="card-text">{project['description']}</p>
                        </div>
                        <div class="card-footer">
                            <a href={href} class="btn btn-primary">More Info!</a>
                            <a href={projectTasksHref} class="ml-3 btn btn-success">Check Tasks!</a>
                        </div>
                    </div>
                </div>);
                elements.push(projectElement);
            });
            const projectsDiv = document.getElementById('projects');
            ReactDOM.render(elements, projectsDiv);
        }).catch(error => {
            alert(error);
        });
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
}

export default MyProjects;