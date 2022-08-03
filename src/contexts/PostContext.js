import { createContext, useReducer } from 'react';
import { postReducer } from '../component/reducer/PostReducer';
import { apiUrl } from './constants';
import axios from 'axios';

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //State
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postsLoading: true,
  });

  //Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: 'POSTS_LOADED_SUCCESS',
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: 'POSTS_LOADED_FAIL' });
    }
  };

  //Add Post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);

      if (response.data.success) {
        dispatch({ type: 'ADD_POST', payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  //Delete Post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);

      if (response.data.success) {
        dispatch({ type: 'DELETE_POST', payload: postId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Delete Posts
  const deletePosts = async (postIds) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/posts/deleteposts/${postIds}`,
        postIds
      );

      if (response.data.success)
        dispatch({ type: 'DELETE_POSTS', payload: postIds });
      console.log(postIds);
    } catch (error) {
      console.log(error);
    }
  };

  //Post context data
  const postContextData = {
    getPosts,
    postState,
    addPost,
    deletePost,
    deletePosts,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
