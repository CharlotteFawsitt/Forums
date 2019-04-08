import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], user_id: "" };

    this.updatePosts = this.updatePosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.updatePosts();
  }

  updatePosts() {
    axios
      .get(`/api/forum/${this.props.match.params.id}/posts`)
      .then(response => {
        this.setState({ posts: response.data });
        //This checks to see if the render props state exists set the user id with the current users.
        //If the state doesn't exist then set the user id to an empty string. Stops problems
        //arising from undefined and null values
        if (this.props.history.state) {
          this.setState({ user_id: this.props.history.state._id });
        } else {
          this.setState({ user_id: "" });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(postId) {
    axios
      .delete(`/api/forum/${this.props.match.params.id}/posts/delete`, {
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
        {postList.length ? (
          <div>
            <h2>All Posts</h2>
            <Link to={`/forum/${this.props.match.params.id}/createPost`}>
              <button className="button is-primary" type="button">
                Create new post
              </button>
            </Link>
            <div>{postList}</div>
          </div>
        ) : (
          <div>
            <h2>No posts</h2>
            <Link to={`/forum/${this.props.match.params.id}/createPost`}>
              <button className="button is-primary" type="button">
                Create new post
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const Post = props => {
  return (
    <div className="card Cards">
      <div className="card-content is-4by3">
        <h2 className="card-header-title">{props.name}</h2>
        <div className="media-content">
          <div className="content">Posted by: {props.email}</div>
          //Like comments checks the logged in user is the same as the posted user and displays
          //edit and delete buttons
          {props.uid === props.currentUser ? (
            <button
              className="button is-danger"
              type="button"
              onClick={() => {
                props.handleDelete(props.id);
              }}
            >
              Delete post
            </button>
          ) : (
            <div />
          )}
          {props.uid === props.currentUser ? (
            <Link to={`/forum/${props.forumid}/posts/${props.id}/editPost`}>
              <button className="button is-info" type="button">
                Edit post
              </button>
            </Link>
          ) : (
            <div />
          )}
          <Link to={`/forum/${props.forumid}/posts/${props.id}/comments`}>
            <button className="button is-primary" type="button">
              View comments on this post
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostList;
