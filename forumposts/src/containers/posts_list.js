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
    const sorteddate = Object.values(posts).sort((a, b) => {
      return +a.date > +b.date ? 1 : -1;
    })

   return sorteddate.map(({ _id, username, title, comments }) => {
   const path = `/posts/${_id}`;
    return (
      <Link to={path} key={_id} className="posts">
      <li className="list-group-item posters">
      <div className="">
      <h6><strong>{title}</strong></h6><small><span>created by <strong>{username}</strong></span></small></div>
      <small><span>{!comments ? '0' : comments.length} comments</span></small>
      </li>
    </Link>
   );
  })
}
authTrue() {
  const {user} = this.props;

    return (
      <div>
      <Link className="btn btn-primary help mt-3 mb-3 ml-3" to="/create-post">Create Post</Link>
      </div>
    );
}
}
function getProps({posts, user}) {
  return {
    posts,
    user
  }
}

export default connect(getProps, {getPosts})(App);
