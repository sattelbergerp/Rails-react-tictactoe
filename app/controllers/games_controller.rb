class GamesController < ApplicationController

  respond_to :json;

  before_action :set_game, only: [:show, :join, :turn, :destroy]

  def index
    render json: {
      games: ActiveModelSerializers::SerializableResource.new(Game.all.most_recent).as_json
    }
  end

  def show
    since = DateTime.strptime(params[:since] ? "#{params[:since]}" : "0",'%s')
    game_to_send = nil
    game_to_send = @game if @game.updated_at.to_i >= since.to_i
    render json: {
      game: ActiveModelSerializers::SerializableResource.new(game_to_send).as_json,
      timestamp: Time.now.to_i,
      messages: ActiveModelSerializers::SerializableResource.new(@game.messages.where("? <= created_at", since)).as_json
    }
  end

  def create
    if current_user
      @game = Game.new(game_params)
      @game.player1 = current_user
      if @game.save
        render json: {game: ActiveModelSerializers::SerializableResource.new(@game).as_json}
      else
        render json: {errors: @game.errors.messages.to_a.map {|a| "#{a[0]}: #{a[1].join(',')}"}}
      end
    else
      render json: {errors: ['Must be logged in to create a game']}, status: 401
    end
  end

  def destroy
    if current_user && (current_user == @game.player1 || current_user == @game.player2)
      engine = TicTacToeEngine.new(@game)
      if @game.player1 && @game.player2 && engine.has_placed_tile?(current_user)
        engine.update_score(engine.get_player_index(current_user) == 1 ? 2 : 1)
      end
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
      render json: {errors: ["The requested game does not exist (Perhaps the other player left)"]}, status: 404
    end
  end

  def game_params
    params.require(:game).permit(:name)
  end

end
