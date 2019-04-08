import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class CreateComment extends Component {
  constructor(props) {
    super(props);
    if(this.props.history.state){
      this.state={name: '', user_id: this.props.history.state._id, user_email: this.props.history.state.email};
    } else {
      this.state={name: '', user_id: '', user_email: ''};
    }
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

    axios.post(`/api/posts/${this.props.match.params.id}/createComment`, this.state)
    .then(res => this.props.history.push('/'))
    .catch(error=> {
      console.log(error);
    });
  }
  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Create new Comment</h2>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input className="button is-success" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default CreateComment
