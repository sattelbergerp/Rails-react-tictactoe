class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  #TODO enable CSRF
  #Nothing is more permanent than a temporary solution. - Some Russian Dude
  #Ничто не является более постоянным, чем временное решение. - Google Translate
  #protect_from_forgery with: :exception
  before_action :fake_lag

  def test
    render json: '{"res":"OK"}'
  end

  def fake_lag
    sleep 0.4
  end

end
