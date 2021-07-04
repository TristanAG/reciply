import useFormValidation from '../components/auth/useFormValidation'
import validateCreateRecipe from '../components/auth/validateCreateRecipe'
import { FirebaseContext } from '../firebase'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const INITIAL_STATE = {
  name: "",
  steps: "",
  ingredientFields: []
}

export default function RecipeForm({ mode, recipe, id }) {

  const { firebase, user } = React.useContext(FirebaseContext)

  const router = useRouter()

  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateRecipe, handleCreateRecipe)

  const [activeTab, setActiveTab] = useState('ingredients')

  //define the fields
  const [ ingredientFields, setIngredientFields ] = useState([{ ingredientName: '', ingredientQuantity: '' }])
  const [ stepFields, setStepFields ] = useState([{ stepCount: '', stepContent: '', stepImage: '' }])

  useEffect(() => {
    if (mode === 'edit') {
      values.name = recipe.name
      values.steps = recipe.steps
      setIngredientFields(recipe.ingredients)
      setStepFields(recipe.steps)
    }
  }, [mode])

  const handleAddIngredientFields = () => {
    const values = [...ingredientFields];
    values.push({ ingredientName: '', ingredientQuantity: '' });
    setIngredientFields(values);
  }

  const handleAddStepFields = () => {
    const values = [...ingredientFields];
    values.push({ stepCount: '', step: '' });
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
    firebase.db.collection('recipes').add(recipe)
    router.push('/')
  }

  function UpdateRecipe(recipe) {
    firebase.db.collection('recipes').doc(id).update(recipe);
    router.push('/')
  }

  return (
    <>
      {/* <div className="columns">
        <div className="column">
          <div className="card has-background-info-light">
            <div className="card-content">
              <div className="content">
                <b className="has-text-info">Recipe Context Info</b>
                <ul>
                  <li>MODE /// {mode && <b className="has-text-success">{mode}</b>}</li>
                  <li>S L U G /// {recipe && <b className="has-text-success">{recipe.slug}</b>}</li>
                  <li>ID /// <b className="has-text-success">{id}</b></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}

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

              {/* <input
                onChange={handleChange}
                value={values.steps}
                name="steps"
                type="text"
                placeholder="Recipe Steps"
                className="input"
                autoComplete="off"
              />
              {errors.steps && <p className="has-text-danger">{errors.steps}</p>} */}

              <br />
              <br />


              <div className="tabs">
                <ul>
                  <li className={activeTab === 'ingredients' && 'is-active'} onClick={() => setActiveTab('ingredients')}><a>ingredients</a></li>
                  <li className={activeTab === 'steps' && 'is-active'} onClick={() => setActiveTab('steps')}><a>steps</a></li>
                </ul>
              </div>


              {activeTab === 'ingredients' &&
                <>
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
                </>
              }

              {activeTab === 'steps' &&
                <>
                  <div className="content">
                    <h4>Steps</h4>
                  </div>
                  {/* <input
                    onChange={handleChange}
                    value={values.steps}
                    name="steps"
                    type="text"
                    placeholder="Recipe Steps"
                    className="input"
                    autoComplete="off"
                  /> */}
                  <textarea
                    className="textarea"
                    placeholder="e.g. Hello world"
                    onChange={handleChange}
                    value={values.steps}
                    name="steps"
                    type="text"
                  >
                  </textarea>
                  {errors.steps && <p className="has-text-danger">{errors.steps}</p>}
                </>
              }



              <br/>

              <hr />

              <div className="add-button">
                {mode === 'edit' ? <button className="button">Edit Recipe</button> : <button className="button">Add Recipe</button>}
              </div>
            </form>
          }
        </div>
        <div className="column">
          {/* <pre>
            {JSON.stringify(ingredientFields, null, 2)}
          </pre> */}
          {ingredientFields && ingredientFields.map((ingredient => {
            return ingredient.ingredientName && <p>{ingredient.ingredientName} | {ingredient.ingredientQuantity}</p>
          }))}
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
