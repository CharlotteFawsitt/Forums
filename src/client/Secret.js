import React, { Component } from 'react';
import axios from 'axios';
import ForumList from './ForumList';

export default class Secret extends Component {
  constructor() {
    super();
    this.state = {

    };
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
