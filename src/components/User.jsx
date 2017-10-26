import React from 'react';
import { Route, Link } from 'react-router-dom';

import { GITHUB_URL, GITHUB_TOKEN } from '../global_contants.js'
import Repos from './Repos.jsx'
import Followers from './Followers.jsx'
import Following from './Following.jsx'

class User extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.fetchUser()
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.username === prevProps.username) {
            console.log('same user')
        } else {
            console.log('user changed. fetching new user data')
            this.fetchUser()
        }
    }

    fetchUser() {
        var path = `/users/${this.props.username}`
        fetch(`${GITHUB_URL}${path}?${GITHUB_TOKEN}`)
        .then(response => response.json())
        .then(
            user => {
                // How can we use `this` inside a callback without binding it??
                // Make sure you understand this fundamental difference with arrow functions!!!
                this.setState({
                    user: user
                });
            }
        );
    }

    /*
    This method is used as a mapping function. Eventually this could be factored out to its own component.
    */
    renderStat(stat) {
        return (
            <li key={stat.name} className="user-info__stat">
                <Link to={stat.url}>
                    <p className="user-info__stat-value">{stat.value}</p>
                    <p className="user-info__stat-name">{stat.name}</p>
                </Link>
            </li>
        );
    }

    render() {
        // If the state doesn't have a user key, it means the AJAX didn't complete yet. Simply render a LOADING indicator.
        if (!this.state.user) {
            return (<div className="user-page">LOADING...</div>);
        }

        // If we get to this part of `render`, then the user is loaded
        const user = this.state.user;

        // Gather up some number stats about the user, to be used in a map below
        const stats = [
            {
                name: 'Public Repos',
                value: user.public_repos,
                url: `/user/${this.props.username}/repos`
            },
            {
                name: 'Followers',
                value: user.followers,
                url: `/user/${this.props.username}/followers`
            },
            {
                name: 'Following',
                value: user.following,
                url: `/user/${this.props.username}/following`
            }
        ];

        // Look in index.css for the styles that make this look like it does
        return (
            <div className="user-page">
                <div className="user-info">
                    <Link className="user-info__text" to={`/user/${user.login}`}>
                        <img className="user-info__avatar" src={user.avatar_url} alt={`${user.login} avatar`}/>
                        <h2 className="user-info__title">{user.login} ({user.name})</h2>
                        <p className="user-info__bio">{user.bio}</p>
                    </Link>

                    <ul className="user-info__stats">
                        {stats.map(this.renderStat)}
                    </ul>
                </div>
                <Route path={`/user/${this.props.username}/repos`} render={() => (<Repos username={this.props.username} />)} />
                <Route path={`/user/${this.props.username}/followers`} render={() => (<Followers username={this.props.username} />)} />
                <Route path={`/user/${this.props.username}/following`} render={() => (<Following username={this.props.username} />)} />
            </div>
        );
    }
};

export default User;
