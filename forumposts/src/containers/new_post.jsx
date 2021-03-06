import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {createPost} from '../actions/index';
import {Link} from 'react-router-dom';

class CreatePost extends Component {
    componentDidMount() {
        document.body.addEventListener('keydown', this.handleExit)
        document.body.addEventListener('click', this.handleExit);
        
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.handleExit);
        document.body.removeEventListener('click', this.handleExit);
}
    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="topmodal">
              <div className="modaldiv postcreator">
                <div className="container makewhite mt-3">
            <form className="form-group" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                name="title"
                label="Title"
                component={this.renderList}
                />
                <Field
                name="body"
                label="Body"
                component={this.renderList}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger ml-1" to="/">Cancel</Link>
            </form>
            </div>
            </div>
            </div>
        );
    }
    renderList(field) {
        const className = field.meta.touched && field.meta.error ? ' reddead' : '';
        const classer = field.input.name === 'body' ? ' givewidth' : '';
        if (field.input.name === 'body') {
            return (
                <div  className= {'fixer' + className}>
                <label>{field.label}</label>
                <textarea {...field.input}
                type="text"
                className={'form-control' + classer}
                placeholder={field.meta.touched ? field.meta.error : ''}
                rows='10'
                cols='30'
                />
                </div>
            );
        } else {
            return (
                <div  className= {'fixer' + className}>
                <label>{field.label}</label>
                <input {...field.input}
                type="text"
                className={'form-control' + classer}
                placeholder={field.meta.touched ? field.meta.error : ''}
                />
                </div>
            );
        }

    }
    onSubmit(values) {
        values.username = this.props.user ? this.props.user.user : 'Anonymous';
        values.userId = this.props.user ? this.props.user.user.id : 'Anonymous';
        this.props.createPost(values, () => {
            this.props.history.push('/');
        })
    }
    handleExit = (e) => {

        if (e.type === 'keydown') {
          if (e.keyCode === 27) {
            this.props.history.goBack();
          }
        } else {
            const val = new RegExp(e.target.classList.value);
            const str = /modaldiv|topmodal|postcreator/;
            const checkClass = str.test(val);

          if (checkClass) {
            this.props.history.goBack();
          }
        }
  
      }
}
function getProps({user}) {
    return {
        user
    }
}
function validate(values) {
    const errors = {}
    if (!values.title) {
        errors.title = "Please enter a title"
    }
    if (!values.body) {
        errors.body = "Please enter body"
    }
    return errors;
}
export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(connect(getProps, {createPost})(CreatePost));
