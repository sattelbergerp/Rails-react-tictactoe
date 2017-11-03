import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './../../actions/usersActions'

class UserInfoPage extends Component{

  componentDidMount(){
    this.props.fetchUser(this.props.match.params.id);
  }

  render(){
    let content = (<div>Loading...</div>);
    if(!this.props.userLoading){
      content = (<div>
          {this.props.user.email}
        </div>);
    }
    return (<div>
        <h2>User</h2>
        {content}
      </div>);
  }

}

function bindStateToProps(state){
  return {
    user: state.users.user,
    userLoading: state.users.loading
  };
}

export default connect(bindStateToProps, {fetchUser})(UserInfoPage);
