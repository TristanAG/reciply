import React from 'react'
import { FirebaseContext } from '../firebase'
import RecipeItem from './recipeItem'
import Link from 'next/link'
import TagWidget from './tagWidget'

export default function RecipeList(props) {
  const { firebase } = React.useContext(FirebaseContext)
  const [recipes, setRecipes] = React.useState([])
  const [tag, setTag] = React.useState('default')

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

    //change to array-contains-any
    //limit of 10 tags then
    //https://firebase.google.com/docs/firestore/query-data/queries#in_and_array-contains-any
    //swap array-contains with array-contains-any, and pass in the tag array instead of
    // const recipesWithTags = firebase.db.collection('recipes').where("tags", "array-contains", tag).orderBy('created', 'desc').onSnapshot(handleSnapshot)
    window.scrollTo(0,0);
    setTag(tag)
  }

  function updateRecipeListMulti(tags) {
    console.log('tags: ' + tags)
    const recipesWithTags = firebase.db.collection('recipes').where("tags", "array-contains-any", tags).orderBy('created', 'desc').onSnapshot(handleSnapshot)
  }

  return (
    <>
      <TagWidget tag={tag} updateRecipeListMulti={updateRecipeListMulti} />
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
