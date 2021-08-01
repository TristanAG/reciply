export default function validateCreateRecipe(values) {
  let errors = {}

  // email errors
  if (!values.name) {
    errors.name = "Recipe Name is Required"
  }
  // password errors
  // if (!values.steps) {
  //   errors.steps = "Steps are required... how do you make a recipe without them?"
  // }

  return errors
}
