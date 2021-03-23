import React from 'react'
import Layout from '../../components/layout'
// import Firebase from '../../firebase/firebase'
import { FirebaseContext } from '../../firebase'
import Firebase from '../../firebase/firebase'
import Link from 'next/link'
// import UserContext from '../../contexts/UserContext'

export default function Recipe({ recipe }) {
  const { firebase, user } = React.useContext(FirebaseContext)

  // const { userInfo, setUserInfo } = React.useContext(UserContext)

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
      //gonna try grabbing the saved recipes here ... im thinking it can be extrapolated out into a helper method
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
        });
      }
  },[user])

  function handleSaveRecipe() {
    alert('handle saved recipe')
    if (user) {
      if(buttonStatus) {
        //delete
        alert('i should delete')

        firebase.db.collection('users').doc(user.uid).collection('savedRecipes').doc(savedRef).delete().then(() => {
            console.log('after the delete')
            setButtonStatus(false)
        });

      } else {
        alert('i should add')
        firebase.db.collection('users').doc(user.uid).collection('savedRecipes').add({
          name: recipe.name
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            console.log('after the add')
            setButtonStatus(true)
            setSavedRef(docRef.id)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });





      }

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
        {savedRef && <h3>{savedRef}</h3>}
        {/* {savedRecipes && <p>got saved recipes</p>}
        {savedRecipes && savedRecipes.map((recipe) => (
          <p>{recipe.id}</p>
        ))} */}

        {isLoading && <div className="button is-white has-text-weight-normal is-loading">loading...</div>}
        {!isLoading &&
          <div
            onClick={() => handleSaveRecipe()}
            className={buttonStatus === true
            ? 'button is-success is-light has-text-weight-normal'
            : 'button is-info is-light has-text-weight-normal'}>
              {buttonStatus === true ? 'saved recipe' : 'not saved recipe'}
          </div>
        }


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
