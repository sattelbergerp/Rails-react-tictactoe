class GamesController < ApplicationController
  respond_to :json;

  before_action :set_game, only: [:show, :join]

  def show
    if current_user == @game.player1
      @game.player1_last_update = Time.now
    elsif current_user == @game.player2
      @game.player2_last_update = Time.now
    end
    render json: {
      game: ActiveModelSerializers::SerializableResource.new(@game).as_json
    }
  end

  def create
    if current_user
      @game = Game.new(game_params)
      @game.player1 = current_user
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

  private
  def set_game
    @game = Game.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:name)
  end

end
