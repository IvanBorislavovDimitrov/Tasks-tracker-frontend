import React, { Component } from "react";

class EditProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
            picture: null,
            invalidProjectName: false
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Edit Project</p>
                        <div className="form-group">
                            <input
                                onChange={this.changeInputField}
                                name="name"
                                type="text"
                                className="form-control"
                                id="nameInputField"
                                placeholder="Name"
                            />
                            <div id="projectNameInvalidForm" class="text-danger">

                            </div>
                        </div>
                        <div className="form-group">
                            <textarea onChange={this.changeInputField}
                                name="description"
                                className="form-control"
                                id="descriptionInputField"
                                placeholder="Description"
                                rows="3"></textarea>
                        </div>
                        <div id="descriptionNameInvalidForm" class="text-danger">

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
                            <div id="pictureNameInvalidForm" class="text-danger">

                            </div>
                        </div>
                        <button onClick={this.editProject} className="btn btn-info btn-block">
                            Add
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
            document.getElementById('nameInputField').value = project['name'];
            document.getElementById('descriptionInputField').value = project['description'];
            this.setState({
                name: project['name'],
                description: project['description']
            })
        }).catch(error => {
            alert(error);
        })
    }


    editProject = () => {
        const projectNameInvalidForm = document.getElementById('projectNameInvalidForm');
        const descriptionNameInvalidForm = document.getElementById('descriptionNameInvalidForm');
        const pictureNameInvalidForm = document.getElementById('pictureNameInvalidForm');
        projectNameInvalidForm.textContent = '';
        descriptionNameInvalidForm.textContent = '';
        pictureNameInvalidForm.textContent = '';
        let stop = false;
        if (!this.validateNameForm()) {
            projectNameInvalidForm.textContent = 'Invalid project name';
            stop = true;
        }
        if (!this.validateDescriptionForm()) {
            descriptionNameInvalidForm.textContent = 'Invalid description';
            stop = true;
        }
        if (!this.validatePictureForm()) {
            pictureNameInvalidForm.textContent = 'Picture not added';
            stop = true;
        }
        if (stop) {
            return;
        }
        const token = localStorage.getItem('token');
        const currentThis = this;
        const updateProjectForm = new FormData();
        updateProjectForm.append('name', currentThis.state.name);
        updateProjectForm.append('description', currentThis.state.description);
        const picture = document.getElementById('picture');
        updateProjectForm.append('picture', picture.files[0]);
        const projectId = this.getProjectIdFromUrl();
        fetch(process.env.REACT_APP_URL + '/projects/edit/' + projectId, {
            method: 'POST',
            body: updateProjectForm,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(async response => {
            await response.json();
            if (response.status !== 200) {
                alert("The project hasn't been updated!");
                return;
            }
            alert("The project has been updated!");
            window.location.href = '/';
        }).catch(error => alert(error));
    }

    validateNameForm = () => {
        if (this.state.name == '' || this.state.name == null || this.state.name == undefined) {
            return false;
        }
        return true;
    }

    validateDescriptionForm = () => {
        if (this.state.description == '' || this.state.description == null || this.state.description == undefined) {
            return false;
        }
        return true;
    }

    validatePictureForm = () => {
        if (document.getElementById("picture").files.length == 0) {
            return false;
        }
        return true;
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

export default EditProject;