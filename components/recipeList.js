import React from 'react'
import { FirebaseContext } from '../firebase'
import RecipeItem from './recipeItem'

function RecipeList(props) {
  const { firebase } = React.useContext(FirebaseContext)
  const [recipes, setRecipes] = React.useState([])

  React.useEffect(() => {
    getRecipes()
    // console.log('test')
  }, [])

  function getRecipes() {
    const theRecipes = firebase.db.collection('recipes').onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {
    const recipes = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    setRecipes(recipes)
  }

  return (
    <div>
      {recipes && recipes.map((recipe, index) => (
        <RecipeItem
          key={recipe.id}
          showCount={true}
          recipe={recipe}
          index={index + 1}
        />
      ))}

    </div>
  )
}

export default RecipeList
