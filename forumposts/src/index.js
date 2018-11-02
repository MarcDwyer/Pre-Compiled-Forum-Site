import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { unregister } from './registerServiceWorker';
import reducers from './reducers';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './index.css';
import PostsList from './containers/posts_list';

import UserPosts from './containers/userposts';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
unregister();
ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
<BrowserRouter>
  <Switch>
<Route path='/user-posts' component={UserPosts} />
<Route  path='/' component={PostsList}/>
</Switch>
</BrowserRouter>
</Provider>
,document.getElementById('root'));
