class GamesController < ApplicationController
  respond_to :json;

  before_action :set_game, only: [:show]

  def show
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

  private
  def set_game
    @game = Game.find(params[:id])
  end

  def game_params
    params.require(:game).permit(:name)
  end

end
