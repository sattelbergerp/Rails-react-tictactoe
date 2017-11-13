class MessagesController < ApplicationController
  respond_to :json;

  before_action :set_game

  def create
    if current_user
      @game.messages.create(user: current_user, contents: params[:message][:contents])
      render json: {}
    else
      render json: {errors: ["You must be signed in to type in chat"], status: 403}
    end
  end

  private
  def set_game
    @game = Game.find_by(id: params[:game_id])
    if !@game
      render json: {errors: ["The requested game does not exist (Perhaps the other player left)"]}
    end
  end

end
