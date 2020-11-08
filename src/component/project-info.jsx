import React, { Component } from "react";

class ProjectInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <div class="container">

                    <div class="row">

                        <div class="col-lg-3">
                            <h1 class="my-4">Shop Name</h1>
                            <div class="list-group">
                                <a href="#" class="list-group-item active">Category 1</a>
                                <a href="#" class="list-group-item">Category 2</a>
                                <a href="#" class="list-group-item">Category 3</a>
                            </div>
                        </div>

                        <div class="col-lg-9">

                            <div class="card mt-4">
                                <img class="card-img-top img-fluid" src="http://placehold.it/900x400" alt="" />
                                <div class="card-body">
                                    <h3 class="card-title">Product Name</h3>
                                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente dicta fugit fugiat hic aliquam itaque facere, soluta. Totam id dolores, sint aperiam sequi pariatur praesentium animi perspiciatis molestias iure, ducimus!</p>
                                </div>
                            </div>

                            <div class="card card-outline-secondary my-4">
                                <div class="card-header">
                                    Product Reviews
      </div>
                                <div class="card-body">
                                    <div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                        <small class="text-muted">Posted by Anonymous on 3/1/17</small>
                                        <hr />
                                    </div>
                                    <a href="#" class="btn btn-success">Leave a Review</a>
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
        const projectId = this.getProjectIdFromUrl();
        
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

export default ProjectInfo;