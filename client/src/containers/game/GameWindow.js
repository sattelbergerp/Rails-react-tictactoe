import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openGame, doTurn, deleteGame } from './../../actions/gameActions';
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

  onCloseGame = (event) => {
    this.props.deleteGame(this.props.game.id);
    this.props.history.push('/');
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
    let errors = this.props.errors.map((error, index)=>{
      return<p key={index}>Error: {error}, </p>
    });
    if(!this.props.inGame) return (<div>Entering game please wait {errors}</div>);

    let player2_hud = (<div>No Player 2</div>)
    if(this.props.game.player2){
      player2_hud = (<span>{this.props.game.player2.email}, W:{this.props.game.player2_wins}</span>)
    }

    return (<div>
      <button type="button" className="close" onClick={this.onCloseGame} disabled={this.props.loading}>
        <span aria-hidden="true">&times;</span>
      </button>
      {this.props.game.name} | {this.props.loading? "Loading..." : ""}<br/>
      Player1: {this.props.game.player1.email}, W:{this.props.game.player1_wins}<br/>
      Player2: {player2_hud}<br/>
      Current Turn: {this.currentTurn()}<br/>
      {errors}
      <br/>

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

export default connect(bindStateToProps, { openGame, doTurn, deleteGame })(NewGameForm);
