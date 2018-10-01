class Api::RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :update, :destroy]

  def index
    render json: Recipe.all
  end

  def show
    render json: @recipe {
      id: @recipe.id,
      name: @recipe.name,
      description: @recipe.description,
      ingredients: @recipe.recipe_ingredients
    }
  end

  def create
    recipe = Recipe.new(recipe_params)
    if recipe.save
      render json: recipe
    else
      render_error(recipe)
    end
  end

  def update
    if @recipe.update(recipe_params)
      render json: @recipe
    else 
      render_error(@recipe)
    end
  end

  def destroy
    @recipe.destroy
  end

  private 
  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def recipe_params
    params.require(:recipe).permit(:name, :description)
  end
end
