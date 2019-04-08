import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";

class Forum extends React.Component {
  render() {
    return (
      <div className="card Cards">
        <div className="card-content">
          <img
            alt="Forum image"
            src={this.props.image}
            width="300px"
            height="200px"
          />
          <p>{this.props.forumName}</p>

          <Link to={`/forum/${this.props.id}/posts`}>
            <button className="button is-primary" type="button">
              View posts on this forum
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Forum;
