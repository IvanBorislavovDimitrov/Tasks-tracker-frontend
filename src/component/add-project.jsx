import React, { Component } from "react";

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
            picture: null,
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Add Project</p>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="name"
                                type="text"
                                className="form-control"
                                id="nameInputField"
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-group">
                            <textarea onChange={this.changeInputField}
                                name="description"
                                className="form-control"
                                id="descriptionInputField"
                                placeholder="Description"
                                rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <small id="fileHelp" className="form-text text-muted">Picture</small>
                            <input
                                onChange={this.changeInputField}
                                ref={this.picture}
                                type="file"
                                className="custom-file"
                                id="picture"
                                aria-describedby="fileHelp"
                                name="Picture"
                            />
                        </div>
                        <button onClick={this.addProject} className="btn btn-info btn-block">
                            Add
                            </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    addProject = () => {
        const token = localStorage.getItem('token');
        const currentThis = this;
        const addProjectForm = new FormData();
        addProjectForm.append('name', currentThis.state.name);
        addProjectForm.append('description', currentThis.state.description);
        const picture = document.getElementById('picture');
        addProjectForm.append('picture', picture.files[0]);
        fetch(process.env.REACT_APP_URL + '/projects/create', {
            method: 'POST',
            body: addProjectForm,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(async response => {
            await response.json();
            if (response.status !== 200) {
                alert("The project hasn't been added!");
                return;
            }
            alert("The project has been added!");
            window.location.href = '/';
        }).catch(error => alert(error));
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
}

export default AddProject;