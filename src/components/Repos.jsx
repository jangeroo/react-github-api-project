import React, { Component } from 'react';
import propTypes from 'prop-types'

import GithubRepo from './GithubRepo.jsx'

class Repos extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        fetch(`https://api.github.com/users/${this.props.username}/repos`)
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