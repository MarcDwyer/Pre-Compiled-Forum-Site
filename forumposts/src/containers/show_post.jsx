import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getPost, postComment, deletePoster} from '../actions/index';
import {Link} from 'react-router-dom';
import uuid from 'uuid';

class PostShow extends Component {
  constructor(props) {
    super(props);

    this.styles = {
        closeButton: {color: 'white'}
    }
  }
    componentDidMount() {
        const {id} = this.props.match.params;

        this.props.getPost(id);
        document.body.addEventListener('keydown', this.handleExit)
        document.body.addEventListener('click', this.handleExit);
        }
  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleExit);
    document.body.removeEventListener('click', this.handleExit);
  }
    render() {
        const {post} = this.props;
        if(!post) {
            return <div>Loading...</div>
        }
            return (
              <div className="topmodal">
            <div className="modaldiv">
            <div className="blackbar">
            <i className="fa fa-close" aria-hidden="true" style={this.styles.closeButton}></i>
                <span>{post.title}</span>
            </div>
            <div className="modalcontent">
            <div className="thepost mb-4 mt-4">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className="buttons mb-2">
                </div>
                {this.deletePost()}
                </div>
                <textarea
                className="comment"
                rows="5"
                cols="15"
                placeholder="What are your thoughts?"
                />
                <button onClick={(e) => this.updateComment(e)} type="submit" className="btn btn-comment">Comment</button>
                <ul className="list-group comments mt-4">
                <h4>Comments</h4>
                {this.renderComments()}
            </ul>
            </div>
            </div>
            </div>
        );
    }
    updateComment(e) {
        e.preventDefault();
        const comment = document.querySelector('.comment');
        const cmtbtn = document.querySelector('.btn-comment')

        cmtbtn.classList.remove('btn-danger');

        if (comment.value.length < 1) {
            comment.placeholder = 'Comments must not be empty and not over 280 characters';
            return;
        }  if (comment.value.length >= 100) {
            cmtbtn.classList.toggle('btn-danger');
            cmtbtn.textContent = 'Comment must be under 100 characters!';
            return;
        } else {
            const {user} = this.props;
            const username = user ? user.user : undefined;
            this.props.postComment(this.props.post._id, comment.value, username);
            comment.placeholder = 'Comment Posted!'
            cmtbtn.textContent = 'Submitted!'
            comment.value = '';
        }

    }
    renderComments() {
        const {comments} = this.props.post;
        if (comments.length === 0) {
            return <h6>No comments...</h6>
        } else {
            return comments.map(comment => {
                return (
                    <li className="list-group-item comments" key={uuid()}>{comment.comment} <small className="float-right">Created by {comment.user}</small></li>
                );
            })
        }
    }
    deletePost() {
        if (!this.props.user) return;
        if (this.props.user.user === this.props.post.username) {
            return (
                <a onClick={this.delete.bind(this)} className="btn mb-2 "><strong className="red">Delete Post</strong></a>
            );
        }
    }
    delete(id) {
        const {_id} = this.props.post;
        this.props.deletePoster(_id, () => {
            this.props.history.push('/');
        })
    }
    handleExit = (e) => {
      if (e.type === 'keydown') {
        if (e.keyCode === 27) {
          this.props.history.goBack();
        }
      } else {
        if (e.target.classList.value.includes('topmodal')) {
          this.props.history.goBack();
        }
      }

    }
}

function getProps({posts, user}, ownProps) {

    return {
        user,
        post: posts[ownProps.match.params.id],
        }
}

export default connect(getProps, {getPost, postComment, deletePoster})(PostShow);
