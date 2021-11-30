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
    console.log('in update tags:')
    console.log(tag)
    // var newArr = [tags]
    // newArr.push(tag)
    // setProto(newArr)

    setTags([...tags, tag])

  }

  function updateRecipeList(tags) {
    setActiveTags(tags)
    // const recipesWithTags = firebase.db.collection('recipes').where("tags", "array-contains-any", tags).orderBy('created', 'desc').onSnapshot(handleSnapshot)
    // firebase.db.collection('recipes').where("tags", "array-contains-any", tags).orderBy('created', 'desc').onSnapshot(handleSnapshot)
    console.log('🚨 🚨 🚨 pause query 🚨 🚨 🚨')
    // firebase.db.collection('recipes').where("tags", "array-contains-any", tags).get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc.data())
    //   })
    // })


    //maybe i don't need to use the snapshot... that's an idea

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
