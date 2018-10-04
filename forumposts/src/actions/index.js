import axios from 'axios';
import qs from 'qs'
export const GET_POST = 'getpost';
export const GET_POSTS = 'getposts';
export const POST_POST = 'posterofposts';
export const POST_COMMENT = 'postcoment';
export const USER = 'getuser';
export const DELETE_POST = 'del';


export function getPosts() {
    const request = axios.get('/api/data');
    return {
        type: GET_POSTS,
        payload: request
    }
}

export function createPost(post, callback) {
    const newPost = {
        username: post.username,
        title: post.title,
        body: post.body,
        date: new Date()
    }

     const req = axios.post('/api/create', qs.stringify(newPost))
                    .then(() => callback());

    return {
        type: POST_POST,
        payload: req
    }
}

export function getPost(id) {
    const req = axios.get(`/api/find`, {
        params: {
            _id: id
        }
    });
    return {
        type: GET_POST,
        payload: req
    }
}

export function postComment(id, comment, username) {
    const newuser = !username ? 'Anonymous' : username;
    const obj = {
        _id: id,
        comment: comment,
        user: newuser
    }
    const str = qs.stringify(obj);
     axios.put('/api/add', str)    
    return {
        type: POST_COMMENT,
        payload: obj
    }
}

export function getUser() {
   const req = axios.get('/login');

   return {
       type: USER,
       payload: req
   }
}

export function deletePoster(id, callback) {
   axios.delete('/api/delete', {
       params: {
           _id: id
       }
   })
   .then(() => callback());
 return {
     type: DELETE_POST,
     case: id
 }


}