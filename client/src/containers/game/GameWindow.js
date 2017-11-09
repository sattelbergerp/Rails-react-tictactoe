import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openGame, doTurn } from './../../actions/gameActions';
import GameBoard from './GameBoard';

class NewGameForm extends Component{

  componentDidMount(){
    if(!this.props.inGame && !this.props.loading){
      this.props.openGame(this.props.match.params.id);
    }
  }

  handleOnClick = (index) => {
    this.props.doTurn(index, this.props.game.id);
  }

  currentTurn(){
    if(!this.props.self)return "spectating";
    if(this.props.game.player1 && this.props.self.id===this.props.game.player1.id)
      return this.props.game.current_turn===1? "your_turn" : "opponents_turn";
    if(this.props.game.player2 && this.props.self.id===this.props.game.player2.id)
      return this.props.game.current_turn===2? "your_turn" : "opponents_turn";
    return "spectating";
  }

  render(){
    if(!this.props.inGame) return (<div>Entering game please wait</div>);
    return (<div>
      {this.props.game.name} | {this.props.loading? "Loading..." : ""}<br/>
      Player1: {this.props.game.player1.email}<br/>
      Player2: {this.props.game.player2? this.props.game.player2.email : "NA"}<br/>
      Current Turn: {this.currentTurn()}<br/>
      {this.props.errors.map((error, index)=>{
        return<p key={index}>Error: {error}, </p>
      })}<br/>

      <GameBoard board={this.props.game.board} onClick={this.handleOnClick} clickable={!this.props.loading && this.currentTurn()=="your_turn"}/>
      </div>);
  }

}

function bindStateToProps(state){
  return {
    loading: state.game.loading,
    inGame: state.game.inGame,
    game: state.game.current,
    self: state.account.user,
    errors: state.game.errors
  };
}

export default connect(bindStateToProps, { openGame, doTurn })(NewGameForm);
