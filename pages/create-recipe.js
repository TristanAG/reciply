import Layout from '../components/layout'
import useFormValidation from '../components/auth/useFormValidation'
import validateCreateRecipe from '../components/auth/validateCreateRecipe'
import { FirebaseContext } from '../firebase'
import { useRouter } from 'next/router'
import Ingredient from '../components/Ingredient'

const INITIAL_STATE = {
  name: "",
  steps: ""
}

export default function CreateRecipe(props) {
  const { firebase, user } = React.useContext(FirebaseContext)
  const router = useRouter()

  console.log(user)

  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateRecipe, handleCreateRecipe)

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

              <div className="button add-ingredient-button" onClick={handleAddIngredient}>Add Ingredient</div>

              <Ingredient />

              <hr />

              <div className="add-button">
                <button className="button">Add Recipe</button>
              </div>
            </form>
          }
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
