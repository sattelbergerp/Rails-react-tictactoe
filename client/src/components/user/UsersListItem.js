import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from './../../actions/usersActions';

class UsersListItem extends Component{

  constructor(){
    super();
  }

  vote = (event) => {
    this.props.updateUser(this.props.user.id);
  }

  render(){
    return <tr>
      <td><Link to={"/users/"+this.props.user.id} >{this.props.user.display_name}</Link></td>
      <td>{this.props.user.wins}</td>
      <td>{this.props.user.losses}</td>
      <td>
        {this.props.user.win_percent}%
        <span className="right">
          Votes: {this.props.user.votes},
          <button onClick={this.vote} disabled={this.props.loading}>
            {this.props.loading?(<div className="mini-loader"><div /><div /><div /></div>) : "Vote"}
          </button>
        </span>
      </td>
    </tr>
  }

}

function bindStateToProps(state){
  return {loading: state.users.loading};
}

export default connect(bindStateToProps, {updateUser})(UsersListItem);
