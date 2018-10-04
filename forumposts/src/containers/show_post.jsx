import React, { Component } from 'react'
import {connect} from 'react-redux';
import {getPost, postComment, deletePoster} from '../actions/index';
import {Link} from 'react-router-dom';
import Navbar from '../components/navbar';
import uuid from 'uuid';

class PostShow extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getPost(id);

        document.body.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) this.props.history.push('/');
            return;
            })
        }
    render() {
        const {post} = this.props;
            if(!post) {
                return <div>Loading...</div>
            }
            return (
                <div>
                    <Navbar />
            <div className="container makewhite mt-3">
            <div className="mt-3">
            <Link to="/" className="btn btn-secondary">Go back</Link>
            </div>
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
}

function getProps({posts, user}, ownProps) {
    return {
        post: posts[ownProps.match.params.id],
        user
        }
}

export default connect(getProps, {getPost, postComment, deletePoster})(PostShow);