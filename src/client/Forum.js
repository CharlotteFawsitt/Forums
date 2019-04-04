import React from "react";
import {Route, Link} from "react-router-dom";

class Forum extends React.Component {
render() {
  return (
      <div className="card">
        <div className="card-content">
          <p>{this.props.forumName}</p>

          <Link to={`/forum/${this.props.id}/posts`}>
            <button type="button">
              View posts on this forum
            </button>
          </Link>
        </div>
      </div>

  );
}


}

export default Forum;
