import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state={name: ''}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const name = event.target.name;
    const value = event.target.value;

    this.setState({name:value});
  }

  handleSubmit(event){
    event.preventDefault();

    axios.post(`/api/forum/${this.props.match.params.id}/createPost`, this.state)
    .then(res => this.props.history.push('/'))
    .catch(error=> {
      console.log(error);
    });
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Create new post</h2>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default CreatePost
