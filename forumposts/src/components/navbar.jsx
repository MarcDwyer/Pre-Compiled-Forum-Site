import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../actions/index';


class Navbar extends Component {
    componentDidMount() {
        this.props.getUser();
    }
render() {
    const {user} = this.props;
    return (
        <nav className="navbar navbar-light bg-light justify-content-between">
  <Link to="/" className="navbar-brand">Forum App</Link>
  <div className="dropdown show">
  <a className="btn btn-success dropdown-toggle loginmarg" href="" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {user ? user.user: 'Sign In'}
  </a>
  <div className="dropdown-menu dropwider float-none" aria-labelledby="dropdownMenuLink">
        {this.renderAuth()}
  </div>
</div>
</nav>
    );
}
renderAuth() {
    const {user} = this.props;
    if (user) {
        return (
            <div className="profileview">
            <a href="" target="_self" className="btn">Check Posts</a>
            <a href="/auth/logout" target="_self" className="btn">Logout</a>
            </div>
        )
    } else {
        return(
            <div className="centergoogle">
            <a href="/auth/google" target="_self" className="btn btn-light googlebut align-middle">Sign in with Google+</a>
            </div>
        );
    }
}
}
function getProps({user}) {
    return {
        user
    };
}

export default connect(getProps, {getUser})(Navbar);