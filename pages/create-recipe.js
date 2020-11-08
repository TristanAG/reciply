import Layout from '../components/layout'
import useFormValidation from '../components/auth/useFormValidation'
import validateCreateRecipe from '../components/auth/validateCreateRecipe'
import { FirebaseContext } from '../firebase'
import { useRouter } from 'next/router'

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
    // console.log('recipe created')
    // if (!user) {
    //   window.location.href = '/login';
    // }
    const { name, steps } = values
    const newRecipe = {
      name,
      steps,
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

              <div>
                <button className="button">Add Recipe</button>
              </div>
            </form>
          }
        </div>
      </div>
    </Layout>
  )
}
