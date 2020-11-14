import React, { Component } from "react";
import ReactDOM from 'react-dom';
import JwtDecoder from './jwt/jwt-decoder';

class ProjectInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: null,
            projectDescription: null,
            pictureResource: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <div class="container">

                    <div class="row">
                        <div class="col-lg-9">

                            <div class="card mt-4">
                                <div id="pic">


                                </div>
                                <div class="card-body">
                                    <h3 class="card-title">{this.state.projectName}</h3>
                                    <p class="card-text">{this.state.projectDescription}</p>
                                </div>
                            </div>

                            <div class="card card-outline-secondary my-4">
                                <div class="card-header">
                                    Comments
      </div>
                                <div id="commendSection" class="card-body">

                                </div>
                            </div>

                        </div>

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
        const token = 'Bearer ' + localStorage.getItem('token');
        fetch(process.env.REACT_APP_URL + '/projects/' + projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(async response => {
            const project = await response.json();
            if (response.status !== 200) {
                alert("The project was not loaded");
                return;
            }
            currentThis.setState({
                projectName: project['name'],
                projectDescription: project['description'],
                pictureResource: process.env.REACT_APP_URL + '/resources/projects/' + projectId
            });
            const commentsArray = [];
            project['comments'].forEach(comment => {
                const shouldBeHidden = currentThis.shouldBeHidden(comment);
                const commentDiv = (<div>
                    <p>{comment['description']}</p>
                    <small all class="text-muted">Posted by: {comment['author']['username']}</small><br></br>
                    <small all class="text-muted">Created at: {comment['createdAt']}</small><br></br>
                    <small all class="text-muted">Updated at: {comment['updatedAt']}</small>
                    <br></br>
                    <button hidden={shouldBeHidden} onClick={() => currentThis.moveToEditProjectComment(comment['id'])} className="btn btn-primary mt-2">Edit</button>
                    <button hidden={shouldBeHidden} onClick={() => currentThis.moveToDeleteProjectComment(comment['id'])} className="btn btn-danger mt-2 ml-2 ">Delete</button>
                    <hr />
                </div >);
                commentsArray.push(commentDiv);
            });
            const addCommentHref = "/projects-comments/" + projectId;
            commentsArray.push((<a href={addCommentHref} class="btn btn-success mt-2">Leave a Comment</a>));
            const commentSection = document.getElementById('commendSection');
            ReactDOM.render(commentsArray, commentSection);
            this.loadPicture(projectId);
        }).catch(error => {
            alert(error);
        })
    }

    loadPicture = (projectId) => {
        fetch(process.env.REACT_APP_URL + '/resources/projects/' + projectId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => response.blob())
            .then(image => {
                const picElement = document.getElementById('pic');
                const outside = URL.createObjectURL(image);
                const pic = (<img class="card-img-top img-fluid" src={outside} alt="" />);
                ReactDOM.render(pic, picElement);
            })
    }

    getProjectIdFromUrl = () => {
        const pageURL = window.location.href;
        const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
        return lastURLSegment;
    }

    moveToEditProjectComment = (commentId) => {
        window.location.href = '/edit-project-comment/' + commentId;
    }

    moveToDeleteProjectComment = (commentId) => {
        window.location.href = '/delete-project-comment/' + commentId;
    }

    shouldBeHidden = (comment) => {
        const token = localStorage.getItem('token');
        const jwtDecoder = new JwtDecoder();
        const decodedToken = jwtDecoder.decodeToken(token);
        console.log(decodedToken['sub'])
        return decodedToken['sub'] !== comment['author']['username']
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
}

export default ProjectInfo;