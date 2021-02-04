import React from 'react'
import format from 'date-fns/format'
import Link from 'next/link'
import RecipeContext from '../components/RecipeContext'

import { useRouter } from 'next/router'


function RecipeItem({ recipe, index, showCount }) {
  const router = useRouter()

  const recipeContext = React.useContext(RecipeContext);

  function updateRecipeContext(recipe) {

    recipeContext.setRecipe(recipe)


    const href = '/edit-recipe/' + recipe.name.split(' ').join('-').toLowerCase()
    router.push('/edit-recipe/')
  }

  return(
    <div>
      <hr />
      <p>{recipe.name} | {recipe.steps}</p>
      <small>{format(recipe.created, 'MMMM Mo yyyy')}</small>
      <p>
        <Link href="/recipes/[recipe.name]" as={'/recipes/' + recipe.name.split(' ').join('-').toLowerCase()}>
          <a className="has-text-primary">view</a>
        </Link>
        &nbsp;|&nbsp;
        <span className="has-text-link edit-button" onClick={() => updateRecipeContext(recipe)}>edit</span>
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
