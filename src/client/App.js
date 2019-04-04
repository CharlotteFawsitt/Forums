import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ForumList from './ForumList';
import PostList from './PostList';
import CreatePost from './CreatePost';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {loggedIn: false};
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }



  logout(props) {
    axios.get('api/logout')
      .then(res => {
        this.setState({loggedIn: false});
        props.history.push('/');
      })
      .catch( err => console.log(err));
    return null;
  }

  login() {
    this.setState({loggedIn: true});
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/forum">Forums</Link></li>
          {!this.state.loggedIn && <li><Link to="/login">Login</Link></li>}
          {!this.state.loggedIn && <li><Link to="/register">Register</Link></li>}
          {this.state.loggedIn && <li><Link to="/logout">Logout</Link></li>}
        </ul>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route exact path="/forum" component={ForumList} />
          <Route exact path="/forum/:id" component={PostList} />
          <Route path="/forum/:id/createPost" component={withAuth(CreatePost)} />
          <Route path="/login" render={(props) => <Login {...props} handleLogin={this.login} />} />
          <Route path="/logout" render={this.logout}/>
        </Switch>
      </div>
    );
  }
}

export default App;
