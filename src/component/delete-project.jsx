import React, { Component } from "react";

class DeleteProject extends Component {
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
                        <p className="h4 mb-4">Delete Project</p>
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
                        <button onClick={this.deleteProject} className="btn btn-danger btn-block">
                            Delete
                            </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.loadProject();
    }

    loadProject = () => {
        const currentThis = this;
        const projectId = this.getProjectIdFromUrl();
        fetch(process.env.REACT_APP_URL + '/projects/' + projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const project = await response.json();

            currentThis.setState({
                name: project['name'],
                description: project['description']
            })

        }).catch(error => {
            alert(error);
        })
    }

    deleteProject = () => {
        const projectId = this.getProjectIdFromUrl();
        const token = localStorage.getItem('token');
        const currentThis = this;
        fetch(process.env.REACT_APP_URL + '/projects/' + projectId, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then(async response => {
            await response.json();
            if (response.status !== 200) {
                alert("The project hasn't been deleted!");
                return;
            }
            alert("The project has been deleted!");
            window.location.href = '/';
        }).catch(error => alert(error));
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

export default DeleteProject;