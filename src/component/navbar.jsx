import React, { Component } from "react";
import JwtDecoder from './jwt/jwt-decoder'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let isLoggedIn = false;
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token != "undefined") {
            isLoggedIn = true;
        }

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="/">Tasks tracker</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item" hidden={isLoggedIn}>
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                            <li className="nav-item" hidden={isLoggedIn}>
                                <a className="nav-link" href="/register">Register</a>
                            </li>
                            <li className="nav-item" hidden={!isLoggedIn}>
                                <a className="nav-link" href="/my-projects">My Projects</a>
                            </li>
                            <li className="nav-item" hidden={!isLoggedIn}>
                                <a href="javascript:void(0)" className="nav-link" onClick={this.logout}>Logout</a>
                            </li>
                            <li className="nav-item" hidden={!this.isAdmin()}>
                                <a className="nav-link" href="/add-project">Add project</a>
                            </li>
                            <li className="nav-item" hidden={!this.isAdmin()}>
                                <a className="nav-link" href="/add-task">Add task</a>
                            </li>
                            <li className="nav-item" hidden={!this.isAdmin()}>
                                <a className="nav-link" href="/add-user-to-project">Add user to project</a>
                            </li>
                            <li className="nav-item" hidden={!isLoggedIn}>
                                <a className="nav-link" href="/users/profile">My profile</a>
                            </li>
                        </ul>

                    </div>
                </nav>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.isStillLoggedIn();
        this.isAdmin();
    }

    isStillLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (token == undefined || token == null && token != "undefined") {
            return;
        }
        fetch(process.env.REACT_APP_URL + '/validate', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer: ' + token
            }
        }).then(async response => {
            await response.text();
            if (response.status !== 200) {
                localStorage.removeItem('token');
                window.location.reload();
            }
        }).catch(error => {
            console.log(error);
            localStorage.removeItem('token');
        });
    }

    logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    isAdmin = () => {
        const token = localStorage.getItem('token');
        if (token == undefined || token == null) {
            return false;
        }
        const jwtDecoder = new JwtDecoder();
        const decodedToken = jwtDecoder.decodeToken(token);
        const roles = decodedToken['roles'];
        return roles.includes('ADMIN');
    }

}

export default Navbar;