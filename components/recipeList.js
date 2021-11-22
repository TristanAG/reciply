import React from 'react'
import { FirebaseContext } from '../firebase'
import RecipeItem from './recipeItem'
import Link from 'next/link'
import TagWidget from './tagWidget'

export default function RecipeList(props) {
  const { firebase } = React.useContext(FirebaseContext)
  const [recipes, setRecipes] = React.useState([])
  const [tag, setTag] = React.useState(null)

  React.useEffect(() => {
    getRecipes()
  }, [])

  function getRecipes() {
    const theRecipes = firebase.db.collection('recipes').orderBy('created', 'desc').onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {
    const recipes = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    setRecipes(recipes)
  }

  function updateRecipeList(tag) {
    const recipesWithTags = firebase.db.collection('recipes').where("tags", "array-contains", tag).orderBy('created', 'desc').onSnapshot(handleSnapshot)
    window.scrollTo(0,0);
    setTag(tag)
  }

  return (
    <>
      <TagWidget tag={tag} />
      <div>
        {recipes && recipes.map((recipe, index) => (
          <RecipeItem
            key={recipe.id}
            showCount={true}
            recipe={recipe}
            index={index + 1}
            firebase={firebase}
            updateRecipeList={updateRecipeList}
          />
        ))}
      </div>
    </>
  )
}
