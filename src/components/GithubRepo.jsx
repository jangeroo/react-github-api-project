import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types'


class GithubRepo extends Component {
    render() {
        return (
            <div>
                <Link className="user-link" to={this.props.repo.html_url} target="_blank">
                    <h2 className="user-link__title">{this.props.repo.name}</h2>
                </Link>
            </div>
        );
    }
}

GithubRepo.propTypes = {
    repo: propTypes.object.isRequired,
}

export default GithubRepo;