import React from 'react'

const RecipeContext = React.createContext('terp')

function doSomething() {
  return 'doin thangs boi'
}

export { RecipeContext as default, doSomething }
