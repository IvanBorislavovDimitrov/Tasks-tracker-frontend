import React, { Component } from "react";

class DeleteProjectComment extends Component {
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
                        <p className="h4 mb-4">Delete Project Comment</p>
                        <div id="emailField" className="form-group">
                            <textarea onChange={this.changeInputField}
                                name="description"
                                className="form-control"
                                id="descriptionInputField"
                                placeholder="Description"
                                disabled="disabled"
                                value={this.state.description}
                                rows="3"></textarea>
                        </div>
                        <button onClick={this.deleteComment} className="btn btn-danger btn-block">
                            Delete comment
                            </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.loadComment();
    }

    loadComment = () => {
        const currentThis = this;
        const commentId = this.getCommentIdFromUrl();
        fetch(process.env.REACT_APP_URL + '/comments/' + commentId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const comment = await response.json();
            currentThis.setState({
                description: comment['description']
            })
        }).catch(error => {
            alert(error);
        })
    }

    deleteComment = () => {
        const commentId = this.getCommentIdFromUrl();
        const currentThis = this;
        fetch(process.env.REACT_APP_URL + '/comments/delete/project/' + commentId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const comment = await response.json();
            if (response.status !== 200) {
                alert('Comment not deleted: ' + response.status);
                return;
            }
            window.location.href = '/projects/' + comment['projectId'];
        }).catch(error => alert(error))
    }

    getCommentIdFromUrl = () => {
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

export default DeleteProjectComment;