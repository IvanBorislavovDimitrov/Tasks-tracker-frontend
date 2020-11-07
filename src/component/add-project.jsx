import React, { Component } from "react";

class AddProject extends Component {
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
        const addProjectForm = {
            name: currentThis.state.name,
            description: currentThis.state.description
        };
        fetch(process.env.REACT_APP_URL + '/projects/create', {
            method: 'POST',
            body: JSON.stringify(addProjectForm),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
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