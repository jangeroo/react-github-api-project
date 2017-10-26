import React, { Component } from 'react';
import propTypes from 'prop-types'

import { GITHUB_URL, GITHUB_TOKEN } from '../global_contants.js'
import GithubUser from './GithubUser.jsx'

class Following extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        var path = `/users/${this.props.username}/following`
        fetch(`${GITHUB_URL}${path}?${GITHUB_TOKEN}`)
        .then(response => response.json())
        .then(followees => {
            this.setState({
                following: followees
            });
        });
    }
    
    componentDidUpdate() {
        console.log(this.state.following)
        // this.state.followers.forEach(user => console.log(user))
    }

    renderFollower = followee => {
        return (<GithubUser user={followee} key={followee.login}/>)
    }

    render() {
        if (!this.state.following) return (
            <div>Loading...</div>
        )

        return (
            <div className="followers-page">
                <h3>{this.props.username.toUpperCase()} is following:</h3>
                <ul className="user-list">
                    {this.state.following.map(followee => this.renderFollower(followee))}
                </ul>
            </div>
        );
    }
}

Following.propTypes = {
    username: propTypes.string.isRequired,
}

export default Following;