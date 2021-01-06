import Layout from '../components/layout'
import useFormValidation from '../components/auth/useFormValidation'
import validateCreateRecipe from '../components/auth/validateCreateRecipe'
import { FirebaseContext } from '../firebase'
import { useRouter } from 'next/router'
import Ingredient from '../components/Ingredient'
import { useEffect, useState } from 'react'

const INITIAL_STATE = {
  name: "",
  steps: ""
}

export default function CreateRecipe(props) {
  const { firebase, user } = React.useContext(FirebaseContext)
  const router = useRouter()

  console.log(user)

  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateRecipe, handleCreateRecipe)

  //define the fields
  const [ingredientFields, setIngredientFields] = useState([
    { ingredientName: '', ingredientQuantity: '' }
  ])

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

  // just does a console out now temporary function!!!
  const handleIngredientSubmit = e => {
    e.preventDefault();
    console.log("ingredientFields", ingredientFields);
  };












  function handleCreateRecipe() {



    const { name, steps } = values
    const newRecipe = {
      name,
      steps,
      ingredients,
      postedBy: {
        id: user.uid,
        name: user.displayName
      },
      likes: [],

      created: Date.now()
    }
    firebase.db.collection('recipes').add(newRecipe)
    // window.location.href = '/login';
    router.push('/')
  }

  function handleAddIngredient() {
    console.log('handle add ingredient')
  }

  return (
    <Layout>
      <div className="columns">
        <div className="column is-three-fifths">

          <div className="content">
            <h3>create recipe page</h3>
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
              <div className="content">
                <h4>Add Ingredients</h4>
              </div>

              {/* <div className="button add-ingredient-button" onClick={handleAddIngredient}>Add Ingredient</div> */}

              {/* <Ingredient /> */}



              {/* ingredient section */}


              <form onSubmit={handleIngredientSubmit}>
                <div className="form-row">
                  {ingredientFields.map((ingredientField, index) => (
                    <div key={`${ingredientField}~${index}`} >
                      {/* <div className="form-group col-sm-6">
                        <label htmlFor="ingredientName">Ingredient Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="ingredientName"
                          name="ingredientName"
                          value={ingredientField.ingredientName}
                          onChange={event => handleIngredientChange(index, event)}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <label htmlFor="ingredientQunatity">Ingredient Quantity</label>
                        <input
                          type="text"
                          className="form-control"
                          id="ingredientQuantity"
                          name="ingredientQuantity"
                          value={ingredientField.ingredientQuantity}
                          onChange={event => handleIngredientChange(index, event)}
                        />
                      </div> */}



                      <div className="ingredient-item">
                        <div className="columns">
                          <div className="column is-two-fifths">
                            <input
                              className="input"
                              placeholder="Amount / Quantity of ingredient"
                              id="ingredientName"
                              name="ingredientName"
                              value={ingredientField.ingredientName}
                              onChange={event => handleIngredientChange(index, event)}
                            />
                          </div>
                          <div className="column">
                            <input
                              className="input"
                              placeholder="Ingredient"
                              type="text"
                              id="ingredientQuantity"
                              name="ingredientQuantity"
                              value={ingredientField.ingredientQuantity}
                              onChange={event => handleIngredientChange(index, event)}

                            />
                            <div className="has-text-right">
                              <a className="has-text-danger" onClick={() => handleRemoveIngredientFields(index)}>remove ingredient</a>
                            </div>
                          </div>
                        </div>





                      </div>





                        {/* <button
                          className="btn btn-link"
                          type="button"
                          onClick={() => handleAddIngredientFields()}
                        >
                          +
                        </button> */}
                        {/* <div className="button add-ingredient-button" onClick={() => handleAddIngredientFields()}>Add Ingredient</div> */}

                    </div>
                  ))}
                </div>
                <div className="button add-ingredient-button" onClick={() => handleAddIngredientFields()}>Add Ingredient</div>
                <div className="submit-button">
                  <button
                    className="btn btn-primary mr-2"
                    type="submit"
                    onSubmit={handleIngredientSubmit}
                  >
                    Save
                  </button>
                </div>
                <br/>
                {/* <pre>
                  {JSON.stringify(ingredientFields, null, 2)}
                </pre> */}
              </form>



              {/* end ingredient section */}











              <hr />

              <div className="add-button">
                <button className="button">Add Recipe</button>
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
    </Layout>
  )
}
