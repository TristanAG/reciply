import React from 'react'
import Layout from '../../components/layout'
// import Firebase from '../../firebase/firebase'
import { FirebaseContext } from '../../firebase'
import Firebase from '../../firebase/firebase'
import Link from 'next/link'
import UserContext from '../../contexts/UserContext'

export default function Recipe({ recipe }) {
  const { firebase, user } = React.useContext(FirebaseContext)

  const { userInfo, setUserInfo } = React.useContext(UserContext)

  const [ buttonStatus, setButtonStatus ] = React.useState(false)

  React.useEffect(() => {
    if(JSON.stringify(userInfo) !== JSON.stringify({})) {

      userInfo.map((u) => {

        if(u.name === recipe.name) {
          setButtonStatus(true)
        }
      })

    }
  }, [userInfo])



  function handleSaveRecipe() {
    if (user) {
      // alert(user.uid)
      firebase.db.collection('users').doc(user.uid).collection('savedRecipes').add({
        name: recipe.name
      });
      //then statement here to preform the state update to actually make it so the recipe is
    } else {
      // alert('please login or create an account to save recipes')
    }
    //update the like count ... actually don't really need to worry about this now... more interested in the user list
    //the recipe should also have a list of the users that like the recipe, right? then you can just count that... list out name and name and name like this recipe...
    // Firebase.db.collection('recipes').doc(id).update(recipe);
  }

  return (
    <Layout>
      <div class="content">
        {recipe && <h1>{recipe.name}</h1>}

        {!buttonStatus ? <div className="button is-info is-light has-text-weight-normal	" onClick={() => handleSaveRecipe()}>Save This Recipe?</div> : <div className="button is-success is-light has-text-weight-normal	" >Saved Recipe</div>}
        <br />
        <br />
        <p>//description goes here...</p>
        <h2>Instructions</h2>
        <p>{recipe && recipe.steps}</p>
        <h2>Ingredients</h2>
        <ul>
          {recipe && recipe.ingredients.map((ingredient) => (
            <li>{ingredient.ingredientName} <small><i className="has-text-info">{ingredient.ingredientQuantity}</i></small></li>
          ))}
        </ul>

      </div>

      <style jsx>{`

      `}</style>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const recipes = await Firebase.db.collection('recipes').get()
  const paths = recipes.docs.map(recipe => ({

    params: {
      slug: recipe.data().slug
    }
  }));

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const res = await Firebase.db.collection('recipes').where("slug", "==", slug).get()
  const recipe = res.docs.map(recipe => recipe.data());
  // console.log('look')
  // console.log(recipe)
  if (recipe.length) {
    return {
      props: {
        recipe: recipe[0]
      }
    }
  } else {
    return {
      props: {}
    }
  }
}
