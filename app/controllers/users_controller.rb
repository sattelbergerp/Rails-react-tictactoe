class UsersController < ApplicationController
  respond_to :json;

  before_action :set_user, only: [:show]

  def user
    render json: {user: current_user}
  end

  def show
    render json: {user: @user}
  end

  private
  def set_user
    @user = User.find(params[:id])
  end

end
