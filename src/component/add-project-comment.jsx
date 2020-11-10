import React, { Component } from "react";

class AddProjectComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 mt-4 container">
                    <div className="text-center border-light p-5">
                        <p className="h4 mb-4">Add Project Comment</p>
                        <div id="emailField" className="form-group">
                            <textarea onChange={this.changeInputField}
                                name="description"
                                className="form-control"
                                id="descriptionInputField"
                                placeholder="Description"
                                rows="3"></textarea>
                        </div>
                        <button onClick={this.addComment} className="btn btn-info btn-block">
                            Add comment
                            </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        console.log('mitko')
    }

    addComment = () => {
        const currentThis = this;
        const projectId = this.getProjectIdFromUrl();
        const registerForm = {
            description: currentThis.state.description,
            projectId: projectId
        }
        fetch(process.env.REACT_APP_URL + '/comments/project', {
            method: 'POST',
            body: JSON.stringify(registerForm),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const comment = await response.json();
            if (response.status !== 200) {
                alert('Comment not added: ' + response.status);
                return;
            }
            window.location.href = '/projects/' + projectId;
        }).catch(error => alert(error))
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

export default AddProjectComment;