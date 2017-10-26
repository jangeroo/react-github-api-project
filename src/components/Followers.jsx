import React, { Component } from 'react';
import propTypes from 'prop-types'
import Infinite from 'react-infinite'

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

    fetchData = () => {
        this.setState({loading: true})

        var path = `/users/${this.props.username}/followers`
        var params = `page=${this.state.page}&per_page=25`
        fetch(`${GITHUB_URL}${path}?${GITHUB_TOKEN}&${params}`)
        .then(response => response.json())
        .then(followers => {
            // console.log(`page ${this.state.page} of followers:`, followers)
            this.setState(st => ({
                followers: st.followers.concat(followers),
                page: st.page + 1,
                loading: false,
            }));
        });
    }
    
    renderFollower = follower => {
        return (<GithubUser user={follower} key={follower.id}/>)
    }

    render() {
        return (
            <div className="followers-page">
                <h3>Followers of {this.props.username.toUpperCase()}</h3>
                <Infinite isInfiniteLoading={this.state.loading}
                    onInfiniteLoad={this.fetchData}
                    useWindowAsScrollContainer
                    elementHeight={35}
                    infiniteLoadBeginEdgeOffset={100}
                >
                    {this.state.followers.map(follower => this.renderFollower(follower))}
                </Infinite>
            </div>
        );
    }
}

Followers.propTypes = {
    username: propTypes.string.isRequired,
}

export default Followers;