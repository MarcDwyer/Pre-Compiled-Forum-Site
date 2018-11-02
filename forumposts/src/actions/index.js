import axios from 'axios';
import qs from 'qs'
export const GET_POST = 'getpost';
export const GET_POSTS = 'getposts';
export const POST_POST = 'posterofposts';
export const POST_COMMENT = 'postcoment';
export const USER = 'getuser';
export const DELETE_POST = 'del';
export const USER_POSTS = 'ASDASDADSASD';


export function getPosts() {
  console.log('aaaaaa')
    const request = axios.get('/api/data');
    return {
        type: GET_POSTS,
        payload: request
    }
}

export async function createPost(post, callback) {
    const newPost = {
        username: post.username,
        title: post.title,
        userId: post.userId,
        body: post.body,
        date: new Date()
    }
'application/x-www-form-urlencoded'
    const postPost = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: qs.stringify(newPost)
    })
    const dataPost = await postPost.json();
    callback();

    return {
      type: POST_POST,
      payload: dataPost
    }
}

export async function getPost(id) {
    const fetchPost = await fetch(`/api/find/${id}`);
    const dataPost = await fetchPost.json();

    return {
        type: GET_POST,
        payload: dataPost
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
   if (!req) return;

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
   console.log(id);
 return {
     type: DELETE_POST,
     payload: id
 }
}

export async function getUserPosts(userId) {

  const fetchUser = await fetch(`/api/postquery/${userId}`);
  const dataUser = await fetchUser.json();
  return {
    type: USER_POSTS,
    payload: dataUser
  }
}
