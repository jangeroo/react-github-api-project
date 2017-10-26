import React, { Component } from 'react';
import propTypes from 'prop-types'
import Infinite from 'react-infinite'

import { GITHUB_URL, GITHUB_TOKEN } from '../global_contants.js'
import GithubRepo from './GithubRepo.jsx'

class Repos extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            loading: false,
            repos: [],
        };
    }

    fetchData = () => {
        this.setState({loading: true})

        var path = `/users/${this.props.username}/repos`
        var params = `page=${this.state.page}&per_page=25`
        fetch(`${GITHUB_URL}${path}?${GITHUB_TOKEN}&${params}`)
        .then(response => response.json())
        .then(repos => {
            // console.log(`page ${this.state.page} of repos:`, repos)
            this.setState(st => ({
                repos: st.repos.concat(repos),
                page: st.page + 1,
                loading: false,
            }));
        });
    }
    
    renderRepo = repo => {
        return (<GithubRepo repo={repo} key={repo.id}/>)
    }

    render() {
        return (
            <div className="followers-page">
                <h3>{this.props.username.toUpperCase()}'s repos:</h3>
                <Infinite isInfiniteLoading={this.state.loading}
                    onInfiniteLoad={this.fetchData}
                    useWindowAsScrollContainer
                    elementHeight={35}
                    infiniteLoadBeginEdgeOffset={100}
                >
                    {this.state.repos.map(repo => this.renderRepo(repo))}
                </Infinite>
            </div>
        );
    }
}

Repos.propTypes = {
    username: propTypes.string.isRequired,
}

export default Repos;