import { useContext, useEffect, useRef, useState } from 'react';
import { PostContext } from '../contexts/PostContext';
import close from '../assets/images/icon-cross.svg';
import Spinner from './Spinner';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  //Contexts
  const {
    postState: { posts, postsLoading },
    getPosts,
    addPost,
    deletePost,
    deletePosts,
  } = useContext(PostContext);
  const { logOutUser } = useContext(AuthContext);

  const logOut = () => logOutUser();
  //Local State
  const [newPost, setNewPost] = useState({
    content: '',
    status: false,
  });

  const [postIds, setPostIds] = useState([]);
  const [count, setCount] = useState(0);
  let notChecked = document.querySelectorAll(
    'input[name=postIds]:not(:checked)'
  );
  const { content } = newPost;
  let check = document.querySelectorAll('input[name=postIds]');
  let checked = document.querySelectorAll('input[name=postIds]:checked');
  let noItem = document.querySelector('.no-item');
  let countNotChecked = notChecked.length;
  //Start: Get all posts
  useEffect(() => {
    getPosts();
  }, []);
  const onChangePostIds = (e) => {
    setPostIds([...postIds, e.target.value]);
  };
  const deletedPost = (id) => {
    setCount((prev) => prev - 1);
    deletePost(id);
  };
  const setCountFake = () => {
    setCount(countNotChecked - 1);
  };
  let body;
  if (postsLoading) {
    body = <Spinner></Spinner>;
  } else if (posts.length === 0) {
    body = (
      <>
        <li>
          <label>
            <span className="checkmark" />
            <span className="todo-content">No item</span>
          </label>
        </li>
      </>
    );
  } else {
    body = (
      <>
        {posts.map((post) => (
          <li key={post._id}>
            <label onClick={setCountFake}>
              <input
                type="checkbox"
                name="postIds"
                value={post._id}
                onChange={onChangePostIds}
              />
              <span className="checkmark" />
              <span className="todo-content">{post.content}</span>
            </label>
            <div className="close" onClick={deletedPost.bind(this, post._id)}>
              <img src={close} alt="delete" />
            </div>
          </li>
        ))}
      </>
    );
  }

  //On change
  const onChangeNewPostForm = (e) => {
    setNewPost({ ...newPost, content: e.target.value });
  };

  //On submit

  const onSubmitAddPost = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    //Count items left
    setCount(countNotChecked + 1);
    setNewPost({ content: '', status: false });
  };

  //Delete posts "Clear Completed"
  let newpostIds = [];
  const onSubmitDeletePosts = async (event) => {
    event.preventDefault();
    setCount(countNotChecked);
    checked.forEach((e) => {
      if (e.value) {
        newpostIds.push(e.value);
      }
    });
    await deletePosts(newpostIds);
  };

  //Show all content todo
  const showAll = () => {
    noItem.classList.add('hide');
    check.forEach((e) => e.closest('li').classList.remove('hide'));
  };

  //Show content todo active "todo left"
  const showActive = () => {
    noItem.classList.add('hide');
    if (notChecked.length === 0) {
      noItem.classList.remove('hide');
    }
    notChecked.forEach((e) => e.closest('li').classList.remove('hide'));
    checked.forEach((e) => e.closest('li').classList.add('hide'));
  };

  //Show content todo completed
  const showCompleted = () => {
    noItem.classList.add('hide');
    if (checked.length === 0) {
      noItem.classList.remove('hide');
    }
    notChecked.forEach((e) => e.closest('li').classList.add('hide'));
    checked.forEach((e) => e.closest('li').classList.remove('hide'));
  };
  let showCount;
  if (count === 0) {
    showCount = <span>{countNotChecked}</span>;
  } else if (count < 0) {
    showCount = <span>{countNotChecked - 1}</span>;
  } else if (count > countNotChecked) {
    showCount = <span>{count}</span>;
  } else if (count < countNotChecked) {
    showCount = <span>{countNotChecked}</span>;
  } else {
    showCount = <span>{count}</span>;
  }
  return (
    <div>
      <div className="wrapper">
        <header>
          <h1 title="Todo">Todo</h1>
          <button onClick={logOut} className="btn btn-login">
            Log Out
          </button>
        </header>
        <main>
          <div className="container">
            <div className="todoapp">
              <form onSubmit={onSubmitAddPost}>
                <section className="add-items">
                  <span />
                  <input
                    type="text"
                    id="add-items"
                    name="content"
                    placeholder="Create a new todo..."
                    value={content}
                    onChange={onChangeNewPostForm}
                    autoComplete="off"
                  />
                </section>
              </form>
              <form onSubmit={onSubmitDeletePosts}>
                <section className="todo-list">
                  <ul>
                    {body}
                    <li className="no-item hide">
                      <label>
                        <span className="checkmark" />
                        <span className="todo-content">No item</span>
                      </label>
                    </li>
                  </ul>
                </section>
                <div className="bottom-items">
                  <div className="items-left">{showCount} items left</div>
                  <div className="filter">
                    <label>
                      <input
                        type="radio"
                        name="filter"
                        id="all"
                        defaultChecked
                      />
                      <span onClick={showAll}>All</span>
                    </label>
                    <label>
                      <input type="radio" name="filter" id="active" />
                      <span onClick={showActive}>Active</span>
                    </label>
                    <label>
                      <input type="radio" name="filter" id="completed" />
                      <span onClick={showCompleted}>Completed</span>
                    </label>
                  </div>
                  <button type="submit" className="clear">
                    Clear Completed
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
