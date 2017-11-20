import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { openGame, doTurn, deleteGame } from './../../actions/gameActions';
import GameBoard from './GameBoard';
import PlayerInfo from './../../components/game/PlayerInfo'
import LoadingOverlay from './../../components/LoadingOverlay'
import CurrentTurnBanner from './../../components/game/CurrentTurnBanner'
import ChatBox from './../../components/game/ChatBox'
import UserInfoPage from './../../components/user/UserInfoPage';

class NewGameForm extends Component{

  LEAVE_MSG = "Since you have played at least 1 turn this round you will recieve a loss for leaving. Click \'Ok\' to leave anyway.";

  componentDidMount(){
    if(!this.props.inGame && !this.props.loading){
      this.props.openGame(this.props.match.params.id);
    }
    window.onbeforeunload = this.onCloseTabRequest;
    window.onunload = this.onCloseGame;
  }

  componentWillUnmount = () => {
    window.onbeforeunload = undefined;
    window.onunload = undefined;
  }

  handleOnClick = (index) => {
    this.props.doTurn(index, this.props.game.id);
  }

  onCloseTabRequest = (event) => {
    return this.hasPlayedTurn()?"Leave game?" : undefined;
  }

  onCloseGameRequest = (event) => {
    if(!this.hasPlayedTurn() || window.confirm(this.LEAVE_MSG)){
      this.onCloseGame();
    }
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

  hasPlayedTurn(){
    if(!this.props.inGame||!this.props.game.player1 || !this.props.game.player2 || !this.props.game.board)return false;
    if(this.props.self.id===this.props.game.player1.id && this.props.game.board.includes(this.props.game.player1_tile))return true;
    if(this.props.self.id===this.props.game.player2.id && this.props.game.board.includes(this.props.game.player2_tile))return true;
    return false;
  }

  render(){
    let errors = <div></div>;

    if(this.props.errors.length > 0)errors = (<div className="alert alert-danger">{this.props.errors.map((error, index)=>{
      return<p key={index}>{error}</p>
    })}</div>);

    let gameBoard = (<div></div>);
    if(this.props.game.board){
      gameBoard = (<GameBoard board={this.props.game.board} onClick={this.handleOnClick} clickable={!this.props.loading && this.currentTurn()==="your_turn"}/>);
    }

    return (<div>
    <div className="overlay">
      <div className="game-window">
        <LoadingOverlay show={this.props.loading} bg={!this.props.inGame}/>
        <div className="title">
        {this.props.game.name} - {this.hasPlayedTurn()? "Turn" : "No"}
        <button type="button" className="close" onClick={this.onCloseGameRequest} disabled={this.props.loading}>
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div className="clearfix">
        <PlayerInfo game={this.props.game} playerIndex={1} />
        <PlayerInfo game={this.props.game} playerIndex={2} right="true"/>
        </div>
        <CurrentTurnBanner turn={this.currentTurn()} />
        {errors}

        {gameBoard}
        <ChatBox />
      </div>
    </div>
    <Route path={this.props.match.url+"/users/:id"} component={UserInfoPage} />
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
