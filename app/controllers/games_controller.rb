class GamesController < ApplicationController

  WIN_STATES = ["XXX      ","   XXX   ","      XXX","X  X  X  "," X  X  X ","  X  X  X","X   X   X","  X X X  ",]

  respond_to :json;

  before_action :set_game, only: [:show, :join, :turn, :destroy]

  def index
    render json: {
      games: ActiveModelSerializers::SerializableResource.new(Game.all).as_json
    }
  end

  def show
    if current_user == @game.player1
      @game.player1_last_update = Time.now.to_s
      @game.save
    elsif current_user == @game.player2
      @game.player2_last_update = Time.now.to_s
      @game.save
    end
    render json: {
      game: ActiveModelSerializers::SerializableResource.new(@game).as_json
    }
  end

  def create
    if current_user
      @game = Game.new(game_params)
      @game.player1 = current_user
      @game.player1_last_update = Time.now
      @game.save
      render json: {
        game: ActiveModelSerializers::SerializableResource.new(@game).as_json
      }
    else
      render json: {errors: ['Must be logged in to create a game']}, status: 401
    end
  end

  def destroy
    if current_user == @game.player1 || current_user == @game.player2
      @game.destroy
      render json: {}
    else
      render json: {errors: ['You are not playing the game so you cannot end the game']}, status: 403
    end
  end

  def join
    if current_user
      if !@game.player2
        if @game.player1 != current_user
          @game.player2 = current_user
          @game.player2_last_update = Time.now
          @game.save
          render json: {
            game: ActiveModelSerializers::SerializableResource.new(@game).as_json
          }
        else
          render json: {errors: ['You can not join a game you are already in']}, status: 401
        end
      else
        render json: {errors: ['That game already has a second player (You can spectate instead)']}, status: 401
      end
    else
      render json: {errors: ['Must be logged in to join a game (You can spectate instead)']}, status: 401
    end
  end

  def turn
    player = 0
    if current_user == @game.player1
      player = 1
    elsif current_user == @game.player2
      player = 2
    end
    position = params[:game][:position]

    if player == @game.current_turn
      if valid_move?(position)
        @game.board[position] = @game.current_tile
        @game.turn = !@game.turn
        winner = getWinner()
        if winner > -1
          @game.board = '         '
          @game.turn = false
          @game.swap_players = !@game.swap_players
          @game.player1_wins += winner==1 ? 1 : 0
          @game.player2_wins += winner==2 ? 1 : 0
        end
        @game.save
        render json: {
          game: ActiveModelSerializers::SerializableResource.new(@game).as_json
        }
      else
        render json: {errors: ['Please select a valid tile']}, status: 403
      end
    else
      render json: {errors: ['It is not your turn']}, status: 403
    end
  end

  private
  def getWinner
    board = @game.boardArray
    WIN_STATES.each do |state|
      token = nil
      state.chars.each_with_index do |tile, index|
        if tile != " "
          if token == nil
            token = @game.board[index]
          elsif token != @game.board[index]
            token = nil
            break;
          end
        end
      end

      if token == @game.player1_tile
        return 1
      elsif token == @game.player2_tile
        return 2
      end
    end
    if board.count {|t| t=="X"||t=="O"} == 9
      return 0;
    end
    return -1;
  end

  def set_game
    @game = Game.find_by(id: params[:id])
    if !@game
      render json: {errors: ["The requested game does not exist (Perhaps the other player left)"]}
    end
  end

  def game_params
    params.require(:game).permit(:name)
  end

  def valid_move?(position)
    position >= 0 && position <= 8 && @game.board[position] == " "
  end

end
