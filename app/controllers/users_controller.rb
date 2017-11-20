class UsersController < ApplicationController
  respond_to :json;

  before_action :set_user, only: [:show, :update, :vote]

  def index
    page_size = 25
    render json: {
      users: ActiveModelSerializers::SerializableResource.new(User.all.order(wins: :desc).offset(params[:offset].to_i).limit(page_size)).as_json,
      page_size: page_size,
      count: User.count
    }
  end

  def user
    render json: {user: ActiveModelSerializers::SerializableResource.new(current_user).as_json}
  end

  def show
    render json: {user: ActiveModelSerializers::SerializableResource.new(@user).as_json}
  end

  def vote
    @user.votes += 1
    @user.save
    render json: {user: ActiveModelSerializers::SerializableResource.new(@user).as_json}
  end

  def update
    if @user == current_user
      @user.update(params.require(:user).permit(:username))
      render json: {user: ActiveModelSerializers::SerializableResource.new(@user).as_json}
    else
      render json: {errors: ["You don't have permission to do that"]}, status: 403
    end
  end

  private
  def set_user
    @user = User.find_by(id: params[:id])
    render json: {errors: ["That user could not be found"]}, status: 404 if !@user
  end

end
