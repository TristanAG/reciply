import Layout from '../components/layout'
import { FirebaseContext } from '../firebase'
import RecipeList from '../components/recipeList'

export default function MyRecipes() {

  const { firebase, user } = React.useContext(FirebaseContext)
  const [recipes, setRecipes] = React.useState([])

  React.useEffect(() => {
    // getRecipes(user.displayName)

  }, [user])

  function getRecipes(userName) {

    // const theRecipes = firebase.db.collection('recipes').onSnapshot(handleSnapshot)
    setRecipes(firebase.db.collection('recipes').where("recipe.postedBy.name", "==", user.displayName).get())

  }

  function handleSnapshot(snapshot) {
    const recipes = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    setRecipes(recipes)
  }

  return (
    <Layout>
      {user ?
        <div className="content">
          <h3>My Recipes </h3>
          <p>{user && user.displayName}</p>
          {recipes &&
            recipes.map((recipe) => {
              <p>hello</p>
            })
          }

        </div>
        :
        <div className="content">
          <h3>My Recipes </h3>
          <p>please login</p>
        </div>
      }
    </Layout>
  )
}
