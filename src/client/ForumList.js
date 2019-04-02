import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Forum from './Forum';
import axios from 'axios';

class ForumList extends Component {
  constructor(props){
    super(props);

    this.state = {Forums: []};
  }

  componentDidMount() {
    axios.get('api/forums')
    .then(response => {
      this.setState({Forums: response.data});
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const forumList = this.state.Forums.map(u => (
      <forumList
        key={u._id}
        id={u._id}
        name={u.name}
        />
    ));

    return(
      <div>
      <h2>Forums</h2>
        <div>{forumList}</div>
    </div>
  );
  }
}

export default ForumList;
