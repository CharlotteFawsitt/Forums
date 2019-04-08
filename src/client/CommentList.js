import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], user_id: "", posts: [] };

    this.updatePosts = this.updatePosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.updatePosts();
  }

  updatePosts() {
    axios
      .get(`/api/posts/${this.props.match.params.id}/comments`)
      .then(response => {
        this.setState({ comments: response.data });
        if (this.props.history.state) {
          this.setState({ user_id: this.props.history.state._id });
        } else {
          this.setState({ user_id: "" });
        }
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`/api/posts/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(CommentId) {
    axios
      .delete(`/api/posts/${this.props.match.params.id}/comments/delete`, {
        data: {
          id: CommentId
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
    const commentList = this.state.comments.map(u => (
      <Comment
        key={u._id}
        id={u._id}
        uid={u.user_id}
        postId={u.post_id}
        name={u.name}
        email={u.user_email}
        currentUser={this.state.user_id}
        handleDelete={this.handleDelete}
      />
    ));
    const post = (
      <Post
        key={this.state.posts._id}
        id={this.state.posts._id}
        name={this.state.posts.name}
        email={this.state.posts.user_email}
      />
    );

    return (
      <div className="column">
        <div>{post}</div>
        {commentList.length ? (
          <div>
            <h2>All Comments</h2>
            <Link to={`/posts/${this.props.match.params.id}/createComment`}>
              <button className="button is-primary" type="button">
                Create new Comment
              </button>
            </Link>
            <div>{commentList}</div>
          </div>
        ) : (
          <div>
            <h2>No Comments</h2>
            <Link to={`/posts/${this.props.match.params.id}/createComment`}>
              <button type="button">Create new Comment</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const Comment = props => {
  return (
    <div className="card Cards">
      <div className="card-content is-4by3">
        <h2 className="card-header-title">{props.name}</h2>
        <div className="media-content">
          <div className="content">Posted by: {props.email}</div>
          {props.uid === props.currentUser ? (
            <button
              className="button is-danger"
              type="button"
              onClick={() => {
                props.handleDelete(props.id);
              }}
            >
              Delete Comment
            </button>
          ) : (
            <div />
          )}
          {props.uid === props.currentUser ? (
            <Link
              to={`/posts/${props.postId}/comments/${props.id}/editComment`}
            >
              <button className="button is-info" type="button">
                Edit Comment
              </button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

const Post = props => {
  return (
    <div className="card Cards">
      <h1 className="title is-5">Original Post</h1>
      <div className="card-content is-4by3">
        <h2 className="card-header-title">{props.name}</h2>
        <div className="media-content">
          <div className="content">Posted by: {props.email}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
