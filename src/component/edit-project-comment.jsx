import React, { Component } from "react";

class EditProjectComment extends Component {
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
                        <p className="h4 mb-4">Edit Project Comment</p>
                        <div id="emailField" className="form-group">
                            <textarea onChange={this.changeInputField}
                                name="description"
                                className="form-control"
                                id="descriptionInputField"
                                placeholder="Description"
                                value={this.state.description}
                                rows="3"></textarea>
                        </div>
                        <button onClick={this.addComment} className="btn btn-info btn-block">
                            Edit comment
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

    addComment = () => {
        const commentId = this.getCommentIdFromUrl();
        const currentThis = this;
        const editCommentForm = {
            description: currentThis.state.description,
        }
        fetch(process.env.REACT_APP_URL + '/comments/update/' + commentId, {
            method: 'PATCH',
            body: JSON.stringify(editCommentForm),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const comment = await response.json();
            if (response.status !== 200) {
                alert('Comment not updated: ' + response.status);
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

export default EditProjectComment;