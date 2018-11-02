import React, { Component } from 'react';
import {connect} from 'react-redux';
 import {getUserPosts, getUser} from '../actions/index';
import {Link, Route} from 'react-router-dom';
import Navbar from '../components/navbar';
import _ from 'lodash';
import PostShow from './show_post';
import uuid from 'uuid';

class UserPosts extends Component {
componentDidMount() {
   this.props.getUser();
}
componentDidUpdate(prevProps) {

  if (prevProps.user !== this.props.user) {

    this.props.getUserPosts(this.props.user.id);
  }
}
styles = {
  header: {textAlign: 'center', marginTop: 'auto'},
  container: {marginTop: '15px'}
}
  render() {
    const {posts, user} = this.props;

    if (!user) {
    return (
      <div>
      <div className="container" style={this.styles.header}>
                <h2>Must be logged in!</h2>
      </div>
      </div>
    );
    }
    if (!posts ) {
      return (
        <div>
        <Navbar />
        <div className="container">
                  <span>Loading Posts..</span>
        </div>
        </div>
      );
    }
    return (
      <div>
      <Navbar />
      <Route path={`${this.props.match.url}/posts/:id`} component={PostShow} />
      <div className="app" style={this.styles.container}>
        <h4 className="ml-3">{user.user + "'s"} recent posts</h4>
        <div className="fix">
        <Link to={'/'} className="btn btn-warning help mt-3 mb-3 ml-3">Go home</Link>
        </div>
        <ul className="form-group cmt">
          {this.renderPosts()}
        </ul>
      </div>
      </div>
    );
  }
  renderPosts() {
    const {posts} = this.props;
    const sorteddate = Object.values(posts).sort((a, b) => {
      return +a.date > +b.date ? 1 : -1;
    })

    return sorteddate.map(({title, comments, username, _id }) => {
        const path = `${this.props.match.url}/posts/${_id}`;
      return (
        <Link to={path} key={uuid()} className="posts">
        <li className="list-group-item posters">
        <div className="">
        <h6><strong>{title}</strong></h6><small><span>created by <strong>{username}</strong></span></small></div>
        <small><span>{!comments ? '0' : comments.length} comments</span></small>
        </li>
      </Link>
      );
    })

  }
}
function getProps({posts, user}) {
  return {
    posts,
    user
  }
}
export default connect(getProps, {getUserPosts, getUser})(UserPosts);
