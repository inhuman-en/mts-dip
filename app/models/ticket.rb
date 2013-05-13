class Ticket < ActiveRecord::Base
  
  attr_accessible :data, :time, :doctor_id, :user_id
   belongs_to :user
   belongs_to :doctor
end
