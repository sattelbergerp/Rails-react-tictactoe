class GamesController < ApplicationController
  respond_to :json;

  before_action :set_game, only: [:show, :join, :turn]

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
  def set_game
    @game = Game.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:name)
  end

  def valid_move?(position)
    position >= 0 && position <= 8 && @game.board[position] == " "
  end

end
