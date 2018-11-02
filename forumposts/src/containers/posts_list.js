import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getPosts} from '../actions/index';
import Navbar from '../components/navbar';
import {Route, Link} from 'react-router-dom';
import PostShow from './show_post';
import CreatePost from './new_post';
import _ from 'lodash';


class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    if (!this.props.posts) return (<h6>Loading...</h6>);
    return (
      <div>
        <Navbar />
        <Route path='/posts/:id' component={PostShow} />
        <Route path='/create-post' component={CreatePost} />
      <div className="app">
      <div className="fix">
      {this.authTrue()}
      </div>
      <ul className='form-group cmt'>
      {this.renderPosts(this.addRoute)}
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

      <Link to={path} key={post._id || post.key} className="posts">
      <li className="list-group-item posters">
      <div className="">
      <h6><strong>{post.title}</strong></h6><small><span>created by <strong>{post.username}</strong></span></small></div>
      <small><span>{!post.comments ? '0' : post.comments.length} comments</span></small>
      </li>
    </Link>
   );
  })
}
authTrue() {
  const {user} = this.props;
  if (user) {
    return (
      <div>
      <Link className="btn btn-primary help mt-3 mb-3 ml-3" to="/create-post">Create Post</Link>
      </div>
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
