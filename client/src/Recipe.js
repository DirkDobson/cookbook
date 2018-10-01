import React from 'react'
import axios from 'axios'
import {
  Form,
  Card,
  Header,
  List,
} from 'semantic-ui-react'


class Recipe extends React.Component {
  state = { recipe: {}, ingredients: [], ingredient: '', amount: '' }

  componentDidMount() {
    
    axios.get(`/api/recipes/${this.props.match.params.id}`)
      .then( res => this.setState({ recipe: res.data}) )
    axios.get('/api/recipe_ingredients/new')
      .then( res => this.setState({ ingredients: res.data }) )
  }

  ingredientOptions = () => {
    return this.state.ingredients.map( ing => {
      return { key: ing.id, value: ing.id, text: ing.name }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      ingredient,
      amount,
      recipe: { id }
    } = this.state
    const recipe_ingredient = {
      recipe_id: id, 
      ingredient_id: ingredient,
      amount,
    }

    axios.post('/api/recipe_ingredients', {recipe_ingredient})
      .then( res => this.setState({ ingredient: '', amount: '', recipe: res.data }) )
  }

  changeIngredient = (_, { value }) => {
    this.setState({ ingredient: value})
  }

  handleChange = (e) => {
    this.setState({ amount: e.target.value})
  }

  mapIngredients = () => {
    const {recipe, ingredients } = this.state
    return recipe.ingredients.map ( ing => {
      return{
        amount: ing.amount,
        name: ingredients.find( i => i.id === ing.ingredient_id ).name
      }
    })
  }
  render() {
    const { 
      recipe: { name, description },
      ingredients: [],
      ingredient,
      amount,

    } = this.state
    return (
      <div>
        <Card>
          <Card.Content>
            <Card.Header>
              { name }
            </Card.Header>
            <Card.Description>
              { description }
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Header>Add Ingredient</Header>
          <Form onSubmit={this.handleSubmit} >
          <Form.Input
          value={amount}
          onChange={this.handleChange}
          required
          />
          <Form.Select
            options={this.ingredientOptions()}
            value={ingredient}
            onChange={this.changeIngredient}
            />
            <Form.Button>+</Form.Button>
            </Form>
          </Card.Content>
        </Card>
        <List divided>
          { 
            this.mapIngredients().map( i => 
                <List.Item key={i.id}>
                <List.Content>
                  <List.Header>{i.name}</List.Header>
                  <List.Description>{i.amount}</List.Description>
                </List.Content>
                </List.Item>
              )
          }
        </List>
      </div>
    )
  }
}

export default Recipe