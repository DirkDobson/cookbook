import React from 'react'
import {
  Switch,
  Route,
  Link, 
  withRouter,
} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const links = [
  'recipes',
  'ingredients',
  'add_ingredients',
  'add_recipe',
]

const App = ({location}) => (
  <div> 
    { links.map( link =>
        <Link key={link} to={`/${link}`}>
        <Menu.Item
        name={link}
        active={ `/${link}` === location.pathname}
        />
        </Link>
      )
    }
  </div>
)

export default withRouter(App)