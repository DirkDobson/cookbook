class Ingredient < ApplicationRecord
  validates_uniqueness_of :name, case_sensitive: false

  has_many :recipe_ingredients, dependent: :destroy
  has_many :recipes, through: :recipe_ingredients
end
