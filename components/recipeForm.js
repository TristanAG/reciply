import useFormValidation from '../components/auth/useFormValidation'
import validateCreateRecipe from '../components/auth/validateCreateRecipe'
import { FirebaseContext } from '../firebase'
import { useRouter } from 'next/router'
import Ingredient from '../components/Ingredient'
import { useEffect, useState } from 'react'
import RecipeContext from '../components/RecipeContext'

const INITIAL_STATE = {
  name: "",
  steps: "",
  ingredientFields: []
}

export default function RecipeForm({ mode, recipe, id }) {

  // const recipeContext = React.useContext(RecipeContext);
  const { firebase, user } = React.useContext(FirebaseContext)

  const router = useRouter()

  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateRecipe, handleCreateRecipe)

  //define the fields
  const [ingredientFields, setIngredientFields] = useState([{ ingredientName: '', ingredientQuantity: '' }])

  useEffect(() => {
    if (mode === 'edit') {
      values.name = recipe.name
      values.steps = recipe.steps
      setIngredientFields(recipe.ingredients)
    }
  }, [mode])

  const handleAddIngredientFields = () => {
    const values = [...ingredientFields];
    values.push({ ingredientName: '', ingredientQuantity: '' });
    setIngredientFields(values);
  }

  const handleRemoveIngredientFields = index => {
    const values = [...ingredientFields];
    values.splice(index, 1);
    setIngredientFields(values);
  }

  const handleIngredientChange = (index, event) => {
    const values = [...ingredientFields];
    if (event.target.name === "ingredientName") {
      values[index].ingredientName = event.target.value;
    } else {
      values[index].ingredientQuantity = event.target.value;
    }

    setIngredientFields(values);
  };

  function handleCreateRecipe() {
    const { name, steps } = values


    const recipe = {
      name,
      steps,
      ingredients: ingredientFields,
      postedBy: {
        id: user.uid,
        name: user.displayName
      },
      likes: [],
      slug: name.split(' ').join('-').toLowerCase(),
      created: Date.now()
    }

    if (mode === 'add') {
      AddNewRecipe(recipe)
    } else {
      UpdateRecipe(recipe)
    }

  }

  function AddNewRecipe(recipe) {
    alert('Add New Recipe')
    // firebase.db.collection('recipes').add(recipe)
    // router.push('/')
  }

  function UpdateRecipe(recipe) {
    // alert(recipeContext.recipe.id)
    //I don't have the doc ref ... i need to locate it, im sure i can, because im interacting with it
    //it's a matter of passing it to this function

    firebase.db.collection('recipes').doc(id).update(recipe);
    router.push('/')
  }

  return (
    <>
      <div className="columns">
        <div className="column">
          <div className="card has-background-info-light">
            <div className="card-content">
              <div className="content">
                <b className="has-text-info">Recipe Context Info</b>
                <ul>
                  <li>MODE /// <b className="has-text-success">{mode}</b></li>
                  <li>S L U G /// <b className="has-text-success">{recipe.slug}</b></li>
                  <li>ID /// <b className="has-text-success">{id}</b></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-three-fifths">
          <div className="content">
            {mode === 'edit' ? <h1>Edit Recipe</h1> : <h1>New Recipe</h1>}
            <small><i>recipe url:</i> reciply.app/{values.name.split(' ').join('-').toLowerCase()}</small>
          </div>

          {!user && <p className="has-text-danger">must be logged in to post a recipe</p>}

          {user &&
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                value={values.name}
                name="name"
                type="text"
                placeholder="Recipe Name"
                className="input"
                autoComplete="off"
              />
              {errors.name && <p className="has-text-danger">{errors.name}</p>}

              <input
                onChange={handleChange}
                value={values.steps}
                name="steps"
                type="text"
                placeholder="Recipe Steps"
                className="input"
                autoComplete="off"
              />
              {errors.steps && <p className="has-text-danger">{errors.steps}</p>}

              <br />
              <br />

              <div className="content">
                <h4>Ingredients</h4>
              </div>


              <div>
                {ingredientFields.map((ingredientField, index) => (
                  <div key={`${ingredientField}~${index}`} >
                    <div className="ingredient-item">
                      <div className="columns">
                        <div className="column is-two-fifths">
                          <input
                            className="input"
                            placeholder="Ingredient"
                            id="ingredientName"
                            name="ingredientName"
                            value={ingredientField.ingredientName}
                            onChange={event => handleIngredientChange(index, event)}
                          />
                        </div>
                        <div className="column">
                          <input
                            className="input"
                            placeholder="Amount / Quantity"
                            type="text"
                            id="ingredientQuantity"
                            name="ingredientQuantity"
                            value={ingredientField.ingredientQuantity}
                            onChange={event => handleIngredientChange(index, event)}
                          />
                          <div className="has-text-right">
                            <a className="has-text-danger" onClick={() => handleRemoveIngredientFields(index)}><b>x</b></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="has-text-right">
                <div className="button add-ingredient-button is-primary" onClick={() => handleAddIngredientFields()}>Add Ingredient</div>
              </div>

              <br/>

              <hr />

              <div className="add-button">
                {mode === 'edit' ? <button className="button">Edit Recipe</button> : <button className="button">Add Recipe</button>}
              </div>
            </form>
          }
        </div>
        <div className="column">
          <pre>
            {JSON.stringify(ingredientFields, null, 2)}
          </pre>
        </div>
      </div>

      <style jsx>{`
        .add-button {
          margin-top: 20px;
        }
        .add-ingredient-button {
          margin-top: 12px;
          margin-bottom: 12px;
        }
      `}</style>
    </>
  )
}
