import React, { Component } from 'react';
import propTypes from 'prop-types'

import { GITHUB_URL, GITHUB_TOKEN } from '../global_contants.js'
import GithubRepo from './GithubRepo.jsx'

class Repos extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        var path = `/users/${this.props.username}/repos`
        fetch(`${GITHUB_URL}${path}?${GITHUB_TOKEN}`)
        .then(response => response.json())
        .then(repos => {
            this.setState({
                repos: repos
            });
        });
    }
    
    componentDidUpdate() {
        console.log(this.state.repos[0])
        // this.state.followers.forEach(user => console.log(user))
    }

    renderRepo = repo => {
        return (<GithubRepo repo={repo} key={repo.id}/>)
    }

    render() {
        if (!this.state.repos) return (
            <div>Loading...</div>
        )

        return (
            <div className="followers-page">
                <h3>{this.props.username.toUpperCase()}'s repos:</h3>
                <ul className="user-list">
                    {this.state.repos.map(repo => this.renderRepo(repo))}
                </ul>
            </div>
        );
    }
}

Repos.propTypes = {
    username: propTypes.string.isRequired,
}

export default Repos;