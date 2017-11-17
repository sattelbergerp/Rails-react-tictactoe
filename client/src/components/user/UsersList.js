import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    return (<div>
      Users: {this.props.users.length}, Loading: {this.props.loading? "Yes" : "No"}, Page Size: {this.props.pageSize}<br/>
      <ul>
      {this.props.users.map((user, index)=>{
        return <li key={index}>
          Email: {user.email}, Wins: {user.wins}, Losses: {user.losses}, Win %: {user.win_percent}
          <Link to={"/users/"+user.id} > Profile</Link>
        </li>
      })}
      </ul>
    </div>)
  }

}

function bindStateToProps(state){
  return {
    users: state.users.users,
    loading: state.users.loading,
    pageSize: state.users.users_page_size
  };
}

export default connect(bindStateToProps, { fetchUsers })(UsersList);
