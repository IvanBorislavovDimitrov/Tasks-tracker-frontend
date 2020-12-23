import { configure } from "@testing-library/react";
import React, { Component } from "react";
import ReactDOM from 'react-dom';

class OtherUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfilePictureName: null,
            userId: null,
        };
    }

    render() {
        return (
            <React.Fragment>
                <div class="container">
                    <div class="row my-2">
                        <div class="col-lg-8 order-lg-2">
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a href="" data-target="#profile" data-toggle="tab" class="nav-link active">Profile</a>
                                </li>
                                <li class="nav-item">
                                    <a href="" data-target="#assigned" data-toggle="tab" class="nav-link">Assigned Items</a>
                                </li>
                            </ul>
                            <div class="tab-content py-4">
                                <div class="tab-pane active" id="profile">
                                    <h5 class="mb-3">User Profile</h5>
                                    <p id="username"></p>
                                </div>
                                <div class="tab-pane" id="assigned">
                                    <table class="table table-hover table-striped">
                                        <tbody id="assigned-items">
 

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <div class="col-lg-4 order-lg-1 text-center">
                            <div id="profilePictureSection">
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    async componentDidMount() {
        await this.loadUser();
        console.log(this.state.userProfilePictureName);
        this.loadProfilePicture(this.state.userProfilePictureName, this.state.userId);
    }

    loadUser = async () => {
        const currentThis = this;
        const userId = this.getUserIdFromUrl();
        await fetch(process.env.REACT_APP_URL + '/users/extended/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const user = await response.json();
            const username = document.getElementById('username');
            username.innerHTML = 'Username: ' + user['username'];
            this.setState({
                userProfilePictureName: user['profilePictureName'],
                userId: user['id']
            });
            const assignedItems = document.getElementById('assigned-items');
            const parsedTasks = [];
            user['tasks'].forEach(task => {
                const hostDomain = window.location.href.split('/')[0];
                const url = hostDomain + '/tasks/' + task['id'];
                const element = (<tr>
                    <td>
                        <span class="float-right"><a href={url}>Open backlog item</a></span>{task['name']}
                    </td>
                </tr>);
                parsedTasks.push(element);
            });
            ReactDOM.render(parsedTasks, assignedItems);
        }).catch(error => alert(error));
    }

    loadProfilePicture = (profilePictureName, userId) => {
        const profilePictureSection = document.getElementById('profilePictureSection');
        if (profilePictureName == null) {
            const element = (<img src="//placehold.it/150" class="mx-auto img-fluid img-circle d-block" height="260px" width="260px" alt="avatar" />);
            ReactDOM.render(element, profilePictureSection);
        } else {
            fetch(process.env.REACT_APP_URL + '/resources/users/profile-picture/' + userId, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => response.blob())
            .then(image => {
                const outside = URL.createObjectURL(image);
                console.log(outside);
                const element = (<img src={outside} class="mx-auto img-fluid img-circle d-block" height="260px" width="260px" alt="//placehold.it/150" />);
                ReactDOM.render(element, profilePictureSection);
            })
        }
    }

    getUserIdFromUrl = () => {
        const pageURL = window.location.href;
        const lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
        return lastURLSegment;
    }

}

export default OtherUserProfile;