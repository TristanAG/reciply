import React from 'react'
import { FirebaseContext } from '../firebase'
import RecipeItem from './recipeItem'
import Link from 'next/link'
import TagWidget from './tagWidget'

export default function RecipeList(props) {
  const { firebase } = React.useContext(FirebaseContext)
  const [recipes, setRecipes] = React.useState([])
  // const [tag, setTag] = React.useState('default')
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
    console.log(tags.length)
    // const recipesWithTags = firebase.db.collection('recipes').where("tags", "array-contains-any", tags).orderBy('created', 'desc').onSnapshot(handleSnapshot)
    // firebase.db.collection('recipes').where("tags", "array-contains-any", tags).orderBy('created', 'desc').onSnapshot(handleSnapshot)

    // firebase.db.collection('recipes').where("tags", "array-contains-any", tags).get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.data())
    //   })
    // })


    //maybe i don't need to use the snapshot... that's an idea

    if (tags.length === 1) {
      firebase.db.collection('recipes').where("tags", "array-contains", tags[0]).orderBy('created', 'desc').onSnapshot(handleSnapshot)
    } else {
      console.log('🚨 🚨 🚨 pause query 🚨 🚨 🚨')

      //so here i will do the array logic, is that true? or perhapse, i will do the querySnapshot method here?
      //actually, i can manipulate the recipes because i already have that object available... i don't know if this is the right way, but again , mvp...

      // console.log(recipes)

      // so loop through the recipes
      let filteredRecipes = []
      recipes.forEach(recipe => {
        if (recipe.tags.includes(tags[tags.length - 1])) {
          console.log('hit')
          console.log(recipe)
          filteredRecipes.push(recipe)
        }
      })

      console.log('filtered recipes')
      console.log(filteredRecipes)

      setRecipes(filteredRecipes)

      // if (recipes.length >= 1) {
      //   setRecipes(recipes)
      // }


      // console.log('last element')
      // console.log(tags[tags.length - 1])
    }


    window.scrollTo(0,0)
  }

  return (
    <>
      <TagWidget tags={tags} />
      {/* {tags.map(tag => (
        <p>{tag}</p>
      ))} */}

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
