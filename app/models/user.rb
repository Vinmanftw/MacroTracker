class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    validates :first_name, presence: true
    validates :is_male, presence: true
    has_secure_password 
    has_many :meals

        
   
end
