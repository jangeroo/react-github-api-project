import React, { Component } from 'react';
import propTypes from 'prop-types'

import { GITHUB_URL, GITHUB_TOKEN } from '../global_contants.js'
import GithubUser from './GithubUser.jsx'

class Followers extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            loading: false,
            followers: [],
        };
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        var path = `/users/${this.props.username}/followers`
        var params = `page=${this.state.page}&per_page=25`
        fetch(`${GITHUB_URL}${path}?${GITHUB_TOKEN}&${params}`)
        .then(response => response.json())
        .then(followers => {
            console.log(`page ${this.state.page} of followers:`, followers)
            this.setState({
                followers: followers
            });
        });
    }
    
    renderFollower = follower => {
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