import React, { Component } from 'react';
import propTypes from 'prop-types'

import { GITHUB_URL, GITHUB_TOKEN } from '../global_contants.js'
import GithubUser from './GithubUser.jsx'

class Followers extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        var path = `/users/${this.props.username}/followers`
        fetch(`${GITHUB_URL}${path}?${GITHUB_TOKEN}`)
        .then(response => response.json())
        .then(followers => {
            this.setState({
                followers: followers
            });
        });
    }
    
    componentDidUpdate() {
        console.log(this.state.followers)
        // this.state.followers.forEach(user => console.log(user))
    }

    renderFollower = follower => {
        // return (<div>follower</div>)
        // console.log('rendering follower:', follower)
        return (<GithubUser user={follower} key={follower.login}/>)
    }

    render() {
        if (!this.state.followers) return (
            <div>Loading...</div>
        )

        return (
            <div className="followers-page">
                <h3>Followers of {this.props.username.toUpperCase()}</h3>
                <ul className="user-list">
                    {this.state.followers.map(follower => this.renderFollower(follower))}
                </ul>
            </div>
        );
    }
}

Followers.propTypes = {
    username: propTypes.string.isRequired,
}

export default Followers;