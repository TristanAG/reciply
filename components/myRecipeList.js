import React from 'react'
import { FirebaseContext } from '../firebase'
import RecipeItem from './recipeItem'
import Link from 'next/link'


export default function MyRecipeList(props) {
  const { firebase, user } = React.useContext(FirebaseContext)
  const [recipes, setRecipes] = React.useState([])

  React.useEffect(() => {
    console.log('look2')
    console.log(user.displayName)
    getRecipes(user.displayName)
    getRecipes()
  }, [user])

  function getRecipes(user) {
    // const theRecipes = firebase.db.collection('recipes').where("postedBy.id", "==", user.id).get()
  }

  // function handleSnapshot(snapshot) {
  //   const recipes = snapshot.docs.map(doc => {
  //     return { id: doc.id, ...doc.data() }
  //   })
  //   setRecipes(recipes)
  // }

  return (
    <div>
      yo
      {/* {recipes && recipes.map((recipe, index) => (

          <RecipeItem
            key={recipe.id}
            showCount={true}
            recipe={recipe}
            index={index + 1}
            firebase={firebase}
          />

      ))} */}
    </div>
  )
}
