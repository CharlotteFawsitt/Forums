import React, { Component } from 'react';
import axios from 'axios';
import Forum from "./Forum";

export default class Secret extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {
    axios.get('/api/secret')
      .then(response => this.setState({message: response.data}));
  }

  render() {
    const forumList = this.props.forums.map((f, i) => (
      <forumList
        key={f._id}
        id={f._id}
        name={f.name}
        email={f.email}
        />
    ));
    return (
      <div>
        <div>{forumList}</div>
      </div>
    );
  }
}
