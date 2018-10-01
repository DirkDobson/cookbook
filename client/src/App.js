import React, {Fragment} from 'react'
import {
  Switch,
  Route,
  Link, 
  withRouter,
} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import AddIngredient from './AddIngredient'
import AddRecipe from './AddRecipe'
import Recipe from './Recipe'

const links = [
  'recipes',
  'ingredients',
  'add_ingredients',
  'add_recipe',
]

const App = ({location}) => (
  <Fragment>
  <Menu> 
    { links.map( link =>
        <Link key={link} to={`/${link}`}>
        <Menu.Item
        name={link}
        active={ `/${link}` === location.pathname}
        />
        </Link>
      )
    }
  </Menu>
  <Switch>
    <Route exact path="/add_ingredients" component={AddIngredient} />
    <Route exact path="/add_recipe" component={AddRecipe} />
    <Route exact path="/recipes/:id" component={Recipe} />
  </Switch>
  </Fragment>
)

export default withRouter(App)