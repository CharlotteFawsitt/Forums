import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', uid: '', post_id: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/comments/${this.props.match.params.id}`)
    .then(response => {
      this.setState({
        name: response.data.name,
        email: response.data.user_email,
        uid: response.data.user_id,
        post_id: response.data.post_id
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

    axios.put(`/api/comments/${this.props.match.params.id}/editComment`, this.state)
    .then(res => this.props.history.push('/'))
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h2>Edit comment</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Comment:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditComment;
