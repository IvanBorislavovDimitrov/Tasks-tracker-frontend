import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ChangeUserRole extends Component {
    state = {
        seen: false,
        username: null,
        usernameRoleChange: null,
        roles: null
    };

    render() {
        return (
            <React.Fragment>
                <div className="col-md-4 container">
                    <div className="text-center">
                        <div id="rolesTable" className="container mt-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Add role</th>
                                        <th scope="col">Remove role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="adminTR">
                                        <th scope="row">1</th>
                                        <td>Admin</td>
                                        <td>
                                            <button onClick={() => this.addRole('ADMIN')} className="btn btn-primary">Add role
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => this.removeRole('ADMIN')} className="btn btn-danger">Remove role
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-md-7 container">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Username</label>
                                    <input
                                        onChange={this.changeInputField}
                                        name="username"
                                        type="text"
                                        className="form-control"
                                        id="usernameInputField"
                                        placeholder="Enter username"
                                    />
                                </div>
                                {this.checkUser()}
                            </form>
                        </div>

                        <div className="col-md-7 mt-4 container">
                            <form onSubmit={this.updateRoles}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Username</label>
                                    <input
                                        onChange={this.changeInputField}
                                        name="usernameRoleChange"
                                        type="text"
                                        className="form-control"
                                        id="usernameInputField"
                                        placeholder="Enter username"
                                    />
                                </div>
                                <div id="passwordField" className="form-group">
                                    <label htmlFor="exampleInputPassword">Roles</label>
                                    <input
                                        onChange={this.changeInputField}
                                        disabled="disabled"
                                        name="roles"
                                        type="text"
                                        className="form-control"
                                        id="roles"
                                        placeholder="Roles"
                                        value="USER"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Change roles</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    componentDidMount() {
        const userRoles = localStorage.getItem('userRoles');
        if (userRoles == null || !userRoles.includes('ROLE_ADMIN')) {
            this.props.history.push('/not-found');
            return;
        }
    }

    addRole = (role) => {
        const rolesField = document.getElementById('roles');
        const currentRoles = rolesField.value.split(' ');
        if (!currentRoles.includes(role)) {
            rolesField.value = rolesField.value + " " + role;
        }
    }

    removeRole = (role) => {
        const rolesField = document.getElementById('roles');
        const currentRoles = rolesField.value.split(' ');
        const updatedRoles = [];
        currentRoles.forEach(currentRole => {
            if (currentRole != role) {
                updatedRoles.push(currentRole);
            }
        });
        rolesField.value = updatedRoles.join(' ');
    }

    checkUser = () => {
        return (
            <React.Fragment>
                <Button variant="primary" onClick={this.showPopAndFetchUsers}>
                    Check users
                </Button>
                <Modal show={this.state.seen} animation={true}>
                    <Modal.Header>
                        <Modal.Title>Users</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="users"></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hidePop}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }

    showPopAndFetchUsers = () => {
        this.setState({
            seen: true
        });
        this.getUsersByUsernameInput();
    };

    hidePop = () => {
        this.setState({
            seen: false
        });
    };

    getUsersByUsernameInput = () => {
        let currentThis = this;

        async function getUsersByUsername() {
            const usersResponse = await fetch(process.env.REACT_APP_URL + '/users/filter?username=' + currentThis.state.username, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            return usersResponse;
        }

        getUsersByUsername().then(async response => {
            if (response.status === 200) {
                const usersWrapper = await response.json();
                const usersModel = document.getElementById('users');
                console.log(usersWrapper['users'])
                const usernames = usersWrapper['users'].map(user => user['username']);
                if (usernames != '') {
                    usersModel.textContent = usernames.join(', ');
                }
            } else {
                alert('Error while fetching users!');
            }
        });
    }

    updateRoles = (event) => {
        event.preventDefault();
        const rolesField = document.getElementById('roles');
        const currentRoles = rolesField.value.split(' ');
        let currentThis = this;

        async function update() {
            const usersResponse = await fetch(process.env.REACT_APP_URL + '/users/update/roles', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    'username': currentThis.state.usernameRoleChange,
                    'roles': currentRoles
                })
            });
            return usersResponse;
        }

        update().then(async response => {
            if (response.status === 200) {
                await response.json();
                window.location.reload();
            } else {
                alert('Error while fetching users!');
            }
        });
    }

    changeInputField = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

}

export default ChangeUserRole;