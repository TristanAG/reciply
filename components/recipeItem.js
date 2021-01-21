import format from 'date-fns/format'

function RecipeItem({ recipe, index, showCount }) {
  return(
    <div>
      <hr />
      <p>{recipe.name} | {recipe.steps}</p>
      <small>{format(recipe.created, 'MMMM Mo yyyy')}</small>
    </div>
  )
}

export default RecipeItem;
