import React from 'react'
import Layout from '../../components/layout'
import Firebase from '../../firebase/firebase'
// import RecipeContext from '../../components/RecipeContext'
import RecipeForm from '../../components/recipeForm'
import Link from 'next/link'


export default function Edit({ recipe, recipeId }) {
  // const { firebase, user } = React.useContext(FirebaseContext)

  // const recipeContext = React.useContext(RecipeContext);

  // recipeContext.setRecipe(recipe)
  // console.log('look')
  // console.log(recipeContext.recipe)

  return (
    <Layout>
      {/* <h1>{recipe.name}</h1>
      <h3>context: {recipeContext.name}</h3>
      <p>{recipe.steps}</p>
      <Link href="/edit-recipe" as={'/edit-recipe/' + recipe.name.split(' ').join('-').toLowerCase()}>
        <a>edit</a>
      </Link> */}
      <p>edit {recipe.name}</p>
      <p>recipe id {recipeId}</p>
      <RecipeForm mode="edit" recipe={recipe} id={recipeId} />
    </Layout>
  )
}


export const getStaticPaths = async () => {
  const recipes = await Firebase.db.collection('recipes').get()
  const paths = recipes.docs.map(recipe => ({
    params: {
      slug: recipe.data().slug
    }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params
  let recipe = []

  await Firebase.db.collection('recipes').where("slug", "==", slug)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        recipe.push(doc.id, doc.data())
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  if (recipe) {
    return {
      props: {
        recipeId: recipe[0],
        recipe: recipe[1]
      }
    }
  } else {
    return {
      props: {}
    }
  }
}
