class UsersController < ApplicationController
  respond_to :json;

  before_action :set_user, only: [:show]

  def index
    page_size = 25
    render json: {
      users: ActiveModelSerializers::SerializableResource.new(User.all.offset(params[:offset].to_i).limit(page_size)).as_json,
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

  private
  def set_user
    @user = User.find(params[:id])
  end

end
