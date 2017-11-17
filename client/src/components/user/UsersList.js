import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from './../../actions/usersActions';
import LoadingOverlay from './../../components/LoadingOverlay'

class UsersList extends Component{

  constructor(){
    super();
  }

  componentDidMount(){
    this.props.fetchUsers(0, true);
  }

  render(){
    return (<div>Users list!</div>)
  }

}

function bindStateToProps(state){
  return {
    users: state.users.users
  };
}

export default connect(bindStateToProps, { fetchUsers })(UsersList);
