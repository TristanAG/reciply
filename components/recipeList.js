import React from 'react'
import { FirebaseContext } from '../firebase'
import RecipeItem from './recipeItem'
import Link from 'next/link'
import TagWidget from './tagWidget'

export default function RecipeList(props) {
  const { firebase } = React.useContext(FirebaseContext)
  const [recipes, setRecipes] = React.useState([])
  const [tags, setTags] = React.useState([])

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

  function updateTags(tag) {
    setTags([...tags, tag])
    updateRecipeList([...tags, tag])
  }

  function updateRecipeList(tags) {
    if (tags.length === 1) {
      firebase.db.collection('recipes').where("tags", "array-contains", tags[0]).orderBy('created', 'desc').onSnapshot(handleSnapshot)
    } else {
      let filteredRecipes = []
      recipes.forEach(recipe => {
        if (recipe.tags.includes(tags[tags.length - 1])) {
          filteredRecipes.push(recipe)
        }
      })
      setRecipes(filteredRecipes)
    }
    window.scrollTo(0,0)
  }

  return (
    <>
      <TagWidget tags={tags} />
      <div>
        {recipes && recipes.map((recipe, index) => (
          <RecipeItem
            key={recipe.id}
            showCount={true}
            recipe={recipe}
            index={index + 1}
            firebase={firebase}
            updateTags={updateTags}
          />
        ))}
      </div>
    </>
  )
}
