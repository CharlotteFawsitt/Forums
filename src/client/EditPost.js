import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', uid: '', forum_id: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/posts/${this.props.match.params.id}`)
    .then(response => {
      this.setState({
        name: response.data.name,
        email: response.data.user_email,
        uid: response.data.user_id,
        forum_id: response.data.forumid
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.put(`/api/posts/${this.props.match.params.id}/editPost`, this.state)
    .then(res => this.props.history.push('/'))
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h2>Edit Post</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditPost;
