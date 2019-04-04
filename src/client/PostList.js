import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], user_id: ''};

    this.updatePosts = this.updatePosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.updatePosts();
  }

  updatePosts() {
    console.log(this.props.history);
    axios.get(`/api/forum/${this.props.match.params.id}/posts`)
    .then(response => {
      this.setState({posts: response.data});
      if(this.props.history.state){
      this.setState({user_id: this.props.history.state._id});
    } else {
      this.setState({user_id: ''});
    }
      console.log(this.state.user_id);
    })
    .catch(error => {
      console.log(error);
    });
  }


  handleDelete(postId) {
    axios.delete('/api/forum/${this.props.match.params.id}/posts/delete', {
      data: {
        id: postId
      }
    })
    .then(response => {
      this.updatePosts();
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const postList = this.state.posts.map(u => (
      <Post
        key={u._id}
        id={u._id}
        uid={u.user_id}
        name={u.name}
        email={u.user_email}
        currentUser={this.state.user_id}
        handleDelete={this.handleDelete}
        forumid={this.props.match.params.id}
        />
    ));

    return (
      <div className="column">
        {postList.length ?
        <div>
          <h2>All Posts</h2>
            <Link to={`/forum/${this.props.match.params.id}/createPost`}>
          <button type="button">Create new post</button>
        </Link>
          <div>{postList}</div>
        </div> :
        <div>
        <h2>No posts</h2>
        <Link to={`/forum/${this.props.match.params.id}/createPost`}>
      <button type="button">Create new post</button>
    </Link>
  </div>}
      </div>
    );
  }
}

const Post = (props) => {
  return (
    <div className="card">
      <div className="card-content is-4by3">
        <h2 className="card-header-title">{props.name}</h2>
      <div className="media-content">
        <div className="content">Posted by: {props.email}</div>
        {props.uid ===  props.currentUser ? <button type="button" onClick={() => {
          props.handleDelete(props.id);}
        }>Delete post</button> : <div></div>}
        {props.uid ===  props.currentUser ?
          <Link to={`/forum/${props.forumid}/posts/${props.id}/editPost`}>
             <button type="button">Edit post</button>
           </Link> : <div></div>}
        </div>

      </div>
    </div>
  );
};

export default PostList;
