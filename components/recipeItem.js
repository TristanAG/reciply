import React from 'react'
import format from 'date-fns/format'
import Link from 'next/link'
import RecipeContext from '../components/RecipeContext'
// import { FirebaseContext } from '../firebase'

import { useRouter } from 'next/router'


function RecipeItem({ recipe, index, showCount, firebase }) {
  const router = useRouter()
  // const { firebase } = React.useContext(FirebaseContext)

  const recipeContext = React.useContext(RecipeContext);

  function updateRecipeContext(recipe) {

    recipeContext.setRecipe(recipe)


    const href = '/edit-recipe/' + recipe.name.split(' ').join('-').toLowerCase()
    // router.push()
    // router.push('/edit-recipe/', href)
    router.push('/edit-recipe/', href)
  }

  function deleteRecipe(recipe) {
    firebase.db.collection('recipes').doc(recipe.id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  return(
    <div>
      <hr />
      <p>{recipe.name} | {recipe.steps}</p>
      <small>{format(recipe.created, 'MMMM Mo yyyy')}</small>
      <p>
        <Link href={'/' + recipe.slug} >
          <a className="has-text-primary">view</a>
        </Link>
        &nbsp;|&nbsp;
        {/* <span className="has-text-link edit-button" onClick={() => updateRecipeContext(recipe)}>edit</span> */}
        <Link href={'/' + recipe.slug + '/edit'}>
          <a className="has-text-primary">edit</a>
        </Link>
        &nbsp;|&nbsp;
        <span className="has-text-danger edit-button" onClick={() => deleteRecipe(recipe)}>delete</span>
      </p>
      <style jsx>{`
        .edit-button:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default RecipeItem;
