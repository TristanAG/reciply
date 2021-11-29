import React from 'react'
import { FirebaseContext } from '../firebase'
import RecipeItem from './recipeItem'
import Link from 'next/link'
import TagWidget from './tagWidget'

export default function RecipeList(props) {
  const { firebase } = React.useContext(FirebaseContext)
  const [recipes, setRecipes] = React.useState([])
  const [tag, setTag] = React.useState('default')
  const [activeTags, setActiveTags] = React.useState([])

  React.useEffect(() => {
    getRecipes()
  }, [])

  function getRecipes() {
    alert('cool')
    const theRecipes = firebase.db.collection('recipes').orderBy('created', 'desc').onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {

    //so HERE it will need to all be worked out
    //when creating the recipes array i gotta

    const recipes = snapshot.docs.map(doc => {
      // console.log(doc.data().tags)
      // if (doc.data().)
      return { id: doc.id, ...doc.data() }
    })


    setRecipes(recipes)
  }

  function updateTags(tag) {
    setTag(tag)
  }

  function updateRecipeList(tags) {
    setActiveTags(tags)
    // const recipesWithTags = firebase.db.collection('recipes').where("tags", "array-contains-any", tags).orderBy('created', 'desc').onSnapshot(handleSnapshot)
    const recipesWithTags = firebase.db.collection('recipes').where("tags", "array-contains-any", tags).orderBy('created', 'desc').onSnapshot(handleSnapshot)

    //maybe i don't need to use the snapshot... that's an idea

    window.scrollTo(0,0)
  }

  return (
    <>
      <TagWidget tag={tag} updateRecipeList={updateRecipeList} />
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
