import { FirebaseContext } from '../firebase'

function RecipeList(props) {
  const { firebase } = React.useContext(FirebaseContext)

  React.useEffect(() => {
    getRecipes()
  }, [])

  function getRecipes() {
    firebase.db.collection('recipes').onSnapshot(handleSnapshot)
  }

  function handleSnapshot(snapshot) {
    const recipes = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    })
    console.log({ recipes })
  }

  return <div>Recipe List</div>
}

export default RecipeList
