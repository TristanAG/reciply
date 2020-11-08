import Layout from '../components/layout'
import useFormValidation from '../components/auth/useFormValidation'
import validateCreateRecipe from '../components/auth/validateCreateRecipe'
import { FirebaseContext } from '../firebase'
import { useRouter } from 'next/router'
import RecipeList from '../components/recipeList'

const INITIAL_STATE = {
  name: "",
  steps: ""
}

export default function MyRecipes(props) {
  const { firebase, user } = React.useContext(FirebaseContext)
  const router = useRouter()

  console.log(user)

  // const { handleSubmit, handleChange, values, errors } = useFormValidation(INITIAL_STATE, validateCreateRecipe, handleCreateRecipe)

  // function handleCreateRecipe() {
  //   // console.log('recipe created')
  //   // if (!user) {
  //   //   window.location.href = '/login';
  //   // }
  //   const { name, steps } = values
  //   const newRecipe = {
  //     name,
  //     steps,
  //     postedBy: {
  //       id: user.uid,
  //       name: user.displayName
  //     },
  //     likes: [],
  //     created: Date.now()
  //   }
  //   firebase.db.collection('recipes').add(newRecipe)
  //   // window.location.href = '/login';
  //   router.push('/')
  // }

  return (
    <Layout>
      <div className="columns">
        <div className="column is-three-fifths">

          <div className="content">
            <h3>My Recipes</h3>
          </div>
          {!user && <p className="has-text-danger">must be logged in to see this page</p>}
          {user &&
            <>
              <p>welcome to the recipes page {user.displayName}, here you can see the recipes you've posted</p>
              <RecipeList />
            </>
          }
        </div>
      </div>
    </Layout>
  )
}
