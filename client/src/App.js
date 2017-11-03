import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import UserContainer from './containers/user/UserContainer';
import { connect } from 'react-redux';
import { fetchCurrentUser, signOut } from './actions/accountActions'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {

  componentDidMount(){
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <div className="App" id="app">
        {this.props.account.loading? 'Loading' : 'Idle'}<br />
        {this.props.account.loggedIn? 'Logged In' : 'No User'}<br />
        {this.props.account.user.email}<br />
        {this.props.account.error}
        <a href="javascript:void(0)" onClick={event=>this.props.signOut()}>Sign Out</a>
        <Router>
          <Route path="/users" component={UserContainer} />
        </Router>
      </div>
    );
  }
}

function bindStateToProps(state){
  return {account: state.account}
}


export default connect(bindStateToProps, {fetchCurrentUser, signOut})(App);
