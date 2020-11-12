import React, { Component } from "react";

class AddTaskComment extends Component {
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
                        <p className="h4 mb-4">Add Task Comment</p>
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
    }

    addComment = () => {
        const currentThis = this;
        const taskId = this.getProjectIdFromUrl();
        const taskCommentForm = {
            description: currentThis.state.description,
            taskId: taskId
        }
        fetch(process.env.REACT_APP_URL + '/comments/task', {
            method: 'POST',
            body: JSON.stringify(taskCommentForm),
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
            window.location.href = '/tasks/' + taskId;
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

export default AddTaskComment;