import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../actions/index';
import Navbar from '../components/navbar';
import {Link} from 'react-router-dom';
import _ from 'lodash';


class App extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    if (!this.props.posts) return (<h6>Loading...</h6>);
    return (
      <div>
        <Navbar posts={this.props.posts} />
      <div className="App container">
      <div className="fix">
      {this.authTrue()}
      </div>
      <ul className='form-group cmt'>
      {this.renderPosts()}
      </ul>
      </div>
      </div>
    );
  }
  renderPosts() {
    const {posts} = this.props;
   return _.map(posts, post => {
    const path = `/posts/${post._id}`;
    return (
      <div key={post._id || post.key} className="posts">
        <Link className="remove" to={path}>
      <li className="list-group-item posters">
      <div className="">
      <h6><strong>{post.title}</strong></h6><small><span>created by <strong>{post.username}</strong></span></small></div>  
      <small><span>{!post.comments ? '0' : post.comments.length} comments</span></small>
      </li>
      </Link>
      </div>
   );
  })
}
authTrue() {
  const {user} = this.props;
  if (user) {
    return (
      <Link className="btn btn-primary help mt-3 mb-3" to="/create-post">Create Post</Link>
    );
  } else {
    return (
    <h4 className="btn help mt-3 mb-3">Sign in to Create a Post</h4>
    );
  }
}
}

function getProps({posts, user}) {
  return {
    posts,
    user
  }
}

export default connect(getProps, {getPosts})(App);
