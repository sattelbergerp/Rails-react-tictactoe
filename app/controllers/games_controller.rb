class GamesController < ApplicationController

  respond_to :json;

  before_action :set_game, only: [:show, :join, :turn, :destroy]

  def index
    render json: {
      games: ActiveModelSerializers::SerializableResource.new(Game.all.most_recent).as_json
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
    since = DateTime.strptime(params[:since] ? "#{params[:since]}" : "0",'%s')
    render json: {
      game: ActiveModelSerializers::SerializableResource.new(@game).as_json,
      timestamp: Time.now.to_i,
      messages: ActiveModelSerializers::SerializableResource.new(@game.messages.where("? < created_at", since)).as_json
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
    if current_user && (current_user == @game.player1 || current_user == @game.player2)
      @game.messages.destroy_all
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
    engine = TicTacToeEngine.new(@game)
    position = params[:game][:position]

    if engine.players_turn?(current_user)
      if engine.do_turn(position)
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
    @game = Game.find_by(id: params[:id])
    if !@game
      render json: {errors: ["The requested game does not exist (Perhaps the other player left)"]}
    end
  end

  def game_params
    params.require(:game).permit(:name)
  end

end
