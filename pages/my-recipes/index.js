import Layout from '../../components/layout'
import { FirebaseContext } from '../../firebase'
import MyRecipeList from '../../components/myRecipeList'

import Firebase from '../../firebase/firebase'
import Link from 'next/link'

export default function MyRecipes() {

  const { firebase, user } = React.useContext(FirebaseContext)
  const [ recipes, setRecipes ] = React.useState([])
  const [ savedRecipes, setSavedRecipes ] = React.useState(null)

  React.useEffect(() => {
    if (user) {
      getRecipes()
      getSavedRecipes()
    }
  }, [user])

  // React.useEffect(() => {
  //   if(JSON.stringify(userInfo) !== JSON.stringify({})) {
  //     console.log('home here now 3')
  //     console.log(userInfo)
  //     userInfo.map((u) => (
  //       console.log(u.name)
  //     ))
  //   }
  // }, [userInfo])

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

  function getSavedRecipes() {
    firebase.db.collection('users').doc(user.uid).collection('savedRecipes').get()
      .then(querySnapshot => {
        let recipes = []
        querySnapshot.forEach(doc => {
          recipes.push({
            name: doc.data().name,
            id: doc.id,
            slug: doc.data().slug
          })
        });
        setSavedRecipes(recipes)
      })

  }

  return (
    <Layout>
      <div className="content">
        <h3>My Recipes </h3>

        {!user
          ? <p className="has-text-danger">must be logged in to post a recipe</p>
          : <>
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

            <h3>Saved Recipes </h3>
            {savedRecipes && savedRecipes.map((u) => (
              <p>
                <Link href={'/' + u.slug} >
                  <a className="has-text-link">{u.name}</a>
                </Link>
              </p>
            ))}
          </>
        }
      </div>
    </Layout>
  )
}
