function RecipeItem({ recipe, index, showCount }) {
  return(
    <div>
      <hr />
      <p>recipe item | {recipe.name}, {recipe.steps}</p>
    </div>
  )
}

export default RecipeItem;
