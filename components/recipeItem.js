function RecipeItem({ recipe, index, showCount }) {
  return(
    <div>
      <hr />
      {/* {showCount && <span>{index}.</span>}
      {recipe.name} */}
      <p>recipe item | {recipe.name}, {recipe.steps}</p>
    </div>
  )
}

export default RecipeItem;
