import React, { Component } from "react";
import ReactDOM from 'react-dom';
import JwtDecoder from './jwt/jwt-decoder';

class ProjectMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="container mt-5">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">View profile</th>
                            </tr>
                        </thead>
                        <tbody id="users">

                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
    
    componentDidMount() {
        const projectId = this.getTokenFromUrl();
        const userSection = document.getElementById('users');
        fetch(process.env.REACT_APP_URL + '/users/project/' + projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        }).then(async response => {
            const users = await response.json();
            let count = 0;
            const parsedUsers = [];
            users.forEach(user => {
                const userProfileHref = "/other-user/profile/" + user['id'];
                const element = (<tr>
                    <th scope="row">{++count}</th>
                    <td>{user['username']}</td>
                    <td><a href={userProfileHref}>Click</a></td>
                </tr>);
                parsedUsers.push(element);
            });
            ReactDOM.render(parsedUsers, userSection);
        });
    }

    getTokenFromUrl = () => {
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

export default ProjectMembers;