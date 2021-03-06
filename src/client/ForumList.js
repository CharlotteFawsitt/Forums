import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Forum from "./Forum";
import axios from "axios";

class ForumList extends Component {
  constructor(props) {
    super(props);

    this.state = { Forums: [], currentUser: "" };
  }

  componentDidMount() {
    axios
      .get("api/forum")
      .then(response => {
        this.setState({ Forums: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const forumList = this.state.Forums.map(u => (
      <Forum key={u._id} id={u._id} forumName={u.name} image={u.image} />
    ));

    return (
      <div>
        <h2 className="title is-2">Forums</h2>
        <div>
          <div>{forumList}</div>
        </div>
      </div>
    );
  }
}

export default ForumList;
