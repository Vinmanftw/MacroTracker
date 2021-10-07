# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "seeding"

# goal1 = Goal.create(protein:160,carbs:175,fat:70,calories:2240,weight:170,body_fat:15,lb_change_per_week:1)
vin = User.create(first_name: "Vincent",last_name:"Orsini",is_male:"Male",age: 18,username: "Vinmanftw", password:"water",password_confirmation:"water")

meal1 = Meal.create(name: "Protein bar",protein: 14,carbs: 36,fat:7,calories:220,dotw: "Monday", user_id: vin.id)


puts "finished seeding"

