import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types'


class GithubUser extends Component {
    render() {
        return (
            <div>
                {/* <Link className="user-info__text" to={`/user/${this.props.user.login}`}>
                    <img className="user-info__avatar" src={this.props.user.avatar_url} alt=''/>
                    ziad-saab
                </Link> */}

                <Link className="user-link" to={`/user/${this.props.user.login}`}>
                    <img className="user-link__avatar" src={this.props.user.avatar_url} alt={`${this.props.user.login} avatar`}/>
                    <h2 className="user-link__title">{this.props.user.login}</h2>
                </Link>

            </div>
        );
    }
}

GithubUser.propTypes = {
    user: propTypes.object.isRequired,
}

export default GithubUser;