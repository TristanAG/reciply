import Layout from '../components/layout'
import useFormValidation from '../components/auth/useFormValidation'
import validateCreateRecipe from '../components/auth/validateCreateRecipe'

const INITIAL_STATE = {
  name: "",
  steps: ""
}

export default function CreateRecipe(props) {
  const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateRecipe, handleCreateRecipe)

  function handleCreateRecipe() {
    console.log('recipe created')
  }

  return (
    <Layout>
      <div className="columns">
        <div className="column is-three-fifths">

          <div className="content">
            <h3>create recipe page</h3>
          </div>

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

            <div>
              <button className="button">Add Recipe</button>
            </div>
          </form>

        </div>
      </div>
    </Layout>
  )
}
