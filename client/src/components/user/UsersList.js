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

  loadMore = ()=>{
    this.props.fetchUsers(this.props.users.length);
  }

  render(){
    let hasMore = (this.props.users.length < this.props.count);
    let footer = (<div></div>);

    if(this.props.loading)
      footer = (<div className="mini-loader"><div /><div /><div /></div>);
    else if(hasMore)
      footer = (<a href="javascript:void(0)" onClick={this.loadMore} >Load More</a>)
    else
      footer = "End of Content"

    return (<div>
      <ul>
      {this.props.users.map((user, index)=>{
        return <li key={index}>
          Email: {user.email}, Wins: {user.wins}, Losses: {user.losses}, Win %: {user.win_percent}
          <Link to={"/users/"+user.id} > Profile</Link>
        </li>
      })}
      </ul>
      <div className="users-list-footer">{footer}</div>
    </div>)
  }

}

function bindStateToProps(state){
  return {
    users: state.users.users,
    loading: state.users.loading,
    pageSize: state.users.users_page_size,
    count: state.users.users_count
  };
}

export default connect(bindStateToProps, { fetchUsers })(UsersList);
