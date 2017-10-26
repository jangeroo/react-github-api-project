import React, { Component } from 'react';
import propTypes from 'prop-types'
import Infinite from 'react-infinite'

import { GITHUB_URL, GITHUB_TOKEN } from '../global_contants.js'
import GithubUser from './GithubUser.jsx'

class Following extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            loading: false,
            following: [],
        };
    }

    fetchData = () => {
        this.setState({loading: true})

        var path = `/users/${this.props.username}/following`
        var params = `page=${this.state.page}&per_page=25`
        fetch(`${GITHUB_URL}${path}?${GITHUB_TOKEN}&${params}`)
        .then(response => response.json())
        .then(followees => {
            // console.log(`page ${this.state.page} of followees:`, followees)
            this.setState(st => ({
                following: st.following.concat(followees),
                page: st.page + 1,
                loading: false,
            }));
        });
    }
    
    renderFollower = followee => {
        return (<GithubUser user={followee} key={followee.id}/>)
    }

    render() {
        return (
            <div className="followers-page">
                <h3>{this.props.username.toUpperCase()} is following:</h3>
                <Infinite isInfiniteLoading={this.state.loading}
                    onInfiniteLoad={this.fetchData}
                    useWindowAsScrollContainer
                    elementHeight={35}
                    infiniteLoadBeginEdgeOffset={100}
                >
                    {this.state.following.map(followee => this.renderFollower(followee))}
                </Infinite>
            </div>
        );
    }
}

Following.propTypes = {
    username: propTypes.string.isRequired,
}

export default Following;