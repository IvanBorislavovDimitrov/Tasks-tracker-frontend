import React, { Component } from "react";

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "null"
        };
    }

    render() {
        return (
            <React.Fragment>
                <h1>It works: {this.state.text}</h1>
            </React.Fragment>
        );
    }

    componentDidMount() {
        fetch('http://localhost:8080/')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    text: data['token']
                });
            });
    }
}

export default Index;