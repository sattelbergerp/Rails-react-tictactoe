class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    private

    def sign_up_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end

    def account_update_params
      params.require(:user).permit(:username)
    end
end
