import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from './../../actions/accountActions'

class UserEditForm extends Component{

  constructor(){
    super();
    this.state = {
      username: '',
    }
  }

  componentDidMount(nextProps){
    this.setState({username: this.props.username})
  }

  handleOnChange = (event)=>{
    this.setState({[event.target.id]: event.target.value});
  }

  handleOnSubmit = (event)=>{
    event.preventDefault();
    this.props.updateUser(this.props.account.user.id, {username: this.state.username});
  }

  render(){
    let submitBtn = (<div></div>)
    if(this.state.username !== this.props.username){
      submitBtn = (<button type="submit" className="btn btn-primary" disabled={this.props.account.loading}>
        {this.props.account.loading? (<div className="mini-loader"><div /><div /><div /></div>) : 'Update Account'}
      </button>);
    }
    return (<form onSubmit={this.handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="username">Display Name (Optional): </label>
            <input type="text" className="form-control" id="username"
              value={this.state.username} onChange={this.handleOnChange}/>
            <small id="emailHelp" className="form-text text-muted">If blank your email will be used instead.</small>
          </div>
          {submitBtn}
        </form>);
  }

}

function bindStateToProps(state){
  return {account: state.account, username: state.account.user.username}
}

export default connect(bindStateToProps, {updateUser})(UserEditForm);
