class UsersController < ApplicationController
  respond_to :json;

  before_action :set_user, only: [:show]

  def user
    render json: {user: ActiveModelSerializers::SerializableResource.new(current_user).as_json}
  end

  def show
    render json: {user: ActiveModelSerializers::SerializableResource.new(@user).as_json}
  end

  private
  def set_user
    @user = User.find(params[:id])
  end

end
