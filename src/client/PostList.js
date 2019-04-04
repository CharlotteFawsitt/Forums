import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], user_id: ''};
  }

  componentDidMount() {
    console.log(this.props.history.state);
    axios.get(`/api/forum/${this.props.match.params.id}/posts`)
    .then(response => {
      this.setState({posts: response.data});
      this.setState({user_id: this.props.history.state._id});
      console.log(response.data);
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
        user={this.state.user_id}
        />
    ));

    return (
      <div>
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
    <div>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      {props.uid ===  props.user ? <button>edit post</button> : <div></div>}
    </div>
  );
};

export default PostList;
