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

  // console.log(user)
  //
  // React.useEffect(() => {
  //   getRecipes()
  // },[])
  //
  // function getRecipes() {
  //   firebase.db.collection('recipes').onSnapshot(handleSnapshot)
  // }
  //
  // function handleSnapshot(snapshot) {
  //   const recipes = snapshot.docs.map(doc => {
  //     return { id: doc.id, ...doc.data()}
  //   })
  //   console.log({ recipes })
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
