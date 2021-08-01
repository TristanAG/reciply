import React from 'react'
import Layout from '../../components/layout'
import { FirebaseContext } from '../../firebase'
import Firebase from '../../firebase/firebase'
import Link from 'next/link'

export default function Recipe({ recipe }) {
  const { firebase, user } = React.useContext(FirebaseContext)
  const [ savedRecipes, setSavedRecipes ] = React.useState(null)
  const [ savedRef, setSavedRef ] = React.useState('')
  const [ buttonStatus, setButtonStatus ] = React.useState(false)
  const [ isLoading, setIsLoading ] = React.useState(true)

  React.useEffect(() => {
    if (savedRecipes) {
      savedRecipes.map((r) => {
        if(r.name === recipe.name) {
          setButtonStatus(true)
          setSavedRef(r.id)
        }
      })
      setIsLoading(false)
    }
  }, [savedRecipes])

  React.useEffect(() => {
    if (user) {
      firebase.db.collection('users').doc(user.uid).collection('savedRecipes').get()
        .then(querySnapshot => {
          let recipes = []
          querySnapshot.forEach(doc => {
            recipes.push({
              name: doc.data().name,
              id: doc.id
            })
          });
          setSavedRecipes(recipes)
        })
      }
  },[user])

  function handleSaveRecipe() {
    if (user) {
      if(buttonStatus) {
        //delete
        setIsLoading(true)
        firebase.db.collection('users').doc(user.uid).collection('savedRecipes').doc(savedRef).delete().then(() => {
          setButtonStatus(false)
          setIsLoading(false)
        })
      } else {
        //add
        setIsLoading(true)
        firebase.db.collection('users').doc(user.uid).collection('savedRecipes').add({
          name: recipe.name,
          slug: recipe.slug,
          ingredients: recipe.ingredients
        }).then((docRef) => {
          setButtonStatus(true)
          setSavedRef(docRef.id)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
    } else {
      alert('please login or create an account to save recipes')
    }
    //update the like count ... actually don't really need to worry about this now... more interested in the user list
    //the recipe should also have a list of the users that like the recipe, right? then you can just count that... list out name and name and name like this recipe...
    // Firebase.db.collection('recipes').doc(id).update(recipe);
  }

  return (
    <Layout>
      <div className="content">
        {recipe && <h1>{recipe.name}</h1>}
        {isLoading && <div className="button is-white has-text-weight-normal is-loading">loading...</div>}
        {!isLoading &&
          <div
            onClick={() => handleSaveRecipe()}
            className={buttonStatus === true
            ? 'button is-success is-light has-text-weight-normal'
            : 'button is-info is-light has-text-weight-normal'}>
              {buttonStatus === true ? 'saved recipe' : 'save recipe?'}
          </div>
        }
        <br />
        <br />
        <p>//description goes here...</p>
        <h2>Instructions</h2>


        <ol>
          {recipe && recipe.steps.map((step, i) => (
            <li className="has-text-dark">{step.stepContent}</li>
          ))}
        </ol>
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
