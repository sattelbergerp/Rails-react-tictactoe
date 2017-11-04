class GamesController < ApplicationController
  respond_to :json;

  before_action :set_game, only: [:show]

  def show
    render json: {game: @game}
  end

  private
  def set_game
    @game = Game.find(params[:id])
  end

end
