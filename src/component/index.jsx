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
                <body id="page-top">
                    <header class="masthead">
                        <div class="container h-100">
                            <div class="row h-100 align-items-center justify-content-center text-center">
                                <div class="col-lg-10 align-self-end">
                                    <h1 class="text-uppercase text-white font-weight-bold">Start exploring the next generation Tasks Tracker</h1>
                                    <hr class="divider my-4" />
                                </div>
                                <div class="col-lg-8 align-self-baseline">
                                    <p class="text-white-75 font-weight-light mb-5">The Tasks Tracker helps you to organize you projects, tasks and progress!</p>
                                    <a class="btn btn-primary btn-xl js-scroll-trigger" href="/my-projects">Start exploring</a>
                                </div>
                            </div>
                        </div>
                    </header>
                    <section class="page-section bg-primary" id="about">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-8 text-center">
                                    <h2 class="text-white mt-0">We've got what you need!</h2>
                                    <hr class="divider light my-4" />
                                    <p class="text-white-50 mb-4">New in the platform?</p>
                                    <a class="btn btn-light btn-xl js-scroll-trigger" href="/register">Register now!</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div id="portfolio">
                        <div class="container-fluid p-0">
                            <div class="row no-gutters">
                                <div class="col-lg-4 col-sm-6">
                                    <a class="portfolio-box" href="assets/img/portfolio/fullsize/1.jpg">
                                        <img class="img-fluid" src="assets/img/portfolio/thumbnails/1.jpg" alt="" />
                                    </a>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <a class="portfolio-box" href="assets/img/portfolio/fullsize/2.jpg">
                                        <img class="img-fluid" src="assets/img/portfolio/thumbnails/2.jpg" alt="" />
                                    </a>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <a class="portfolio-box" href="assets/img/portfolio/fullsize/3.jpg">
                                        <img class="img-fluid" src="assets/img/portfolio/thumbnails/3.jpg" alt="" />
                                    </a>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <a class="portfolio-box" href="assets/img/portfolio/fullsize/4.jpg">
                                        <img class="img-fluid" src="assets/img/portfolio/thumbnails/4.jpg" alt="" />
                                    </a>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <a class="portfolio-box" href="assets/img/portfolio/fullsize/5.jpg">
                                        <img class="img-fluid" src="assets/img/portfolio/thumbnails/5.jpg" alt="" />
                                    </a>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <a class="portfolio-box" href="assets/img/portfolio/fullsize/6.jpg">
                                        <img class="img-fluid" src="assets/img/portfolio/thumbnails/6.jpg" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
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