import React, { Component } from "react";
import jwt_decode from 'jwt-decode';

class JwtDecoder extends Component {
    constructor() {
        super();
    }

    decodeToken(token) {
        return jwt_decode(token);
    }
}

export default JwtDecoder;