import { configure } from "@testing-library/react";
import React, { Component } from "react";
import ReactDOM from 'react-dom';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfilePictureName: null,
            userId: null,
            userDescription: null
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
                                <li class="nav-item">
                                    <a href="" data-target="#change-password" data-toggle="tab" class="nav-link">Change password</a>
                                </li>
                            </ul>
                            <div class="tab-content py-4">
                                <div class="tab-pane active" id="profile">
                                    <h5 class="mb-3">User Profile</h5>
                                    <p id="username"></p>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h5 class="mt-2"><span class="fa fa-clock-o ion-clock float-right"></span>Last 10 logins</h5>
                                            <table class="table table-sm table-hover table-striped">
                                                <tbody id="last-10-logins">

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="assigned">
                                    <table class="table table-hover table-striped">
                                        <tbody id="assigned-items">
 

                                        </tbody>
                                    </table>
                                </div>
                                <div class="tab-pane" id="change-password">
                                    <form role="form">
                                    <div class="form-group row">
                                            <label class="col-lg-3 col-form-label form-control-label">Current password</label>
                                            <div class="col-lg-9">
                                                <input id="current-password" class="form-control" type="password" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-lg-3 col-form-label form-control-label">New Password</label>
                                            <div class="col-lg-9">
                                                <input id="new-password" class="form-control" type="password" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-lg-3 col-form-label form-control-label">Confirm new password</label>
                                            <div class="col-lg-9">
                                                <input id="confirm-new-password" class="form-control" type="password" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-lg-3 col-form-label form-control-label"></label>
                                            <div class="col-lg-9">
                                                <input onClick={this.updatePassword} type="button" class="btn btn-primary" value="Save Changes" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 order-lg-1 text-center">
                            <div id="profilePictureSection">
                            </div>
                            <br />
                            <div class="form-group">
                                <label for="pictureInput">Change profile picture</label>
                                <input id="pictureInput" type="file" class="ml-5 form-control-file" id="pictureInput" />
                            </div>
                            <button  onClick={this.updateProfilePicture} className="btn btn-primary">Update</button>
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
        await fetch(process.env.REACT_APP_URL + '/users/logged-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const user = await response.json();
            const username = document.getElementById('username');
            username.innerHTML = 'Username: ' + user['username'];
            const last10Logins = document.getElementById('last-10-logins');
            const parsed10Logins = [];
            user['loginRecords'].forEach(loginRecord => {
                const element = (<tr>
                    <td>
                        <strong>{user['username']}</strong> logged at: {loginRecord['createdAt']}...
                    </td>
                </tr>);
                parsed10Logins.push(element);
            });
            ReactDOM.render(parsed10Logins, last10Logins);
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

    updateProfilePicture = () => {
        const updateProfilePicture = new FormData();
        const picture = document.getElementById('pictureInput');
        updateProfilePicture.append('profilePicture', picture.files[0]);
        fetch(process.env.REACT_APP_URL + '/users/update/profile-picture', {
            method: 'PATCH',
            body: updateProfilePicture,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            await response.json();
            if (response.status !== 200) {
                alert("An error occurred while updating the profile picture!");
                return;
            }
            alert("The profile picture was updated!");
            window.location.href = '/users/profile';
        }).catch(error => alert(error));
    }

    updatePassword = () => {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmNewPassword = document.getElementById('confirm-new-password').value;
        if (currentPassword == '' || newPassword == '' || confirmNewPassword == '') {
            alert("All fields are required!");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            alert("Passwords do not match!");
            return;
        }
        const updatePasswordRequestModel = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        }
        fetch(process.env.REACT_APP_URL + '/users/update/password', {
            method: 'PATCH',
            body: JSON.stringify(updatePasswordRequestModel),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            await response.json();
            if (response.status == 403) {
                alert('Invalid current password!');
                return;
            }
            if (response.status !== 200) {
                alert('Error: password has not been updated!');
                return;
            }
            alert('Password has been updated!');
            window.location.href = '/users/profile';
        })
    }

}

export default UserProfile;