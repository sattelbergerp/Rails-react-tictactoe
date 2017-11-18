class UsersController < ApplicationController
  respond_to :json;

  before_action :set_user, only: [:show, :update]

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

  def update
    @user.update(params.require(:user).permit(:username))
    render json: {user: ActiveModelSerializers::SerializableResource.new(@user).as_json}
  end

  private
  def set_user
    @user = User.find_by(id: params[:id])
    render json: {errors: ["That user could not be found"]}, status: 404 if !@user
  end

end
