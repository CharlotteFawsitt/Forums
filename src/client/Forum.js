import React from "react";
import {Route, Link} from "react-router-dom";

class Forum extends React.Component {
render() {
  return (
    <div>
      <div>
        <p>{this.props.forumName}</p>

        <Link to={`/Forum/${this.props.id}`}>
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
