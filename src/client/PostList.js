import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: []};
    console.log("test");
  }

  componentDidMount() {
    axios.get(`/api/forum/${this.props.match.params.id}/posts`)
    .then(response => {
      this.setState({posts: response.data});
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
        name={u.name}
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
    </div>
  );
};

export default PostList;
