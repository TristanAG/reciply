import Layout from '../../components/layout'
import { FirebaseContext } from '../../firebase'
import MyRecipeList from '../../components/myRecipeList'
import Firebase from '../../firebase/firebase'
import Link from 'next/link'

export default function MyRecipes() {

  const { firebase, user } = React.useContext(FirebaseContext)
  const [recipes, setRecipes] = React.useState([])

  React.useEffect(() => {
    if (user) {
      getRecipes()
    }
  }, [user])

  function getRecipes() {

    let myRecipes = []

    firebase.db.collection('recipes').where("postedBy.id", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          myRecipes.push(doc.data())
        });
        setRecipes(myRecipes)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  return (
    <Layout>
      <div className="content">
        <h3>My Recipes </h3>


      
        {recipes.length > 0 && recipes.map(recipe => (
          <>
            <p>{recipe.name}</p>
            <Link href={'/' + recipe.slug} >
              <a className="has-text-grey link">view</a>
            </Link>
            &nbsp;|&nbsp;
            <Link href={'/' + recipe.slug + '/edit'}>
              <a className="has-text-grey link">edit</a>
            </Link>
            &nbsp;|&nbsp;
            <span className="has-text-danger edit-button link" onClick={() => deleteRecipe(recipe)}>delete</span>
          </>
        ))}
      </div>
    </Layout>
  )
}
